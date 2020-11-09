import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPosts,
  deletePost,
  updatePost,
} from "../../store/actions/postAction";
import {
  Card,
  CardHeader,
  CardFooter,
  Container,
  Row,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  CardBody,
  Col,
  Badge,
} from "reactstrap";
import DataTable from "react-data-table-component";
import { Link, useHistory } from "react-router-dom";

const columns = [
  {
    name: "No",
    selector: "no",
    sortable: true,
    center: true,
  },
  {
    name: "Name",
    selector: "name",
    sortable: true,
  },
  {
    name: "Views",
    selector: "views",
    sortable: true,
  },
  {
    name: "Categories",
    selector: "categories",
  },
  {
    name: "Active",
    selector: "active",
    center: true,
  },
  {
    name: "Action",
    selector: "action",
    center: true,
    allowOverflow: true,
  },
];

export default () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.postReducer);
  const [data, setData] = useState([]);
  const history = useHistory();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const renderTable = useCallback(() => {
    const newData = posts.map((post, i) => {
      return {
        no: i + 1,
        name: post.name,
        views: post.views,
        categories: post.categories.map((category) => {
          return (
            <Link
              to={`/admin/category/detail/${category.id}`}
              key={category.id}
            >
              <Badge
                key={category.id}
                color="primary"
                style={{ marginLeft: "1px" }}
              >
                {category.name}
              </Badge>
            </Link>
          );
        }),
        active: (
          <div style={{ marginTop: "7px" }}>
            <label className="custom-toggle">
              <input
                defaultChecked={post.active}
                value={post.active}
                type="checkbox"
                onChange={() =>
                  dispatch(
                    updatePost(post.id, {
                      ...post,
                      active: !post.active,
                    })
                  )
                }
              />
              <span className="custom-toggle-slider rounded-circle" />
            </label>
          </div>
        ),
        action: (
          <>
            {!post.active && (
              <UncontrolledDropdown>
                <DropdownToggle
                  className="btn-icon-only text-light"
                  href="#"
                  role="button"
                  size="sm"
                  color=""
                  onClick={(e) => e.preventDefault()}
                >
                  <i className="fas fa-ellipsis-v" />
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                  <DropdownItem
                    onClick={() =>
                      history.push(`/admin/post/detail/${post.id}`)
                    }
                  >
                    Detail
                  </DropdownItem>
                  <DropdownItem onClick={() => dispatch(deletePost(post.id))}>
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            )}
          </>
        ),
      };
    });
    setData(newData);
  }, [posts, history, dispatch]);

  useEffect(() => {
    renderTable();
  }, [renderTable]);

  return (
    <div>
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Post List</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      className="btn-icon btn-2"
                      color="primary"
                      type="button"
                      size="sm"
                      onClick={() => history.push("/admin/post/create")}
                    >
                      <span className="btn-inner--icon">
                        <i className="ni ni-fat-add" />
                      </span>
                      New
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <DataTable
                  noHeader
                  columns={columns}
                  data={data}
                  defaultSortField="no"
                  striped={true}
                  dense={true}
                  pagination
                  paginationRowsPerPageOptions={[10, 15, 20, 25, 30, 50, 100]}
                />
              </CardBody>
              <CardFooter className="py-4"></CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </div>
  );
};

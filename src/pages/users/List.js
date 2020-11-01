import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUsers,
  deleteUser,
  updateUser,
} from "../../store/actions/userAction";
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
} from "reactstrap";
import DataTable from "react-data-table-component";
import { useHistory } from "react-router-dom";

const columns = [
  {
    name: "No",
    selector: "no",
    sortable: true,
    center: true,
  },
  {
    name: "Image",
    selector: "image",
    center: true,
  },
  {
    name: "Full Name",
    selector: "fullName",
    sortable: true,
    center: true,
  },
  {
    name: "Username",
    selector: "username",
    sortable: true,
    center: true,
  },
  {
    name: "Email",
    selector: "email",
    sortable: true,
    center: true,
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
  const { users } = useSelector((state) => state.userReducer);
  const [data, setData] = useState([]);
  const history = useHistory();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const renderTable = useCallback(() => {
    const newData = users.map((user, i) => {
      return {
        no: i + 1,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        image: (
          <React.Fragment key={i}>
            <a
              className="avatar avatar-sm"
              href="#pablo"
              id={`tooltip742438047${user.image.id}`}
              onClick={(e) => e.preventDefault()}
            >
              <img alt="..." className="rounded-circle" src={user.image.url} />
            </a>
          </React.Fragment>
        ),
        active: (
          <div style={{ marginTop: "7px" }}>
            <label className="custom-toggle">
              <input
                defaultChecked={user.active}
                value={user.active}
                type="checkbox"
                onChange={() =>
                  dispatch(
                    updateUser(user.id, {
                      ...user,
                      active: !user.active,
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
            {!user.active && (
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
                      history.push(`/admin/user/detail/${user.id}`)
                    }
                  >
                    Detail
                  </DropdownItem>
                  <DropdownItem onClick={() => dispatch(deleteUser(user.id))}>
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
  }, [users, history, dispatch]);

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
                    <h3 className="mb-0">User List</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      className="btn-icon btn-2"
                      color="primary"
                      type="button"
                      size="sm"
                      onClick={() => history.push("/admin/user/create")}
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

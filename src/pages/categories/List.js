import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategories,
  deleteCategory,
  updateCategory,
} from "../../store/actions/categoryAction";
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
    name: "Name",
    selector: "name",
    sortable: true,
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
  const categories = useSelector((state) => state.categoryReducer.categories);
  const [data, setData] = useState([]);
  const history = useHistory();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const renderTable = useCallback(() => {
    const newData = categories.map((category, i) => {
      var data = {};
      data.no = i + 1;
      data.name = category.name;
      data.active = (
        <div style={{ marginTop: "7px" }}>
          <label className="custom-toggle">
            <input
              defaultChecked={category.active}
              value={category.active}
              type="checkbox"
              onChange={() =>
                dispatch(
                  updateCategory(category.id, {
                    name: category.name,
                    description: category.description,
                    active: !category.active,
                  })
                )
              }
            />
            <span className="custom-toggle-slider rounded-circle" />
          </label>
        </div>
      );
      data.action = (
        <>
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
                onClick={() => history.push(`/category/detail/${category.id}`)}
              >
                Detail
              </DropdownItem>
              <DropdownItem
                onClick={() => dispatch(deleteCategory(category.id))}
              >
                Delete
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </>
      );
      return data;
    });
    setData(newData);
  }, [categories, history, dispatch]);

  useEffect(() => {
    renderTable();
  }, [renderTable]);

  return (
    <div>
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <div className="row">
                  <div className="col-6">
                    <h3 className="mb-0">Category</h3>
                  </div>
                  <div className="text-right col-6">
                    <Button
                      className="btn-icon btn-2"
                      color="primary"
                      type="button"
                      size="sm"
                      onClick={() => history.push("/admin/category/create")}
                    >
                      <span className="btn-inner--icon">
                        <i className="ni ni-fat-add" />
                      </span>
                      New
                    </Button>
                  </div>
                </div>
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

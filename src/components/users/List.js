import React, { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from "reactstrap";
import { useHistory } from "react-router-dom";
import DataTable from "react-data-table-component";
// import { ModalForm } from "./index";
import { updateUser, deleteUser } from "../../store/actions/userAction";

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
    sortable: false,
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
    sortable: false,
    center: true,
  },
  {
    name: "",
    selector: "action",
    sortable: true,
    center: true,
    allowOverflow: true,
    button: true,
  },
];

export default ({ users }) => {
  const [dataTable, setDataTable] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  const onEdit = useCallback(
    (editUser) => {
      history.push(`/admin/user/${editUser.id}`);
    },
    [history]
  );

  const onDelete = useCallback(
    ({ id }) => {
      dispatch(deleteUser(id));
    },
    [dispatch]
  );

  const toggleActive = useCallback(
    (user) => {
      const newUser = {
        ...user,
        active: user.active === true ? false : true,
      };
      dispatch(updateUser(user.id, newUser));
    },
    [dispatch]
  );

  const renderTable = useCallback(() => {
    const newRow =
      users &&
      users.map((order, i) => {
        var data = {};
        data.no = i + 1;
        data.fullName = order.firstName + " " + order.lastName;
        data.firstName = order.firstName;
        data.lastName = order.lastName;
        data.email = order.email;
        data.username = order.username;
        data.image = order.image && (
          <React.Fragment key={i}>
            <a
              className="avatar avatar-sm"
              href="#pablo"
              id={`tooltip742438047${order.image.id}`}
              onClick={(e) => e.preventDefault()}
            >
              <img alt="..." className="rounded-circle" src={order.image.url} />
            </a>
          </React.Fragment>
        );
        data.active = (
          // <div style={{ marginTop: "10px" }}>
          <label className="custom-toggle">
            <input
              defaultChecked={order.active}
              value={order.active}
              type="checkbox"
              onChange={() => toggleActive(order)}
            />
            <span className="custom-toggle-slider rounded-circle" />
          </label>
          // </div>
        );
        data.action = (
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
              <DropdownItem onClick={() => onEdit(order)}>Detail</DropdownItem>
              <DropdownItem onClick={() => onDelete(order)}>
                Delete
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        );
        return data;
      });
    setDataTable(newRow);
  }, [onDelete, onEdit, users, toggleActive]);

  useEffect(() => {
    renderTable();
  }, [renderTable]);

  // const toggleModalForm = () => {
  //   setIsModal(!isModal);
  // };

  // const onSubmit = (newFeature) => {
  //   dispatch(updateFeature(feature.id, newFeature));
  //   toggleModalForm();
  // };

  return (
    <>
      <DataTable
        noHeader
        columns={columns}
        data={dataTable}
        defaultSortField="no"
        striped={true}
        dense={true}
        pagination
      />
      {/* <ModalForm
        toggle={toggleModalForm}
        isOpen={isModal}
        feature={feature}
        onSubmit={onSubmit}
      /> */}
    </>
  );
};

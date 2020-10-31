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
import { updateOrder, deleteOrder } from "../../store/actions/orderAction";

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
    center: true,
  },
  {
    name: "Domain",
    selector: "domain",
    sortable: true,
    center: true,
  },
  // {
  //   name: "Email",
  //   selector: "email",
  //   sortable: true,
  //   center: true,
  // },
  {
    name: "Phone",
    selector: "phone",
    sortable: true,
    center: true,
  },
  {
    name: "Package",
    selector: "package",
    sortable: true,
    center: true,
  },
  {
    name: "Active",
    selector: "active",
    sortable: true,
    center: true,
    allowOverflow: true,
    button: true,
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

export default ({ orders }) => {
  const [dataTable, setDataTable] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  const onEdit = useCallback(
    (editOrder) => {
      history.push(`/admin/order/${editOrder.id}`);
    },
    [history]
  );

  const onDelete = useCallback(
    ({ id }) => {
      dispatch(deleteOrder(id));
    },
    [dispatch]
  );

  const toggleActive = useCallback(
    (order) => {
      const newOrder = {
        ...order,
        active: order.active === true ? false : true,
      };
      dispatch(updateOrder(order.id, newOrder));
    },
    [dispatch]
  );

  const renderTable = useCallback(() => {
    const newRow =
      orders &&
      orders.map((order, i) => {
        var data = {};
        data.no = i + 1;
        data.name = order.name;
        data.domain = order.domain;
        data.email = order.email;
        data.phone = order.phone;
        data.package = order.package.name;
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
  }, [onDelete, onEdit, orders, toggleActive]);

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

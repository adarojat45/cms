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
import {
  updatePartner,
  deletePartner,
} from "../../store/actions/partnerAction";

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
    name: "Name",
    selector: "name",
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

export default ({ partners }) => {
  const [dataTable, setDataTable] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  const onEdit = useCallback(
    (editUser) => {
      history.push(`/admin/partner/${editUser.id}`);
    },
    [history]
  );

  const onDelete = useCallback(
    ({ id }) => {
      dispatch(deletePartner(id));
    },
    [dispatch]
  );

  const toggleActive = useCallback(
    (partner) => {
      const newPartner = {
        ...partner,
        active: partner.active === true ? false : true,
      };
      dispatch(updatePartner(partner.id, newPartner));
    },
    [dispatch]
  );

  const renderTable = useCallback(() => {
    const newRow =
      partners &&
      partners.map((order, i) => {
        var data = {};
        data.no = i + 1;
        data.name = order.name;
        data.description = order.description;
        data.link = order.link;
        data.image = (
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
          <label className="custom-toggle">
            <input
              defaultChecked={order.active}
              value={order.active}
              type="checkbox"
              onChange={() => toggleActive(order)}
            />
            <span className="custom-toggle-slider rounded-circle" />
          </label>
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
  }, [onDelete, onEdit, partners, toggleActive]);

  useEffect(() => {
    renderTable();
  }, [renderTable]);

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
    </>
  );
};

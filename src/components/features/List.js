import React, { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from "reactstrap";
import DataTable from "react-data-table-component";
import { ModalForm } from "./index";
import {
  updateFeature,
  deleteFeature,
} from "../../store/actions/featureAction";

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
    left: true,
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

export default ({ features }) => {
  const [dataTable, setDataTable] = useState([]);
  const [feature, setFeature] = useState({});
  const [isModal, setIsModal] = useState(false);
  const dispatch = useDispatch();

  const onEdit = useCallback(
    (editFeature) => {
      setFeature(editFeature);
      setIsModal(!isModal);
    },
    [isModal]
  );

  const onDelete = useCallback(
    ({ id }) => {
      dispatch(deleteFeature(id));
    },
    [dispatch]
  );

  const toggleActive = useCallback(
    (feature) => {
      const newFeature = {
        name: feature.name,
        description: feature.description,
        active: feature.active === true ? false : true,
      };
      dispatch(updateFeature(feature.id, newFeature));
    },
    [dispatch]
  );

  const renderTable = useCallback(() => {
    const newRow =
      features &&
      features.map((feature, i) => {
        var data = {};
        data.no = i + 1;
        data.name = feature.name;
        data.active = (
          // <div style={{ marginTop: "10px" }}>
          <label className="custom-toggle">
            <input
              defaultChecked={feature.active}
              value={feature.active}
              type="checkbox"
              onChange={() => toggleActive(feature)}
            />
            <span className="custom-toggle-slider rounded-circle" />
          </label>
          // </div>
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
                <DropdownItem onClick={() => onEdit(feature)}>
                  Edit
                </DropdownItem>
                <DropdownItem onClick={() => onDelete(feature)}>
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </>
        );
        return data;
      });
    setDataTable(newRow);
  }, [onDelete, onEdit, features, toggleActive]);

  useEffect(() => {
    renderTable();
  }, [renderTable]);

  const toggleModalForm = () => {
    setIsModal(!isModal);
  };

  const onSubmit = (newFeature) => {
    dispatch(
      updateFeature(feature.id, {
        ...feature,
        name: newFeature.name,
        description: newFeature.description,
      })
    );
    toggleModalForm();
  };

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
      <ModalForm
        toggle={toggleModalForm}
        isOpen={isModal}
        feature={feature}
        onSubmit={onSubmit}
      />
    </>
  );
};

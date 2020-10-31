import React, { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from "reactstrap";
import DataTable from "react-data-table-component";
import {
  updatePackage,
  deletePackage,
} from "../../store/actions/packageAction";
import { ModalForm } from "./index";

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
    name: "Price",
    selector: "price",
    sortable: true,
    center: true,
  },
  {
    name: "Price Discount",
    selector: "priceDiscount",
    sortable: true,
    right: true,
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

export default ({ packages }) => {
  const [dataTable, setDataTable] = useState([]);
  const [packageInput, setPackageInput] = useState(null);
  const [isModal, setIsModal] = useState(false);
  const dispatch = useDispatch();

  const onEdit = useCallback(
    (editPackage) => {
      setPackageInput(editPackage);
      setIsModal(!isModal);
    },
    [isModal]
  );

  const onDelete = useCallback(
    ({ id }) => {
      dispatch(deletePackage(id));
    },
    [dispatch]
  );

  const toggleActive = useCallback(
    (feature) => {
      const newFeature = {
        ...feature,
        active: feature.active === true ? false : true,
      };
      dispatch(updatePackage(feature.id, newFeature));
    },
    [dispatch]
  );

  const renderTable = useCallback(() => {
    const newRow =
      packages &&
      packages.map((feature, i) => {
        var data = {};
        data.no = i + 1;
        data.name = feature.name;
        data.description = feature.description;
        data.price = Number(feature.price).toLocaleString("id") + ",-";
        data.priceDiscount =
          Number(feature.priceDiscount).toLocaleString("id") + ",-";
        data.features = feature.features;
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
  }, [onDelete, onEdit, packages, toggleActive]);

  useEffect(() => {
    renderTable();
  }, [renderTable]);

  const toggleModalForm = () => {
    setIsModal(!isModal);
  };

  const onSubmit = (newPackage) => {
    dispatch(
      updatePackage(packageInput.id, {
        ...newPackage,
        active: packageInput.active,
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
        packageData={packageInput}
        onSubmit={onSubmit}
      />
    </>
  );
};

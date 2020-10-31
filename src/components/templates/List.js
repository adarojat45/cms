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
  updateTemplate,
  deleteTemplate,
} from "../../store/actions/templateAction";

const columns = [
  {
    name: "No",
    selector: "no",
    sortable: true,
    center: true,
  },
  {
    name: "Image",
    selector: "images",
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
    name: "Domain",
    selector: "domain",
    sortable: true,
    center: true,
  },
  {
    name: "Package Name",
    selector: "packageName",
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
    name: "Premium",
    selector: "isPremium",
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

export default ({ templates }) => {
  const [dataTable, setDataTable] = useState([]);
  const [template, setTemplate] = useState({});
  const [isModal, setIsModal] = useState(false);
  const dispatch = useDispatch();

  const onEdit = useCallback(
    (editTemplate) => {
      setTemplate(editTemplate);
      setIsModal(!isModal);
    },
    [isModal]
  );

  const onDelete = useCallback(
    ({ id }) => {
      dispatch(deleteTemplate(id));
    },
    [dispatch]
  );

  const toggleActive = useCallback(
    (template) => {
      const newFeature = {
        ...template,
        active: template.active === true ? false : true,
      };
      dispatch(updateTemplate(template.id, newFeature));
    },
    [dispatch]
  );

  const toggleIsPremium = useCallback(
    (template) => {
      const newFeature = {
        ...template,
        isPremium: template.isPremium === true ? false : true,
      };
      dispatch(updateTemplate(template.id, newFeature));
    },
    [dispatch]
  );

  const renderTable = useCallback(() => {
    const newRow =
      templates &&
      templates.map((feature, i) => {
        var data = {};
        data.no = i + 1;
        data.name = feature.name;
        data.domain = feature.domain;
        data.packageName = feature.package.name;
        data.images = (
          <div className="avatar-group">
            {feature.images.map((image, i) => {
              return (
                <React.Fragment key={i}>
                  <a
                    className="avatar avatar-sm"
                    href="#pablo"
                    id={`tooltip742438047${image.id}`}
                    onClick={(e) => e.preventDefault()}
                  >
                    <img
                      alt="..."
                      className="rounded-circle"
                      src={image.thumbnailUrl}
                    />
                  </a>
                </React.Fragment>
              );
            })}
          </div>
        );
        data.active = (
          <label className="custom-toggle">
            <input
              defaultChecked={feature.active}
              value={feature.active}
              type="checkbox"
              onChange={() => toggleActive(feature)}
            />
            <span className="custom-toggle-slider rounded-circle" />
          </label>
        );
        data.isPremium = (
          <label className="custom-toggle">
            <input
              defaultChecked={feature.isPremium}
              value={feature.isPremium}
              type="checkbox"
              onChange={() => toggleIsPremium(feature)}
            />
            <span className="custom-toggle-slider rounded-circle" />
          </label>
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
  }, [onDelete, onEdit, templates, toggleActive, toggleIsPremium]);

  useEffect(() => {
    renderTable();
  }, [renderTable]);

  const toggleModalForm = () => {
    setIsModal(!isModal);
  };

  const onSubmit = (newTemplate) => {
    dispatch(
      updateTemplate(template.id, { ...newTemplate, active: template.active })
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
      {isModal && (
        <ModalForm
          toggle={toggleModalForm}
          isOpen={isModal}
          template={template}
          onSubmit={onSubmit}
        />
      )}
    </>
  );
};

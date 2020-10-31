import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from "reactstrap";
import DataTable from "react-data-table-component";
import { CoupleForm } from "../../index";
import { updateOrder } from "../../../../store/actions/orderAction";

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
    name: "Full Name",
    selector: "fullName",
    sortable: true,
    center: true,
  },
  {
    name: "Nick Name",
    selector: "nickName",
    sortable: true,
    center: true,
  },
  {
    name: "Father",
    selector: "father",
    sortable: true,
    center: true,
  },
  {
    name: "Mother",
    selector: "mother",
    sortable: true,
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

export default () => {
  const { order } = useSelector((state) => state.orderReducer);
  const [dataTable, setDataTable] = useState([]);
  const [couple, setCouple] = useState({});
  const [isModal, setIsModal] = useState(false);
  const [index, setIndex] = useState(null);
  const [couples, setCouples] = useState([]);
  const dispatch = useDispatch();

  const onEdit = useCallback(
    (i, editCouple) => {
      setCouple(editCouple);
      setIsModal(!isModal);
      setIndex(i);
    },
    [isModal]
  );

  const toggleModalForm = useCallback(() => {
    setIsModal(!isModal);
  }, [isModal]);

  const onSubmit = useCallback(
    (newCouple) => {
      const newOrder = {
        ...order,
        detail: {
          ...order.detail,
          couples: [
            ...order.detail.couples.slice(0, index),
            {
              ...order.detail.couples[index],
              ...newCouple,
            },
            ...order.detail.couples.slice(index + 1),
          ],
        },
      };
      dispatch(updateOrder(order.id, newOrder));
      toggleModalForm();
    },
    [dispatch, order, toggleModalForm, index]
  );

  const onDelete = useCallback(
    async (index) => {
      const newCouples = couples.filter((couple, i) => i !== index);
      const newOrder = {
        ...order,
        detail: { ...order.detail, couples: newCouples },
      };
      dispatch(updateOrder(order.id, newOrder));
    },
    [couples, dispatch, order]
  );

  const renderTable = useCallback(() => {
    const newRow =
      couples &&
      couples.map((feature, i) => {
        var data = {};
        data.no = i + 1;
        data.nickName = feature.nickName;
        data.fullName = feature.fullName;
        data.father = feature.father;
        data.mother = feature.mother;
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
                <DropdownItem onClick={() => onEdit(i, feature)}>
                  Edit
                </DropdownItem>
                <DropdownItem onClick={() => onDelete(i)}>Delete</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </>
        );
        return data;
      });
    setDataTable(newRow);
  }, [onDelete, onEdit, couples]);

  useEffect(() => {
    if (order) {
      setCouples(order.detail.couples);
      renderTable();
    }
  }, [renderTable, order]);

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
        <CoupleForm
          toggle={toggleModalForm}
          isOpen={isModal}
          couple={couple}
          onSubmit={onSubmit}
        />
      )}
    </>
  );
};

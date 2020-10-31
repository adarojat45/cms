import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from "reactstrap";
import DataTable from "react-data-table-component";
import { PaymentForm } from "../../index";
import { updateOrder } from "../../../../store/actions/orderAction";

const columns = [
  {
    name: "No",
    selector: "no",
    sortable: true,
    center: true,
  },
  {
    name: "Bank",
    selector: "bank",
    sortable: false,
    center: true,
  },
  {
    name: "Rekening No",
    selector: "rekeningNo",
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
  const [payment, setPayment] = useState({});
  const [isModal, setIsModal] = useState(false);
  const [index, setIndex] = useState(null);
  const [payments, setPayments] = useState([]);
  const dispatch = useDispatch();

  const onEdit = useCallback(
    (i, editPayment) => {
      setPayment(editPayment);
      setIsModal(!isModal);
      setIndex(i);
    },
    [isModal]
  );

  const toggleModalForm = useCallback(() => {
    setIsModal(!isModal);
  }, [isModal]);

  const onSubmit = useCallback(
    (newPayment) => {
      const newOrder = {
        ...order,
        detail: {
          ...order.detail,
          payments: [
            ...order.detail.payments.slice(0, index),
            {
              ...order.detail.payments[index],
              ...newPayment,
            },
            ...order.detail.payments.slice(index + 1),
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
      const newPayments = payments.filter((couple, i) => i !== index);
      const newOrder = {
        ...order,
        detail: { ...order.detail, payments: newPayments },
      };
      dispatch(updateOrder(order.id, newOrder));
    },
    [payments, dispatch, order]
  );

  const renderTable = useCallback(() => {
    const newRow =
      payments &&
      payments.map((feature, i) => {
        var data = {};
        data.no = i + 1;
        data.bank = feature.bank;
        data.rekeningNo = feature.rekeningNo;
        data.name = feature.name;
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
  }, [onDelete, onEdit, payments]);

  useEffect(() => {
    if (order) {
      setPayments(order.detail.payments);
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
        <PaymentForm
          toggle={toggleModalForm}
          isOpen={isModal}
          payment={payment}
          onSubmit={onSubmit}
        />
      )}
    </>
  );
};

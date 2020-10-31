import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from "reactstrap";
import DataTable from "react-data-table-component";
import { InvitationForm } from "../../index";
import { updateOrder } from "../../../../store/actions/orderAction";

const columns = [
  {
    name: "No",
    selector: "no",
    sortable: true,
    center: true,
  },
  {
    name: "Code",
    selector: "code",
    sortable: false,
    left: true,
  },
  {
    name: "Name",
    selector: "name",
    sortable: true,
    left: true,
  },
  {
    name: "From",
    selector: "from",
    sortable: true,
    left: true,
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

export default (props) => {
  const { order } = useSelector((state) => state.orderReducer);
  const [dataTable, setDataTable] = useState([]);
  const [invitation, setInvitation] = useState({});
  const [isModal, setIsModal] = useState(false);
  const [index, setIndex] = useState(null);
  const [invitations, setInvitations] = useState([]);
  const dispatch = useDispatch();

  const onEdit = useCallback(
    (i, editPayment) => {
      setInvitation(editPayment);
      setIsModal(!isModal);
      setIndex(i);
    },
    [isModal]
  );

  const toggleModalForm = useCallback(() => {
    setIsModal(!isModal);
  }, [isModal]);

  const onSubmit = useCallback(
    (newInvitation) => {
      const newOrder = {
        ...order,
        detail: {
          ...order.detail,
          invitations: [
            ...order.detail.invitations.slice(0, index),
            {
              ...order.detail.invitations[index],
              ...newInvitation,
            },
            ...order.detail.invitations.slice(index + 1),
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
      const newInvitations = invitations.filter((couple, i) => i !== index);
      const newOrder = {
        ...order,
        detail: { ...order.detail, invitations: newInvitations },
      };
      dispatch(updateOrder(order.id, newOrder));
    },
    [invitations, dispatch, order]
  );

  const renderTable = useCallback(() => {
    const newRow =
      invitations &&
      invitations.map((feature, i) => {
        var data = {};
        data.no = i + 1;
        data.code = feature.code;
        data.name = feature.name;
        data.from = feature.from;
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
  }, [onDelete, onEdit, invitations]);

  useEffect(() => {
    if (order) {
      setInvitations(order.detail.invitations);
      renderTable();
    }
  }, [renderTable, order]);

  const handleChange = (state) => {
    var filteredArray = invitations.filter(function (array_el) {
      return (
        state.selectedRows.filter(function (anotherOne_el) {
          return anotherOne_el.code === array_el.code;
        }).length === 0
      );
    });
    const newOrder = {
      ...order,
      detail: { ...order.detail, invitations: filteredArray },
    };
    props.onUpdate(newOrder);
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
        selectableRows
        onSelectedRowsChange={handleChange}
      />
      {isModal && (
        <InvitationForm
          toggle={toggleModalForm}
          isOpen={isModal}
          invitation={invitation}
          onSubmit={onSubmit}
        />
      )}
    </>
  );
};

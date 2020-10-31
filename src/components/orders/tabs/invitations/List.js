import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Button } from "reactstrap";
import { updateOrder } from "../../../../store/actions/orderAction";
import { errorAlert } from "../../../../store/actions/utility";
import {
  InvitationForm,
  InvitationListItem,
} from "../../../../components/orders/index";

export default () => {
  const dispatch = useDispatch();
  const [isModal, setIsModal] = useState(false);
  const [orderTemp, setOrderTemp] = useState(null);
  const { order } = useSelector((state) => state.orderReducer);

  const toggleModalForm = () => {
    setIsModal(!isModal);
  };

  const onSubmit = (newInvitation) => {
    const newOrder = {
      ...order,
      detail: {
        ...order.detail,
        invitations: [
          ...order.detail.invitations,
          {
            ...newInvitation,
            code:
              newInvitation.name
                .toLowerCase()
                .replace(/ /g, "-")
                .replace(/[^\w-]+/g, "") +
              "-" +
              Date.now(),
          },
        ],
      },
    };
    dispatch(updateOrder(order.id, newOrder));
    setIsModal();
  };

  const onUpdate = () => {
    if (orderTemp !== null) {
      dispatch(updateOrder(order.id, orderTemp));
      setOrderTemp(null);
    } else {
      errorAlert("Please select data");
    }
  };

  return (
    <div>
      <Row>
        <div className="col">
          <div className="row">
            <div className="col-6">
              <h3 className="mb-0">Invitation List</h3>
            </div>
            <div className="text-right col-6">
              <Button
                className="btn-icon btn-2"
                color="danger"
                type="button"
                size="sm"
                onClick={onUpdate}
              >
                <span className="btn-inner--icon">
                  <i className="fas fa-trash" />
                </span>
                Delete
              </Button>
              <Button
                className="btn-icon btn-2"
                color="primary"
                type="button"
                size="sm"
                onClick={toggleModalForm}
              >
                <span className="btn-inner--icon">
                  <i className="ni ni-fat-add" />
                </span>
                New
              </Button>
            </div>
          </div>
          <InvitationListItem onUpdate={(newOrder) => setOrderTemp(newOrder)} />
        </div>
      </Row>
      <InvitationForm
        toggle={toggleModalForm}
        isOpen={isModal}
        onSubmit={onSubmit}
      />
    </div>
  );
};

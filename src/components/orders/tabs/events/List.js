import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row } from "reactstrap";
import { updateOrder } from "../../../../store/actions/orderAction";
import { EventModalForm } from "../../../../components/orders/index";
import Maps from "../../../../components/Maps";

export default () => {
  const dispatch = useDispatch();
  const [isModal, setIsModal] = useState(false);
  const [isModalEdit, setIsModalEdit] = useState(false);
  const [event, setEvent] = useState({});
  const [eventEdit, setEventEdit] = useState({});
  const [index, setIndex] = useState(null);
  const { order } = useSelector((state) => state.orderReducer);

  const toggleModalForm = () => {
    setIsModal(!isModal);
  };

  const onSubmit = (newEvent) => {
    const newOrder = {
      ...order,
      detail: {
        ...order.detail,
        events: [...order.detail.events, { ...event, ...newEvent }],
      },
    };
    dispatch(updateOrder(order.id, newOrder));
    setIsModal();
  };

  const showForm = (coordinate) => {
    setEvent({ ...event, lat: coordinate.lat, lng: coordinate.lng });
    setIsModal(true);
  };

  const onDrag = (i, coordinate) => {
    const newEvent = { ...event, ...coordinate };
    const newOrder = {
      ...order,
      detail: {
        ...order.detail,
        events: [
          ...order.detail.events.slice(0, i),
          {
            ...order.detail.events[i],
            ...newEvent,
          },
          ...order.detail.events.slice(i + 1),
        ],
      },
    };
    dispatch(updateOrder(order.id, newOrder));
  };

  const onMarkerClick = (i) => {
    const newEvent = { ...order.detail.events[i] };
    setIsModalEdit(true);
    setEventEdit(newEvent);
    setIndex(i);
  };

  const onUpdate = (newEvent) => {
    const newOrder = {
      ...order,
      detail: {
        ...order.detail,
        events: [
          ...order.detail.events.slice(0, index),
          {
            ...order.detail.events[index],
            ...newEvent,
          },
          ...order.detail.events.slice(index + 1),
        ],
      },
    };
    dispatch(updateOrder(order.id, newOrder));
    setIsModalEdit(false);
    setIndex(null);
  };

  const onDelete = () => {
    const newEvents = order.detail.events.filter((event, i) => i !== index);
    const newOrder = {
      ...order,
      detail: { ...order.detail, events: newEvents },
    };
    dispatch(updateOrder(order.id, newOrder));
    setIsModalEdit(false);
    setIndex(null);
  };

  return (
    <div>
      <Row>
        <div className="col">
          <div className="row">
            <div className="col-6">
              <h3 className="mb-0">Event List</h3>
            </div>
            <div className="text-right col-6"></div>
          </div>
          <br />
          {order && (
            <Maps
              onPlaceSelected={showForm}
              markers={order && order.detail.events}
              onDragEnd={(i, coordinate) => onDrag(i, coordinate)}
              onMarkerClick={onMarkerClick}
              onDelete={onDelete}
            />
          )}
        </div>
      </Row>
      <EventModalForm
        toggle={toggleModalForm}
        isOpen={isModal}
        onSubmit={onSubmit}
      />

      <EventModalForm
        toggle={() => setIsModalEdit(!isModalEdit)}
        isOpen={isModalEdit}
        event={eventEdit}
        onSubmit={onUpdate}
        onDelete={onDelete}
      />
    </div>
  );
};

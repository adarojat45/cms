import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Button } from "reactstrap";
import { updateOrder } from "../../../../store/actions/orderAction";
import { VideoListItem } from "../../../../components/orders/index";
import { VideoGallery } from "../../../../components/videos";

export default () => {
  const dispatch = useDispatch();
  const [isModal, setIsModal] = useState(false);
  const { order } = useSelector((state) => state.orderReducer);

  const toggleModalForm = () => {
    setIsModal(!isModal);
  };

  const onSubmit = (newVideo) => {
    const newOrder = {
      ...order,
      detail: {
        ...order.detail,
        videos: [...order.detail.videos, { ...newVideo, isActive: false }],
      },
    };
    dispatch(updateOrder(order.id, newOrder));
    setIsModal();
  };

  return (
    <div>
      <Row>
        <div className="col">
          <div className="row">
            <div className="col-6">
              <h3 className="mb-0">Video List</h3>
            </div>
            <div className="text-right col-6">
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
          <VideoListItem />
        </div>
      </Row>
      <VideoGallery
        toggle={toggleModalForm}
        isOpen={isModal}
        onSelect={onSubmit}
      />
    </div>
  );
};

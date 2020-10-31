import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Button } from "reactstrap";
import { updateOrder } from "../../../../store/actions/orderAction";
import { StoryForm, StoryListItem } from "../../../../components/orders/index";
import { ModalGallery } from "../../../../components/images";

export default () => {
  const dispatch = useDispatch();
  const [isModal, setIsModal] = useState(false);
  const { order } = useSelector((state) => state.orderReducer);

  const toggleModalForm = () => {
    setIsModal(!isModal);
  };

  const onSubmit = (newStory) => {
    const newOrder = {
      ...order,
      detail: {
        ...order.detail,
        stories: [...order.detail.stories, newStory],
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
              <h3 className="mb-0">Story List</h3>
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
          <StoryListItem />
        </div>
      </Row>
      <StoryForm
        toggle={toggleModalForm}
        isOpen={isModal}
        onSubmit={onSubmit}
      />
      <ModalGallery />
    </div>
  );
};

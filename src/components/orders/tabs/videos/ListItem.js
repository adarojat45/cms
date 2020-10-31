import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  CardTitle,
} from "reactstrap";
import { updateOrder } from "../../../../store/actions/orderAction";
import { VideoForm } from "../../../videos/index";

export default () => {
  const { order } = useSelector((state) => state.orderReducer);
  const [video, setVideo] = useState({});
  const [index, setIndex] = useState(null);
  const [isModal, setIsModal] = useState(false);
  const [videos, setVideos] = useState([]);
  const dispatch = useDispatch();

  const onEdit = (i, videoEdit) => {
    setVideo(videoEdit);
    setIndex(i);
    setIsModal(!isModal);
  };

  const onDelete = useCallback(
    async (index) => {
      const newVideos = videos.filter((video, i) => i !== index);
      const newOrder = {
        ...order,
        detail: { ...order.detail, videos: newVideos },
      };
      dispatch(updateOrder(order.id, newOrder));
    },
    [videos, dispatch, order]
  );

  const onSubmit = useCallback(
    (newVideos) => {
      const newOrder = {
        ...order,
        detail: {
          ...order.detail,
          videos: [
            ...order.detail.videos.slice(0, index),
            {
              ...order.detail.videos[index],
              ...newVideos,
            },
            ...order.detail.videos.slice(index + 1),
          ],
        },
      };
      dispatch(updateOrder(order.id, newOrder));
      setIsModal(!isModal);
    },
    [dispatch, order, index, isModal]
  );

  useEffect(() => {
    if (order) {
      setVideos(order.detail.videos);
    }
  }, [order]);

  return (
    <>
      <div
        className="card-group"
        style={{ display: "flex", justifyContent: "center" }}
      >
        {videos.map((video, i) => {
          return (
            <div style={{ maxWidth: "205px" }} key={i}>
              <video
                width="200"
                controls
                style={{ marginRight: "5px" }}
                poster={video.thumbnail}
              >
                <source src={video.url} type="video/mp4" />
              </video>
              <CardTitle tag="h6" className="text-muted mb-0">
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
                    <DropdownItem onClick={() => onEdit(i, video)}>
                      Edit
                    </DropdownItem>
                    <DropdownItem onClick={() => onDelete(i)}>
                      Delete
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                {video.caption}
              </CardTitle>
            </div>
          );
        })}
      </div>
      <VideoForm
        video={video}
        isOpen={isModal}
        toggle={() => setIsModal(!isModal)}
        onSubmit={onSubmit}
      />
    </>
  );
};

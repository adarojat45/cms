import React, { useEffect, useState } from "react";
import { Button, Modal, CardTitle } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { getVideos, addVideo } from "../../store/actions/videoAction";
import { VideoForm } from "./index";

export default (props) => {
  const { videos } = useSelector((state) => state.videoReducer);
  const dispatch = useDispatch();
  const [isModal, setIsModal] = useState(false);

  useEffect(() => {
    dispatch(getVideos());
  }, [dispatch]);

  const onAdd = () => {
    setIsModal(!isModal);
  };

  const onSubmit = (newVideo) => {
    dispatch(addVideo(newVideo));
    setIsModal(false);
  };

  return (
    <div>
      <Modal
        style={{ maxWidth: "90%" }}
        className="modal-dialog-centered"
        isOpen={props.isOpen}
        toggle={() => props.toggle()}
      >
        <div className="modal-header">
          <h3 className="modal-title" id="exampleModalLabel">
            Video Gallery
          </h3>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => props.toggle()}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className="modal-body">
          <div
            className="card-group"
            style={{ display: "flex", justifyContent: "center" }}
          >
            {videos && videos.map((video, i) => {
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
                  <CardTitle
                    tag="h6"
                    className="text-muted mb-0"
                    onDoubleClick={() => props.onSelect(video)}
                  >
                    {video.caption}
                  </CardTitle>
                </div>
              );
            })}
          </div>
        </div>
        <div className="modal-footer">
          <Button
            color="secondary"
            data-dismiss="modal"
            type="button"
            onClick={() => props.toggle()}
          >
            <span className="btn-inner--icon">
              <i className="fas fa-times-circle" />
            </span>
            <span className="btn-inner--text"> Close</span>
          </Button>
          <Button color="primary" onClick={onAdd}>
            <span className="btn-inner--icon">
              <i className="fas fa-plus-circle" />
            </span>
            <span className="btn-inner--text">Add Video</span>
          </Button>
        </div>
      </Modal>
      <VideoForm
        isOpen={isModal}
        onSubmit={onSubmit}
        toggle={() => setIsModal(!isModal)}
      />
    </div>
  );
};

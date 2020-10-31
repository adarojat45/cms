import React, { useEffect } from "react";
import ReactCloudinaryUploader from "@app-masters/react-cloudinary-uploader";
import { Button, Modal } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { getImages, addImage } from "../../store/actions/imageAction";
import { cloudinaryOptions } from "../../store/actions/config";

export default (props) => {
  const { images } = useSelector((state) => state.imageReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getImages());
  }, [dispatch]);

  const onUpload = async () => {
    const image = await ReactCloudinaryUploader.open(cloudinaryOptions);
    const newImage = {
      url: image.url,
      thumbnailUrl: image.thumbnail_url,
      path: image.path,
    };
    dispatch(addImage(newImage));
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
            Image Gallery
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
            {images &&
              images.map((image, i) => {
                return (
                  <img
                    alt={image.description}
                    src={image.url}
                    style={{ maxWidth: 100, margin: 5, maxHeight: 100 }}
                    className={
                      props.selectedImages &&
                      props.selectedImages.some(
                        (selectedImage) => selectedImage.url === image.url
                      )
                        ? "selected rounded-circle"
                        : "rounded-circle"
                    }
                    onClick={() => props.onSelect(image)}
                    key={i}
                  />
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
              <i className="ni ni-fat-remove" />
            </span>
            <span className="btn-inner--text"> Close</span>
          </Button>
          <Button color="primary" onClick={onUpload}>
            <span className="btn-inner--icon">
              <i className="ni ni-cloud-upload-96" />
            </span>
            <span className="btn-inner--text">Upload</span>
          </Button>
        </div>
      </Modal>
    </div>
  );
};

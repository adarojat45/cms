import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroup,
  Modal,
  Row,
  Col,
} from "reactstrap";
import { errorAlert } from "../../store/actions/utility";
import ReactCloudinaryUploader from "@app-masters/react-cloudinary-uploader";
import { cloudinaryOptions } from "../../store/actions/config";

export default (props) => {
  const [video, setVideo] = useState({
    caption: "",
    url: "",
    path: "",
    thumbnailUrl: "",
  });

  useEffect(() => {
    if (props.video) {
      setVideo({
        caption: props.video.caption,
        url: props.video.url,
        path: props.video.path,
        thumbnailUrl: props.video.thumbnailUrl,
      });
    }
  }, [props]);

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setVideo({ ...video, [name]: value });
  };

  const onUpload = async () => {
    const songCloud = await ReactCloudinaryUploader.open(cloudinaryOptions);
    const newVideo = {
      ...video,
      url: songCloud.url,
      thumbnailUrl: songCloud.thumbnail_url,
      path: songCloud.path,
    };
    setVideo({ ...newVideo });
  };

  const onSubmit = () => {
    if (video.caption === "" || video.url === "") {
      return errorAlert("Caption and file are required");
    }
    props.onSubmit({ ...video });
    setVideo({
      caption: "",
      url: "",
      path: "",
      thumbnailUrl: "",
    });
  };

  return (
    <>
      <Row>
        <Col md="12">
          <Modal
            className="modal-dialog-centered modal-lg"
            isOpen={props.isOpen}
            toggle={props.toggle}
          >
            <div className="modal-header">
              <h3 className="modal-title" id="modal-title-default">
                Video Form
              </h3>
              <button
                aria-label="Close"
                className="close"
                data-dismiss="modal"
                type="button"
                onClick={props.toggle}
              >
                <span aria-hidden={true}>×</span>
              </button>
            </div>
            <div className="modal-body p-0">
              <Card className="bg-secondary shadow border-0">
                <CardBody className="px-lg-5 py-lg-5">
                  <Form role="form">
                    {video.url !== "" && (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <video
                          width="400"
                          controls
                          style={{ marginRight: "5px", marginBottom: "5px" }}
                          poster={video.thumbnail}
                        >
                          <source src={video.url} type="video/mp4" />
                        </video>
                      </div>
                    )}
                    <FormGroup className="mb-3">
                      <InputGroup className="input-group-alternative">
                        <Input
                          id="exampleFormControlTextarea1"
                          placeholder="Write a caption text here ..."
                          rows="3"
                          type="textarea"
                          name="caption"
                          value={video.caption}
                          onChange={onChange}
                        />
                      </InputGroup>
                    </FormGroup>
                    <Button
                      color="primary"
                      onClick={onUpload}
                      className="float-right"
                    >
                      <span className="btn-inner--icon">
                        <i className="ni ni-cloud-upload-96" />
                      </span>
                      <span className="btn-inner--text">Upload</span>
                    </Button>
                  </Form>
                </CardBody>
              </Card>
            </div>
            <div className="modal-footer">
              <Button
                className="ml-auto"
                color="secondary"
                data-dismiss="modal"
                type="button"
                onClick={props.toggle}
              >
                Close
              </Button>
              <Button color="primary" type="button" onClick={() => onSubmit()}>
                Save changes
              </Button>
            </div>
          </Modal>
        </Col>
      </Row>
    </>
  );
};

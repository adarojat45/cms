import React, { useState } from "react";
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
  CardTitle,
} from "reactstrap";
import { errorAlert } from "../../store/actions/utility";
import ReactCloudinaryUploader from "@app-masters/react-cloudinary-uploader";
import ReactHowler from "react-howler";
import { cloudinaryOptions } from "../../store/actions/config";

export default (props) => {
  const [song, setSong] = useState({
    artist: "",
    title: "",
    url: "",
    path: "",
    thumbnailUrl: "",
  });
  const [playingSong, setPlayingSong] = useState({
    artist: "",
    title: "",
    url: "test.mp3",
    path: "",
    thumbnailUrl: "",
  });

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setSong({ ...song, [name]: value });
  };

  const onUpload = async () => {
    const songCloud = await ReactCloudinaryUploader.open(cloudinaryOptions);
    const newSong = {
      ...song,
      url: songCloud.url,
      thumbnailUrl: songCloud.thumbnail_url,
      path: songCloud.path,
    };
    setSong({ ...newSong });
  };

  const onPlay = () => {
    if (song.url !== playingSong.url) {
      setPlayingSong({ ...song });
    } else {
      setPlayingSong({
        artist: "",
        title: "",
        url: "test.mp3",
        path: "",
        thumbnailUrl: "",
      });
    }
  };

  const onSubmit = () => {
    if (song.title === "" || song.artist === "" || song.url === "") {
      return errorAlert("Title, artist and file are required");
    }
    props.onSubmit({ ...song });
    setSong({
      artist: "",
      title: "",
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
                Song Form
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
                    <FormGroup className="mb-3">
                      <div className="row">
                        <div className="col-md-6">
                          <InputGroup className="input-group-alternative">
                            <Input
                              placeholder="Artist"
                              type="text"
                              name="artist"
                              value={song.artist}
                              onChange={onChange}
                            />
                          </InputGroup>
                        </div>
                        <div className="col-md-6">
                          <InputGroup className="input-group-alternative">
                            <Input
                              placeholder="Title"
                              type="text"
                              name="title"
                              value={song.title}
                              onChange={onChange}
                            />
                          </InputGroup>
                        </div>
                      </div>
                    </FormGroup>
                    {song.url === "" ? (
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
                    ) : (
                      <div className="row">
                        <div className="col-md-3"></div>
                        <div className="col-md-6">
                          <Card className="card-stats mb-4 mb-xl-0">
                            <CardBody>
                              <div className="row">
                                <div className="col-md-8">
                                  <CardTitle
                                    tag="h6"
                                    className="text-uppercase text-muted mb-0"
                                  >
                                    {song.title}
                                  </CardTitle>
                                  <span className="h5 font-weight-bold mb-0">
                                    {song.artist}
                                  </span>
                                </div>
                                <Col className="col-auto">
                                  <div
                                    className="icon icon-shape bg-primary text-white rounded-circle shadow"
                                    onClick={() => onPlay()}
                                  >
                                    {song.url === playingSong.url ? (
                                      <i className="fas fa-pause" />
                                    ) : (
                                      <i className="fas fa-play" />
                                    )}
                                  </div>
                                </Col>
                              </div>
                            </CardBody>
                          </Card>
                        </div>
                      </div>
                    )}
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
      <ReactHowler src={playingSong.url} playing={true} />
    </>
  );
};

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
import { ModalGallery } from "../../../images/index";
import { errorAlert } from "../../../../store/actions/utility";

export default (props) => {
  const [image, setImage] = useState({
    caption: "",
    isCover: false,
    isGallery: false,
    url: "",
    path: "",
    thumbnailUrl: "",
  });
  const [isGallery, setIsGallery] = useState(false);

  useEffect(() => {
    if (props.image) {
      setImage({
        caption: props.image.caption,
        url: props.image.url,
        path: props.image.path,
        thumbnailUrl: props.image.thumbnailUrl,
      });
    }
  }, [props]);

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setImage({ ...image, [name]: value });
  };

  const toggleGallery = () => {
    setIsGallery(!isGallery);
  };

  const onSelectImage = (selectedImage) => {
    const newImage = { ...image, ...selectedImage };
    setImage(newImage);
  };

  const onSubmit = () => {
    if (image.title === "" || image.url === "") {
      return errorAlert("Title, date, description and images are required");
    }
    const newImage = {
      ...image,
    };
    props.onSubmit(newImage);
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
                Image Form
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
                    <div
                      className="card-group"
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      {image.url === "" ? (
                        <p>Please select image</p>
                      ) : (
                        <img
                          alt={image.description}
                          src={image.url}
                          style={{
                            maxWidth: 100,
                            margin: 5,
                            maxHeight: 100,
                          }}
                          onClick={() => props.onSelect(image)}
                        />
                      )}
                    </div>
                    <FormGroup className="mb-3">
                      <label
                        className="form-control-label"
                        htmlFor="input-address"
                      >
                        Caption
                      </label>
                      <InputGroup className="input-group-alternative">
                        <Input
                          id="exampleFormControlTextarea1"
                          placeholder="Write a caption text here ..."
                          rows="3"
                          type="textarea"
                          name="caption"
                          value={image.caption}
                          onChange={onChange}
                        />
                      </InputGroup>
                    </FormGroup>
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
              <Button color="primary" type="button" onClick={toggleGallery}>
                Add Image
              </Button>
              <Button color="primary" type="button" onClick={() => onSubmit()}>
                Save changes
              </Button>
            </div>
          </Modal>
        </Col>
      </Row>
      <ModalGallery
        isOpen={isGallery}
        toggle={toggleGallery}
        onSelect={onSelectImage}
        selectedImages={[image]}
      />
    </>
  );
};

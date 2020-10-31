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
  const [couple, setCouple] = useState({
    fullName: "",
    nickName: "",
    father: "",
    mother: "",
    description: "",
  });
  const [isGallery, setIsGallery] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (props.couple) {
      setCouple({
        fullName: props.couple.fullName,
        nickName: props.couple.nickName,
        father: props.couple.father,
        mother: props.couple.mother,
        description: props.couple.description,
      });
      setImages(props.couple.images);
    }
  }, [props]);

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCouple({ ...couple, [name]: value });
  };

  const toggleGallery = () => {
    setIsGallery(!isGallery);
  };

  const onSelectImage = (newImage) => {
    const image = imageChecker(newImage);
    if (image.length <= 0) {
      setImages(images.concat(newImage));
    } else {
      const imagesTemp = [...images];
      const newImages = imagesTemp.filter(
        (image) => image.url !== newImage.url
      );
      setImages(newImages);
    }
  };

  const imageChecker = (newImage) => {
    return images.filter((image) => image.url === newImage.url);
  };

  const onSubmit = () => {
    if (
      couple.nickName === "" ||
      couple.fullName === "" ||
      couple.father === "" ||
      couple.mother === "" ||
      couple.description === "" ||
      images.length <= 0
    ) {
      return errorAlert(
        "Fullname, nickname, father, mother, description and images are required"
      );
    }
    const newCouple = {
      ...couple,
      images,
    };
    props.onSubmit(newCouple);
    setCouple({
      fullName: "",
      nickName: "",
      father: "",
      mother: "",
      description: "",
    });
    setImages([]);
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
                Couple Form
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
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            Full Name
                          </label>
                          <InputGroup className="input-group-alternative">
                            <Input
                              placeholder="Full Name"
                              type="text"
                              name="fullName"
                              value={couple.fullName}
                              onChange={onChange}
                            />
                          </InputGroup>
                        </div>
                        <div className="col-md-6">
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            Nick Name
                          </label>
                          <InputGroup className="input-group-alternative">
                            <Input
                              placeholder="Nick Name"
                              type="text"
                              name="nickName"
                              value={couple.nickName}
                              onChange={onChange}
                            />
                          </InputGroup>
                        </div>
                      </div>
                    </FormGroup>
                    <FormGroup className="mb-3">
                      <div className="row">
                        <div className="col-md-6">
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            Father
                          </label>
                          <InputGroup className="input-group-alternative">
                            <Input
                              placeholder="Father"
                              type="text"
                              name="father"
                              value={couple.father}
                              onChange={onChange}
                            />
                          </InputGroup>
                        </div>
                        <div className="col-md-6">
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            Mother
                          </label>
                          <InputGroup className="input-group-alternative">
                            <Input
                              placeholder="Mother"
                              type="text"
                              name="mother"
                              value={couple.mother}
                              onChange={onChange}
                            />
                          </InputGroup>
                        </div>
                      </div>
                    </FormGroup>
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-address"
                      >
                        Description
                      </label>
                      <InputGroup className="input-group-alternative">
                        <Input
                          id="exampleFormControlTextarea1"
                          placeholder="Write a description text here ..."
                          rows="3"
                          type="textarea"
                          name="description"
                          value={couple.description}
                          onChange={onChange}
                        />
                      </InputGroup>
                    </FormGroup>
                    <div
                      className="card-group"
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      {images.map((image, i) => {
                        return (
                          <img
                            alt={image.description}
                            src={image.url}
                            style={{ maxWidth: 100, margin: 5, maxHeight: 100 }}
                            className={
                              props.selectedImage &&
                              props.selectedImages.some(
                                (selectedImage) =>
                                  selectedImage.url === image.url
                              )
                                ? "selected"
                                : ""
                            }
                            onClick={() => props.onSelect(image)}
                            key={i}
                          />
                        );
                      })}
                    </div>
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
        selectedImages={images}
        isOpen={isGallery}
        toggle={toggleGallery}
        onSelect={onSelectImage}
      />
    </>
  );
};

import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import Select from "react-select";
import { getPackages } from "../../store/actions/packageAction";
import { ModalGallery } from "../images/index";
import { errorAlert } from "../../store/actions/utility";

export default (props) => {
  const { packages } = useSelector((state) => state.packageReducer);
  const dispatch = useDispatch();
  const [template, setTemplate] = useState({
    name: "",
    description: "",
    package: null,
  });
  const [options, setOptions] = useState([]);
  const [isGallery, setIsGallery] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    dispatch(getPackages());
  }, [dispatch]);

  useEffect(() => {
    if (props.template) {
      setTemplate({
        name: props.template.name,
        description: props.template.description,
        domain: props.template.domain,
        package: {
          label: props.template.package.name,
          value: props.template.package,
          id: props.template.package.id,
        },
      });
      setImages(props.template.images);
    }
  }, [props]);

  const converDataForReactSelect = useCallback((array) => {
    const newOptions = [];
    for (let i = 0; i < array.length; i++) {
      const newOption = {
        label: array[i].name,
        value: array[i].id,
        id: array[i].id,
      };
      newOptions.push(newOption);
    }
    return newOptions;
  }, []);

  useEffect(() => {
    const newOptions = converDataForReactSelect(packages);
    setOptions(newOptions);
  }, [packages, converDataForReactSelect]);

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setTemplate({ ...template, [name]: value });
  };

  const onPackageChange = (e) => {
    setTemplate({ ...template, package: e });
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
      template.domain === "" ||
      template.name === "" ||
      template.package == null ||
      images.length <= 0
    ) {
      return errorAlert("Domain, name, package and images are required");
    }
    const newTemplate = {
      ...template,
      images,
    };
    props.onSubmit(newTemplate);
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
                Template Form
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
                      <label
                        className="form-control-label"
                        htmlFor="input-address"
                      >
                        Domain
                      </label>
                      <InputGroup className="input-group-alternative">
                        <Input
                          placeholder="Domain"
                          type="text"
                          name="domain"
                          value={template.domain}
                          onChange={onChange}
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup className="mb-3">
                      <label
                        className="form-control-label"
                        htmlFor="input-address"
                      >
                        Name
                      </label>
                      <InputGroup className="input-group-alternative">
                        <Input
                          placeholder="Name"
                          type="text"
                          name="name"
                          value={template.name}
                          onChange={onChange}
                        />
                      </InputGroup>
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
                          value={template.description}
                          onChange={onChange}
                        />
                      </InputGroup>
                    </FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-address"
                    >
                      Package
                    </label>
                    <Select
                      options={options}
                      defaultValue={template.package}
                      onChange={onPackageChange}
                      closeMenuOnSelect={true}
                    />
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

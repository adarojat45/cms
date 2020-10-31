import React, { useState, useEffect } from "react";
import { FormGroup, Form, Input, Row, Col, Button } from "reactstrap";
import { errorAlert } from "../../store/actions/utility";
import { ModalGallery } from "../images";
import { Editor } from "@tinymce/tinymce-react";

export default (props) => {
  const [isError, setIsError] = useState(false);
  const [isGallery, setIsGallery] = useState(false);
  const [partner, setPartner] = useState({
    name: "",
    link: "",
    description: "",
    image: {
      url: "",
      path: "",
      thambnailUrl: "",
    },
  });

  useEffect(() => {
    if (props.partner) {
      setPartner({
        name: props.partner.name,
        link: props.partner.link,
        description: props.partner.description,
        image: props.partner.image,
      });
    }
  }, [props]);

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPartner({ ...partner, [name]: value });
  };

  const onDescriptionChange = (content) => {
    const newPartner = { ...partner, description: content };
    setPartner(newPartner);
  };

  const onSelectImage = (newImage) => {
    const newPartner = { ...partner, image: newImage };
    setPartner(newPartner);
    setIsGallery(false);
  };

  const onSubmit = () => {
    if (partner.name === "") {
      setIsError(true);
      return errorAlert("invalid input");
    }
    const newPartner = {
      ...partner,
    };
    props.onSubmit(newPartner);
    setPartner({
      name: "",
      link: "",
      description: "",
      image: {
        url: "",
        path: "",
        thambnailUrl: "",
      },
    });
  };

  return (
    <>
      <Form onSubmit={onSubmit}>
        <Row style={{ justifyContent: "center", alignItems: "center" }}>
          {partner.image.url === "" ? (
            <Button
              color="primary"
              type="button"
              onClick={() => setIsGallery(true)}
              className="float-right"
            >
              <i className="fas fa-image"></i> Select Image
            </Button>
          ) : (
            <img
              className="rounded-circle"
              alt="profileImage"
              src={partner.image.url}
              style={{ maxWidth: 200, margin: 5, maxHeight: 200 }}
              onClick={() => setIsGallery(true)}
            />
          )}
        </Row>
        <br />
        <Row>
          <Col md="6">
            <FormGroup
              className={
                isError === true && partner.name === ""
                  ? "has-danger"
                  : isError === true && partner.name !== ""
                  ? "has-success"
                  : null
              }
            >
              <label className="form-control-label" htmlFor="input-address">
                Name
              </label>
              <Input
                className={
                  isError === true && partner.name === ""
                    ? "is-invalid"
                    : isError === true && partner.name !== ""
                    ? "is-valid"
                    : null
                }
                id="name"
                placeholder="Name"
                type="text"
                name="name"
                value={partner.name}
                onChange={onChange}
              />
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <label className="form-control-label" htmlFor="input-address">
                Link
              </label>
              <Input
                id="link"
                placeholder="Link"
                type="text"
                name="link"
                value={partner.link}
                onChange={onChange}
              />
            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <label className="form-control-label" htmlFor="input-address">
            Description
          </label>
          <Editor
            apiKey={process.env.REACT_APP_TINYMCE_KEY}
            value={partner.description}
            init={{
              height: 300,
              menubar: false,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
                "emoticons image link",
              ],
              toolbar:
                "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | emoticons image link | help ",
            }}
            onEditorChange={(content) => onDescriptionChange(content)}
            placeholder="Description"
          />
        </FormGroup>
        <Button
          color="primary"
          type="button"
          onClick={() => onSubmit()}
          className="float-right"
        >
          Save changes
        </Button>
      </Form>
      <ModalGallery
        isOpen={isGallery}
        onSelect={onSelectImage}
        toggle={() => setIsGallery(!isGallery)}
        selectedImages={[{ ...partner.image }]}
      />
    </>
  );
};

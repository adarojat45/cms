import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { FormGroup, Form, Input, Row, Col, Button } from "reactstrap";
import { getPackages } from "../../store/actions/packageAction";
import { errorAlert } from "../../store/actions/utility";
import { ModalGallery } from "../images";

export default (props) => {
  const dispatch = useDispatch();
  const [isError, setIsError] = useState(false);
  const [isGallery, setIsGallery] = useState(false);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    image: {
      url: "",
      path: "",
      thambnailUrl: "",
    },
  });

  useEffect(() => {
    dispatch(getPackages());
  }, [dispatch]);

  useEffect(() => {
    if (props.user) {
      const newUser = {
        ...props.user,
        firstName: props.user.firstName,
        lastName: props.user.lastName,
        email: props.user.email,
        username: props.user.username,
        image: props.user.image,
      };
      setUser(newUser);
    }
  }, [props]);

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const newUser = { ...user, [name]: value };
    setUser(newUser);
  };

  const onSelectImage = (newImage) => {
    const newUser = { ...user, image: newImage };
    setUser(newUser);
    setIsGallery(false);
  };

  const onSubmit = () => {
    if (
      user.firstName === "" ||
      user.lastName === "" ||
      user.email === "" ||
      user.username === ""
    ) {
      setIsError(true);
      return errorAlert("invalid input");
    }
    const newUser = {
      ...user,
    };
    props.onSubmit(newUser);
    setUser({
      firstName: "",
      lastName: "",
      username: "",
      email: "",
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
          {user.image.url === "" ? (
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
              src={user.image.url}
              style={{ maxWidth: 200, margin: 5, maxHeight: 200 }}
              onClick={() => setIsGallery(true)}
            />
          )}
        </Row>
        <br />
        <Row>
          <Col md="6">
            <label className="form-control-label" htmlFor="input-address">
              First Name
            </label>
            <FormGroup
              className={
                isError === true && user.firstName === ""
                  ? "has-danger"
                  : isError === true && user.firstName !== ""
                  ? "has-success"
                  : null
              }
            >
              <Input
                className={
                  isError === true && user.firstName === ""
                    ? "is-invalid"
                    : isError === true && user.firstName !== ""
                    ? "is-valid"
                    : null
                }
                id="firstName"
                placeholder="First Name"
                type="text"
                name="firstName"
                value={user.firstName}
                onChange={onChange}
              />
            </FormGroup>
          </Col>
          <Col md="6">
            <label className="form-control-label" htmlFor="input-address">
              Last Name
            </label>
            <FormGroup
              className={
                isError === true && user.lastName === ""
                  ? "has-danger"
                  : isError === true && user.lastName !== ""
                  ? "has-success"
                  : null
              }
            >
              <Input
                className={
                  isError === true && user.lastName === ""
                    ? "is-invalid"
                    : isError === true && user.lastName !== ""
                    ? "is-valid"
                    : null
                }
                id="lastName"
                placeholder="Last Name"
                type="text"
                name="lastName"
                value={user.lastName}
                onChange={onChange}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <label className="form-control-label" htmlFor="input-address">
              Username
            </label>
            <FormGroup
              className={
                isError === true && user.username === ""
                  ? "has-danger"
                  : isError === true && user.username !== ""
                  ? "has-success"
                  : null
              }
            >
              <Input
                className={
                  isError === true && user.username === ""
                    ? "is-invalid"
                    : isError === true && user.username !== ""
                    ? "is-valid"
                    : null
                }
                id="username"
                placeholder="Username"
                type="text"
                name="username"
                value={user.username}
                onChange={onChange}
              />
            </FormGroup>
          </Col>
          <Col md="6">
            <label className="form-control-label" htmlFor="input-address">
              Email
            </label>
            <FormGroup
              className={
                isError === true && user.email === ""
                  ? "has-danger"
                  : isError === true && user.email !== ""
                  ? "has-success"
                  : null
              }
            >
              <Input
                className={
                  isError === true && user.email === ""
                    ? "is-invalid"
                    : isError === true && user.email !== ""
                    ? "is-valid"
                    : null
                }
                id="email"
                placeholder="Email"
                type="email"
                name="email"
                value={user.email}
                onChange={onChange}
              />
            </FormGroup>
          </Col>
        </Row>
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
        selectedImages={[{ ...user.image }]}
      />
    </>
  );
};

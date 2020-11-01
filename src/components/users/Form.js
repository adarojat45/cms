import React, { useState, useEffect } from "react";
import { FormGroup, Form, Input, Row, Col, Button } from "reactstrap";
import { errorAlert } from "../../store/actions/utility";
import { ModalGallery } from "../images";

export default ({ user, isClear, onSubmit, isCreate }) => {
  const [isError, setIsError] = useState(false);
  const [isGallery, setIsGallery] = useState(false);
  const [userInput, setUserInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    passwordConfirmation: "",
    image: {
      url: "",
      path: "",
      thambnailUrl: "",
    },
  });

  useEffect(() => {
    if (user) {
      setUserInput({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
        password: user.password,
        passwordConfirmation: user.passwordConfirmation,
        image: user.image,
      });
    }
  }, [user]);

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserInput({ ...userInput, [name]: value });
  };

  const onSelectImage = (newImage) => {
    const newUser = { ...user, image: newImage };
    setUserInput(newUser);
    setIsGallery(false);
  };

  const handleIsClear = () => {
    setUserInput({
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      image: {
        url: "",
        path: "",
        thambnailUrl: "",
      },
    });
  };

  const handleSubmit = () => {
    if (
      userInput.firstName === "" ||
      userInput.lastName === "" ||
      userInput.email === "" ||
      userInput.username === ""
    ) {
      setIsError(true);
      return errorAlert("invalid input");
    }

    if (isCreate) {
      if (userInput.password !== userInput.passwordConfirmation) {
        setIsError(true);
        return errorAlert("invalid input");
      }
    } else {
      delete userInput.password;
      delete userInput.passwordConfirmation;
    }

    const newUser = {
      ...userInput,
    };
    onSubmit(newUser);
    if (isClear) {
      handleIsClear();
    }
  };

  return (
    <>
      <Form onSubmit={onSubmit}>
        <Row style={{ justifyContent: "center", alignItems: "center" }}>
          {userInput.image.url === "" ? (
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
              onClick={() => setIsGallery(true)}
              className="rounded-circle"
              alt="profileImage"
              src={userInput.image.url}
              style={{ maxWidth: 200, margin: 5, maxHeight: 200 }}
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
                isError === true && userInput.firstName === ""
                  ? "mb-3 has-danger"
                  : isError === true && userInput.firstName !== ""
                  ? "mb-3 has-success"
                  : null
              }
            >
              <Input
                className={
                  isError === true && userInput.firstName === ""
                    ? "is-invalid"
                    : isError === true && userInput.firstName !== ""
                    ? "is-valid"
                    : null
                }
                id="firstName"
                placeholder="First Name"
                type="text"
                name="firstName"
                value={userInput.firstName}
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
                isError === true && userInput.lastName === ""
                  ? "has-danger"
                  : isError === true && userInput.lastName !== ""
                  ? "has-success"
                  : null
              }
            >
              <Input
                className={
                  isError === true && userInput.lastName === ""
                    ? "is-invalid"
                    : isError === true && userInput.lastName !== ""
                    ? "is-valid"
                    : null
                }
                id="lastName"
                placeholder="Last Name"
                type="text"
                name="lastName"
                value={userInput.lastName}
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
                isError === true && userInput.username === ""
                  ? "has-danger"
                  : isError === true && userInput.username !== ""
                  ? "has-success"
                  : null
              }
            >
              <Input
                className={
                  isError === true && userInput.username === ""
                    ? "is-invalid"
                    : isError === true && userInput.username !== ""
                    ? "is-valid"
                    : null
                }
                id="username"
                placeholder="Username"
                type="text"
                name="username"
                value={userInput.username}
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
                isError === true && userInput.email === ""
                  ? "has-danger"
                  : isError === true && userInput.email !== ""
                  ? "has-success"
                  : null
              }
            >
              <Input
                className={
                  isError === true && userInput.email === ""
                    ? "is-invalid"
                    : isError === true && userInput.email !== ""
                    ? "is-valid"
                    : null
                }
                id="email"
                placeholder="Email"
                type="email"
                name="email"
                value={userInput.email}
                onChange={onChange}
              />
            </FormGroup>
          </Col>
        </Row>

        {isCreate && (
          <Row>
            <Col md="6">
              <label className="form-control-label" htmlFor="input-address">
                Password
              </label>
              <FormGroup
                className={
                  (isError === true &&
                    userInput.password !== userInput.passwordConfirmation) ||
                  (isError === true && userInput.passwordConfirmation === "")
                    ? "has-danger"
                    : isError === true &&
                      userInput.password !== "" &&
                      userInput.password === userInput.passwordConfirmation
                    ? "has-success"
                    : null
                }
              >
                <Input
                  className={
                    (isError === true &&
                      userInput.password !== userInput.passwordConfirmation) ||
                    (isError === true && userInput.passwordConfirmation === "")
                      ? "is-invalid"
                      : isError === true &&
                        userInput.passwordConfirmation !== "" &&
                        userInput.password === userInput.passwordConfirmation
                      ? "is-valid"
                      : null
                  }
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={userInput.password}
                  onChange={onChange}
                />
              </FormGroup>
            </Col>
            <Col md="6">
              <label className="form-control-label" htmlFor="input-address">
                Password Confirmation
              </label>
              <FormGroup
                className={
                  (isError === true &&
                    userInput.password !== userInput.passwordConfirmation) ||
                  (isError === true && userInput.passwordConfirmation === "")
                    ? "has-danger"
                    : isError === true &&
                      userInput.passwordConfirmation !== "" &&
                      userInput.password === userInput.passwordConfirmation
                    ? "has-success"
                    : null
                }
              >
                <Input
                  className={
                    (isError === true &&
                      userInput.password !== userInput.passwordConfirmation) ||
                    (isError === true && userInput.passwordConfirmation === "")
                      ? "is-invalid"
                      : isError === true &&
                        userInput.passwordConfirmation !== "" &&
                        userInput.password === userInput.passwordConfirmation
                      ? "is-valid"
                      : null
                  }
                  placeholder="Password Confirmation"
                  type="password"
                  name="passwordConfirmation"
                  value={userInput.passwordConfirmation}
                  onChange={onChange}
                />
              </FormGroup>
            </Col>
          </Row>
        )}
        <Button
          color="primary"
          type="button"
          onClick={() => handleSubmit()}
          className="float-right"
        >
          <span className="btn-inner--icon">
            <i className="ni ni-check-bold" />
          </span>
          Save
        </Button>
      </Form>
      <ModalGallery
        isOpen={isGallery}
        onSelect={onSelectImage}
        toggle={() => setIsGallery(!isGallery)}
        selectedImages={[{ ...userInput.image }]}
      />
    </>
  );
};

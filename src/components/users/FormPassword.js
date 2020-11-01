import React, { useState } from "react";
import { FormGroup, Form, Input, Row, Col, Button } from "reactstrap";

export default ({ onSubmit }) => {
  const [isError, setIsError] = useState(false);
  const [user, setUser] = useState({
    password: "",
    passwordConfirmation: "",
  });

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
    setIsError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      user.passwordConfirmation === "" ||
      user.password === "" ||
      user.password !== user.passwordConfirmation
    ) {
      setIsError(true);
    } else {
      onSubmit({ ...user });
      setUser({
        password: "",
        passwordConfirmation: "",
      });
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md="6">
            <label className="form-control-label" htmlFor="input-address">
              Password
            </label>
            <FormGroup
              className={
                (isError === true &&
                  user.password !== user.passwordConfirmation) ||
                (isError === true && user.passwordConfirmation === "")
                  ? "has-danger"
                  : isError === true &&
                    user.password !== "" &&
                    user.password === user.passwordConfirmation
                  ? "has-success"
                  : null
              }
            >
              <Input
                className={
                  (isError === true &&
                    user.password !== user.passwordConfirmation) ||
                  (isError === true && user.passwordConfirmation === "")
                    ? "is-invalid"
                    : isError === true &&
                      user.passwordConfirmation !== "" &&
                      user.password === user.passwordConfirmation
                    ? "is-valid"
                    : null
                }
                placeholder="Password"
                type="password"
                name="password"
                value={user.password}
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
                  user.password !== user.passwordConfirmation) ||
                (isError === true && user.passwordConfirmation === "")
                  ? "has-danger"
                  : isError === true &&
                    user.passwordConfirmation !== "" &&
                    user.password === user.passwordConfirmation
                  ? "has-success"
                  : null
              }
            >
              <Input
                className={
                  (isError === true &&
                    user.password !== user.passwordConfirmation) ||
                  (isError === true && user.passwordConfirmation === "")
                    ? "is-invalid"
                    : isError === true &&
                      user.passwordConfirmation !== "" &&
                      user.password === user.passwordConfirmation
                    ? "is-valid"
                    : null
                }
                placeholder="Password Confirmation"
                type="password"
                name="passwordConfirmation"
                value={user.passwordConfirmation}
                onChange={onChange}
              />
            </FormGroup>
          </Col>
        </Row>
        <Button color="primary" type="submit" className="float-right">
          Save changes
        </Button>
      </Form>
    </>
  );
};

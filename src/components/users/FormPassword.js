import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FormGroup, Form, Input, Row, Col, Button } from "reactstrap";
import { errorAlert } from "../../store/actions/utility";
import { changePassword } from "../../store/actions/userAction";

export default (props) => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const [isError, setIsError] = useState(false);
  const [user, setUser] = useState({
    password: "",
    passwordConfirmation: "",
  });

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const onSubmit = () => {
    if (
      user.passwordConfirmation === "" ||
      user.password === "" ||
      user.password !== user.passwordConfirmation
    ) {
      setIsError(true);
      return errorAlert("invalid input");
    }
    const newUser = {
      ...user,
    };
    dispatch(changePassword(userId, newUser));
    setUser({
      password: "",
      passwordConfirmation: "",
    });
  };

  return (
    <>
      <Form onSubmit={onSubmit}>
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
        <Button
          color="primary"
          type="button"
          onClick={() => onSubmit()}
          className="float-right"
        >
          Save changes
        </Button>
      </Form>
    </>
  );
};

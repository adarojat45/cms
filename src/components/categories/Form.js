import React, { useState, useEffect } from "react";
import { FormGroup, Form, Input, InputGroup, Button } from "reactstrap";
import Alert from "../utilities/Alert";

export default ({ category, onSubmit, isClear }) => {
  const [categoryInput, setCategoryInput] = useState({
    name: "",
    description: "",
  });
  const [isAlert, setIsAlert] = useState(false);

  useEffect(() => {
    if (category) {
      setCategoryInput({
        name: category.name,
        description: category.description,
      });
    }
  }, [category]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setCategoryInput({ ...categoryInput, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (categoryInput.name === "") {
      return setIsAlert(true);
    }
    onSubmit(categoryInput);
    if (isClear) {
      setCategoryInput({
        name: "",
        description: "",
      });
    }
  };
  return (
    <>
      <Alert
        isShow={isAlert}
        onHide={() => setIsAlert(false)}
        message="Name is require"
      />
      <Form role="form" onSubmit={handleSubmit}>
        <FormGroup className="mb-3">
          <label className="form-control-label" htmlFor="input-address">
            Name
          </label>
          <InputGroup className="input-group-alternative">
            <Input
              placeholder="Name"
              type="text"
              name="name"
              value={categoryInput.name}
              onChange={onChange}
            />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <label className="form-control-label" htmlFor="input-address">
            Description
          </label>
          <InputGroup className="input-group-alternative">
            <Input
              id="exampleFormControlTextarea1"
              placeholder="Write a description text here ..."
              rows="3"
              type="textarea"
              name="description"
              value={categoryInput.description}
              onChange={onChange}
            />
          </InputGroup>
        </FormGroup>
        <div className="text-right">
          <Button type="submit" className="mt-1" color="primary">
            <span className="btn-inner--icon">
              <i className="ni ni-check-bold" />
            </span>
            Save
          </Button>
        </div>
      </Form>
    </>
  );
};

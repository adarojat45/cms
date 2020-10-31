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

export default (props) => {
  const [feature, setFeature] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    if (props.feature) {
      setFeature({
        name: props.feature.name,
        description: props.feature.description,
      });
    }
  }, [props]);

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFeature({ ...feature, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(feature);
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
                Feature Form
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
                  <Form role="form" onSubmit={onSubmit}>
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
                          value={feature.name}
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
                          value={feature.description}
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
              <Button
                color="primary"
                type="button"
                onClick={() => props.onSubmit(feature)}
              >
                Save changes
              </Button>
            </div>
          </Modal>
        </Col>
      </Row>
    </>
  );
};

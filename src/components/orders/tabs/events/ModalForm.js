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
import { errorAlert } from "../../../../store/actions/utility";

export default (props) => {
  const [event, setEvent] = useState({
    address: "",
    note: "",
    name: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    if (props.event) {
      setEvent({
        address: props.event.address,
        note: props.event.note,
        name: props.event.name,
        startDate: props.event.startDate,
        endDate: props.event.endDate,
      });
    }
  }, [props]);

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setEvent({ ...event, [name]: value });
  };

  const onSubmit = () => {
    if (event.address === "" || event.name === "") {
      return errorAlert("Address and name are required");
    }
    const newEvent = {
      ...event,
    };
    props.onSubmit(newEvent);
    setEvent({
      address: "",
      note: "",
      name: "",
      startDate: "",
      endDate: "",
    });
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
                Event Form
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
                        Name
                      </label>
                      <InputGroup className="input-group-alternative">
                        <Input
                          placeholder="Name"
                          type="text"
                          name="name"
                          value={event.name}
                          onChange={onChange}
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup className="mb-3">
                      <div className="row">
                        <div className="col-md-6">
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            Start Date
                          </label>
                          <InputGroup className="input-group-alternative">
                            <Input
                              placeholder="dd/mm/yyyy hh:mm"
                              type="text"
                              name="startDate"
                              value={event.startDate}
                              onChange={onChange}
                            />
                          </InputGroup>
                        </div>
                        <div className="col-md-6">
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            End Date
                          </label>
                          <InputGroup className="input-group-alternative">
                            <Input
                              placeholder="dd/mm/yyyy hh:mm"
                              type="text"
                              name="endDate"
                              value={event.endDate}
                              onChange={onChange}
                            />
                          </InputGroup>
                        </div>
                      </div>
                    </FormGroup>
                    <FormGroup className="mb-3">
                      <label
                        className="form-control-label"
                        htmlFor="input-address"
                      >
                        Address
                      </label>
                      <InputGroup className="input-group-alternative">
                        <Input
                          id="exampleFormControlTextarea1"
                          placeholder="Write a address text here ..."
                          rows="3"
                          type="textarea"
                          name="address"
                          value={event.address}
                          onChange={onChange}
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup className="mb-3">
                      <label
                        className="form-control-label"
                        htmlFor="input-address"
                      >
                        Note
                      </label>
                      <InputGroup className="input-group-alternative">
                        <Input
                          id="exampleFormControlTextarea2"
                          placeholder="Write a note text here ..."
                          rows="3"
                          type="textarea"
                          name="note"
                          value={event.note}
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
              {props.onDelete && (
                <Button
                  color="danger"
                  type="button"
                  onClick={() => props.onDelete()}
                >
                  Delete
                </Button>
              )}
              <Button color="primary" type="button" onClick={() => onSubmit()}>
                Save changes
              </Button>
            </div>
          </Modal>
        </Col>
      </Row>
    </>
  );
};

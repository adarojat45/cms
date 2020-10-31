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
  const [payment, setPayment] = useState({
    bank: "",
    rekeningNo: "",
    name: "",
  });

  useEffect(() => {
    if (props.payment) {
      setPayment({
        bank: props.payment.bank,
        rekeningNo: props.payment.rekeningNo,
        name: props.payment.name,
      });
    }
  }, [props]);

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPayment({ ...payment, [name]: value });
  };

  const onSubmit = () => {
    if (
      payment.bank === "" ||
      payment.rekeningNo === "" ||
      payment.name === ""
    ) {
      return errorAlert("Title, date, description and images are required");
    }
    const newStory = {
      ...payment,
    };
    props.onSubmit(newStory);
    setPayment({
      bank: "",
      rekeningNo: "",
      name: "",
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
                Payment Form
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
                        Bank
                      </label>
                      <InputGroup className="input-group-alternative">
                        <Input
                          placeholder="Bank"
                          type="text"
                          name="bank"
                          value={payment.bank}
                          onChange={onChange}
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup className="mb-3">
                      <label
                        className="form-control-label"
                        htmlFor="input-address"
                      >
                        Rekening Number
                      </label>
                      <InputGroup className="input-group-alternative">
                        <Input
                          placeholder="Rekening Number"
                          type="text"
                          name="rekeningNo"
                          value={payment.rekeningNo}
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
                          value={payment.name}
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

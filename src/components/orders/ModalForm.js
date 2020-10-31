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
import { getTemplates } from "../../store/actions/templateAction";
import { errorAlert } from "../../store/actions/utility";

export default (props) => {
  const { packages } = useSelector((state) => state.packageReducer);
  const { templates } = useSelector((state) => state.templateReducer);
  const dispatch = useDispatch();
  const [order, setOrder] = useState({
    name: "",
    domain: "",
    description: "",
    package: null,
    template: null,
  });
  const [packagesOptions, setPackagesOptions] = useState([]);
  const [templatesOptions, setTemplatesOPtions] = useState([]);

  useEffect(() => {
    dispatch(getPackages());
    dispatch(getTemplates());
  }, [dispatch]);

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
    const newPackagesOptions = converDataForReactSelect(packages);
    const newTemplatesOptions = converDataForReactSelect(templates);
    setPackagesOptions(newPackagesOptions);
    setTemplatesOPtions(newTemplatesOptions);
  }, [packages, converDataForReactSelect, templates]);

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setOrder({ ...order, [name]: value });
  };

  const onPackageChange = (e) => {
    setOrder({ ...order, package: e });
  };

  const onTemplateChange = (e) => {
    setOrder({ ...order, template: e });
  };

  const onSubmit = () => {
    if (order.domain === "" || order.name === "" || order.package == null) {
      return errorAlert("Domain, name and package are required");
    }
    const newTemplate = {
      ...order,
    };
    props.onSubmit(newTemplate);
    setOrder({
      name: "",
      description: "",
      domain: "",
      email: "",
      phone: "",
      package: {
        label: "",
        value: "",
        id: "",
      },
      template: {
        label: "",
        value: "",
        id: "",
      },
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
                Order Form
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
                    <div className="row">
                      <div className="col-md-6">
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
                              value={order.domain}
                              onChange={onChange}
                            />
                          </InputGroup>
                        </FormGroup>
                      </div>
                      <div className="col-md-6">
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
                              value={order.name}
                              onChange={onChange}
                            />
                          </InputGroup>
                        </FormGroup>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <FormGroup className="mb-3">
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            Email
                          </label>
                          <InputGroup className="input-group-alternative">
                            <Input
                              placeholder="Email"
                              type="email"
                              name="email"
                              value={order.email}
                              onChange={onChange}
                            />
                          </InputGroup>
                        </FormGroup>
                      </div>
                      <div className="col-md-6">
                        <FormGroup className="mb-3">
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            Phone
                          </label>
                          <InputGroup className="input-group-alternative">
                            <Input
                              placeholder="Phone"
                              type="number"
                              name="phone"
                              value={order.phone}
                              onChange={onChange}
                            />
                          </InputGroup>
                        </FormGroup>
                      </div>
                    </div>
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
                          value={order.description}
                          onChange={onChange}
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-address"
                      >
                        Package
                      </label>
                      <Select
                        options={packagesOptions}
                        defaultValue={order.package}
                        onChange={onPackageChange}
                        closeMenuOnSelect={true}
                      />
                    </FormGroup>
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-address"
                      >
                        Template
                      </label>
                      <Select
                        options={templatesOptions}
                        defaultValue={order.package}
                        onChange={onTemplateChange}
                        closeMenuOnSelect={true}
                      />
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

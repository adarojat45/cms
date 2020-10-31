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
  Row,
  Col,
} from "reactstrap";
import Select from "react-select";
import { getPackages } from "../../../../store/actions/packageAction";
import { getTemplates } from "../../../../store/actions/templateAction";
import { updateOrder } from "../../../../store/actions/orderAction";
import { errorAlert } from "../../../../store/actions/utility";

export default (props) => {
  const { order } = useSelector((state) => state.orderReducer);
  const { packages } = useSelector((state) => state.packageReducer);
  const { templates } = useSelector((state) => state.templateReducer);
  const dispatch = useDispatch();
  const [orderLocal, setOrderLocal] = useState({
    name: "",
    domain: "",
    email: "",
    phone: "",
    description: "",
  });
  const [packagesOptions, setPackagesOptions] = useState([]);
  const [templatesOptions, setTemplatesOPtions] = useState([]);
  const [packageLocal, setPackageLocal] = useState({});
  const [templateLocal, setTemplateLocal] = useState({});

  useEffect(() => {
    dispatch(getPackages());
    dispatch(getTemplates());
  }, [dispatch]);

  useEffect(() => {
    if (order) {
      setOrderLocal({
        name: order.name,
        description: order.description,
        domain: order.domain,
        email: order.email,
        phone: order.phone,
      });
      setPackageLocal({
        id: order.package.id,
        label: order.package.name,
        value: order.package.id,
      });
      setTemplateLocal({
        id: order.template.id,
        label: order.template.name,
        value: order.template.id,
      });
    }
  }, [order]);

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
  }, [packages, templates, converDataForReactSelect]);

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setOrderLocal({ ...order, [name]: value });
  };

  const onPackageChange = (e) => {
    setPackageLocal(e);
  };

  const onTemplateChange = (e) => {
    setTemplateLocal(e);
  };

  const onSubmit = () => {
    if (order.domain === "" || order.name === "" || order.package == null) {
      return errorAlert("Domain, name and package are required");
    }
    const newOrder = {
      ...order,
      name: orderLocal.name,
      description: orderLocal.description,
      domain: orderLocal.domain,
      email: orderLocal.email,
      phone: orderLocal.phone,
      package: packageLocal,
      template: templateLocal,
    };
    dispatch(updateOrder(order.id, newOrder));
  };

  return (
    <>
      <Row>
        <Col md="12">
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
                          value={orderLocal.domain}
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
                          value={orderLocal.name}
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
                          value={orderLocal.email}
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
                          value={orderLocal.phone}
                          onChange={onChange}
                        />
                      </InputGroup>
                    </FormGroup>
                  </div>
                </div>
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
                      value={orderLocal.description}
                      onChange={onChange}
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <label className="form-control-label" htmlFor="input-address">
                    Package
                  </label>
                  <Select
                    options={packagesOptions}
                    defaultValue={packageLocal}
                    value={packageLocal}
                    onChange={onPackageChange}
                    closeMenuOnSelect={true}
                  />
                </FormGroup>
                <FormGroup>
                  <label className="form-control-label" htmlFor="input-address">
                    Template
                  </label>
                  <Select
                    options={templatesOptions}
                    defaultValue={templateLocal}
                    value={templateLocal}
                    onChange={onTemplateChange}
                    closeMenuOnSelect={true}
                  />
                </FormGroup>
              </Form>
              <br />
              <Button
                color="primary"
                type="button"
                onClick={() => onSubmit()}
                className="float-right"
              >
                Save changes
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

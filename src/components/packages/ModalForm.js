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

import { getFeatures } from "../../store/actions/featureAction";

export default ({ packageData, onSubmit, toggle, isOpen }) => {
  const { features } = useSelector((state) => state.featureReducer);
  const dispatch = useDispatch();
  const [options, setOptions] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [packageInput, setPackageInput] = useState({
    name: "",
    description: "",
    price: 0,
    priceDiscount: 0,
  });

  useEffect(() => {
    dispatch(getFeatures());
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
    const newOptions = converDataForReactSelect(features);
    setOptions(newOptions);
  }, [features, converDataForReactSelect]);

  useEffect(() => {
    if (packageData != null) {
      setPackageInput({
        name: packageData.name,
        description: packageData.description,
        price: packageData.price,
        priceDiscount: packageData.priceDiscount,
      });
      const newOptions = converDataForReactSelect(packageData.features);
      setSelectedFeatures(newOptions);
    }
  }, [packageData, converDataForReactSelect]);

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPackageInput({ ...packageInput, [name]: value });
  };

  const onFeaturesChange = (e) => {
    setSelectedFeatures(e);
  };

  const handleSubmit = () => {
    const newPackage = { ...packageInput, features: selectedFeatures };
    onSubmit(newPackage);
    setPackageInput({
      name: "",
      description: "",
      price: 0,
      priceDiscount: 0,
    });
    setSelectedFeatures([]);
  };

  return (
    <>
      <Row>
        <Col md="12">
          <Modal
            className="modal-dialog-centered modal-lg"
            isOpen={isOpen}
            toggle={toggle}
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
                onClick={toggle}
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
                            Price
                          </label>
                          <InputGroup className="input-group-alternative">
                            <Input
                              placeholder="Price"
                              type="number"
                              name="price"
                              value={packageInput.price}
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
                            Price Discount
                          </label>
                          <InputGroup className="input-group-alternative">
                            <Input
                              placeholder="Price discount"
                              type="number"
                              name="priceDiscount"
                              value={packageInput.priceDiscount}
                              onChange={onChange}
                            />
                          </InputGroup>
                        </FormGroup>
                      </div>
                    </div>
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
                          value={packageInput.name}
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
                          value={packageInput.description}
                          onChange={onChange}
                        />
                      </InputGroup>
                    </FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-address"
                    >
                      Feature
                    </label>
                    <Select
                      options={options}
                      defaultValue={selectedFeatures}
                      isMulti
                      onChange={onFeaturesChange}
                      closeMenuOnSelect={false}
                    />
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
                onClick={toggle}
              >
                Close
              </Button>
              <Button
                color="primary"
                type="button"
                onClick={() => handleSubmit()}
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

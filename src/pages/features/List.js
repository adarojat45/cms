import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardHeader,
  CardFooter,
  Container,
  Row,
  Button,
} from "reactstrap";
import { getFeatures, addFeature } from "../../store/actions/featureAction";
import { List, ModalForm } from "../../components/features";

export default () => {
  const dispatch = useDispatch();
  const [isModal, setIsModal] = useState(false);
  const { features } = useSelector((state) => state.featureReducer);
  useEffect(() => {
    dispatch(getFeatures());
  }, [dispatch]);

  const toggleModalForm = () => {
    setIsModal(!isModal);
  };

  const onSubmit = (newFeature) => {
    dispatch(addFeature(newFeature));
    setIsModal();
  };

  return (
    <div>
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <div className="row">
                  <div className="col-6">
                    <h3 className="mb-0">Feature List</h3>
                  </div>
                  <div className="text-right col-6">
                    <Button
                      className="btn-icon btn-2"
                      color="primary"
                      type="button"
                      size="sm"
                      onClick={toggleModalForm}
                    >
                      <span className="btn-inner--icon">
                        <i className="ni ni-fat-add" />
                      </span>
                      New
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <List features={features} />
              <CardFooter className="py-4"></CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
      <ModalForm
        toggle={toggleModalForm}
        isOpen={isModal}
        onSubmit={onSubmit}
      />
    </div>
  );
};

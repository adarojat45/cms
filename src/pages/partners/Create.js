import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addPartner } from "../../store/actions/partnerAction";
import {
  Card,
  CardHeader,
  CardFooter,
  Container,
  Row,
  Button,
  CardBody,
} from "reactstrap";
import { Form } from "../../components/partners";

export default () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = (newPartner) => {
    dispatch(addPartner(newPartner));
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
                    <h3 className="mb-0">Partner Create</h3>
                  </div>
                  <div className="text-right col-6">
                    <Button
                      className="btn-icon btn-2"
                      color="primary"
                      type="button"
                      size="sm"
                      onClick={() => history.goBack()}
                    >
                      <span className="btn-inner--icon">
                        <i className="fas fa-arrow-left" />
                      </span>
                      Back
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <Form onSubmit={onSubmit} />
              </CardBody>
              <CardFooter className="py-4"></CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </div>
  );
};

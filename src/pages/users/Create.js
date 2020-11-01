import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addUser } from "../../store/actions/userAction";
import {
  Card,
  CardHeader,
  CardFooter,
  Container,
  Row,
  Button,
  CardBody,
  Col,
} from "reactstrap";
import Form from "../../components/users/Form";

export default () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = (newUser) => {
    dispatch(addUser(newUser));
  };

  return (
    <div>
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">User Create</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      className="btn-icon btn-2"
                      color="primary"
                      type="button"
                      size="sm"
                      onClick={() => history.goBack()}
                    >
                      <span className="btn-inner--icon">
                        <i className="ni ni-bold-left" />
                      </span>
                      Back
                    </Button>
                  </Col>
                </Row>
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

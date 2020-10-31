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
import { UserForm } from "../../components/users";

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
          <Col>
            <Card className="shadow">
              <CardHeader className="border-0">
                <div className="row">
                  <div className="col-6">
                    <h3 className="mb-0">User Create</h3>
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
                <UserForm onSubmit={onSubmit} />
              </CardBody>
              <CardFooter className="py-4"></CardFooter>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

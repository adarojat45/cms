import React from "react";
import { useHistory } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardFooter,
  Container,
  Row,
  CardBody,
  Button,
  Col,
} from "reactstrap";
import Form from "../../components/posts/Form";
import { addPost } from "../../store/actions/postAction";
import { useDispatch } from "react-redux";

export default () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const onSubmit = (newPost) => {
    dispatch(addPost(newPost));
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
                    <h3 className="mb-0">Post Create</h3>
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
                <Form onSubmit={onSubmit} isClear />
              </CardBody>
              <CardFooter className="py-4"></CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </div>
  );
};
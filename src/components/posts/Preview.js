import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Modal,
  Row,
  Col,
  CardFooter,
} from "reactstrap";
import ReactHtmlParser from "react-html-parser";
import Moment from "react-moment";

export default ({ isOpen, handleToggle, post }) => {
  return (
    <>
      <Modal
        className="modal-dialog-centered modal-lg"
        isOpen={isOpen}
        toggle={handleToggle}
      >
        <Card className=" shadow">
          <CardHeader className=" bg-transparent">
            <Row className="align-items-center">
              <Col xs="8">
                <h3 className="mb-0">Post Preview</h3>
              </Col>
              <Col className="text-right" xs="4">
                <button
                  aria-label="Close"
                  className="close"
                  data-dismiss="modal"
                  type="button"
                  onClick={handleToggle}
                >
                  <span aria-hidden={true}>×</span>
                </button>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <Row className=" icon-examples">
              <Col>
                <div>
                  {post?.categories.map((category, i) => {
                    return (
                      <p
                        style={{ marginRight: "5px", display: "inline" }}
                        key={i}
                        className="font-weight-bold"
                      >
                        {category.name}
                      </p>
                    );
                  })}
                  <p className="text-xs">
                    <Moment format="MMM. DD">{post?.createdAt}</Moment> (
                    <Moment fromNow>{post?.createdAt}</Moment>)
                  </p>
                  <h1>{post?.name}</h1>
                </div>
                <div>{ReactHtmlParser(post?.description)}</div>
                <div>
                  {post?.tags.map((tag, i) => {
                    return (
                      <p
                        style={{ marginRight: "5px", display: "inline" }}
                        key={i}
                      >
                        {`#${tag}`}
                      </p>
                    );
                  })}
                </div>
              </Col>
            </Row>
          </CardBody>
          <CardFooter>
            <div className="text-right">
              <Button
                color="secondary"
                data-dismiss="modal"
                type="button"
                onClick={handleToggle}
              >
                Close
              </Button>
            </div>
          </CardFooter>
        </Card>
      </Modal>
    </>
  );
};

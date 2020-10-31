import React from "react";
import { Col, Row } from "reactstrap";

export default ({ type, isShow, message, onHide }) => {
  if (!isShow) {
    return <></>;
  }

  return (
    <div className={`alert alert-${type || "danger"}`} role="alert">
      <Row className="align-items-center">
        <Col xs="8">{message || "This is a warning alert—check it out!"}</Col>
        <Col className="text-right" xs="4">
          <span className="btn-inner--icon" onClick={onHide}>
            <i className="ni ni-fat-remove" />
          </span>
        </Col>
      </Row>
    </div>
  );
};

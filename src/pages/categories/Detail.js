import React from "react";

import {
  Card,
  CardHeader,
  CardFooter,
  Container,
  Row,
  CardBody,
} from "reactstrap";

export default () => {
  return (
    <div>
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Post Table</h3>
              </CardHeader>
              <CardBody>
                <h1>BOdy</h1>
              </CardBody>
              <CardFooter className="py-4"></CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </div>
  );
};

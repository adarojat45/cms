import React from "react";

import { Card, CardHeader, CardFooter, Container, Row } from "reactstrap";

export default () => {
  return (
    <Container className="mt--7" fluid>
      <Row>
        <div className="col">
          <Card className="shadow">
            <CardHeader className="border-0">
              <h3 className="mb-0">Dashboard</h3>
            </CardHeader>
            <CardFooter className="py-4">Card Footer</CardFooter>
          </Card>
        </div>
      </Row>
    </Container>
  );
};

import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardFooter,
  Container,
  Row,
  CardBody,
  Button,
  Col,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import classnames from "classnames";
import { useDispatch, useSelector } from "react-redux";

import Form from "../../components/categories/Form";
import {
  getCategory,
  updateCategory,
} from "../../store/actions/categoryAction";

export default () => {
  const [tabTitles] = useState(["Edit", "Post"]);
  const [tab, setTab] = useState(1);
  const history = useHistory();
  const dispatch = useDispatch();
  const { categoryId } = useParams();
  const { category } = useSelector((state) => state.categoryReducer);

  useEffect(() => {
    dispatch(getCategory(categoryId));
  }, [dispatch, categoryId]);

  const renderTab = () => {
    return tabTitles.map((tabTitle, i) => {
      return (
        <NavItem key={i}>
          <NavLink
            className={classnames({ active: tab === i + 1 })}
            onClick={() => setTab(i + 1)}
          >
            <div style={{ padding: 5 }}>
              <b>{tabTitle}</b>
            </div>
          </NavLink>
        </NavItem>
      );
    });
  };

  const handleSubmit = (newCategory) => {
    dispatch(updateCategory(categoryId, newCategory));
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
                    <h3 className="mb-0">Category Detail</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      className="btn-icon btn-2"
                      color="primary"
                      type="button"
                      size="sm"
                      onClick={() => history.push("/admin/category")}
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
                <Nav tabs>{renderTab()}</Nav>
                <br />
                <TabContent activeTab={tab}>
                  <TabPane tabId={1}>
                    <Form
                      category={category}
                      onSubmit={handleSubmit}
                      isClear={false}
                    />
                  </TabPane>
                </TabContent>
              </CardBody>
              <CardFooter className="py-4"></CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </div>
  );
};

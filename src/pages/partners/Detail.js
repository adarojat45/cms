import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardHeader,
  CardFooter,
  Container,
  Row,
  CardBody,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Button,
} from "reactstrap";
import classnames from "classnames";
import { getPartner, updatePartner } from "../../store/actions/partnerAction";
import { Form } from "../../components/partners";

const tabTitles = ["Edit"];

export default () => {
  const { partnerId } = useParams();
  const { partner } = useSelector((state) => state.partnerReducer);
  const history = useHistory();
  const dispatch = useDispatch();
  const [tab, setTab] = useState(1);

  useEffect(() => {
    dispatch(getPartner(partnerId));
  }, [dispatch, partnerId]);

  const changeTab = (tab) => {
    setTab(tab);
  };

  const renderTab = () => {
    const tabs = [];
    for (let i = 0; i < tabTitles.length; i++) {
      const tabTitle = (
        <NavItem key={i}>
          <NavLink
            className={classnames({ active: tab === i + 1 })}
            onClick={() => changeTab(i + 1)}
          >
            <div style={{ padding: 5 }}>
              <b>{tabTitles[i]}</b>
            </div>
          </NavLink>
        </NavItem>
      );
      tabs.push(tabTitle);
    }
    return tabs;
  };

  const onSubmit = (newPartner) => {
    dispatch(updatePartner(partner.id, newPartner));
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
                    <h3 className="mb-0">Partner Detail</h3>
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
                <Nav tabs>{renderTab()}</Nav>
                <TabContent activeTab={tab}>
                  <TabPane tabId={1}>
                    <br />
                    <Form partner={partner} onSubmit={onSubmit} />
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

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
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
} from "reactstrap";
import classnames from "classnames";

import { getOrder } from "../../store/actions/orderAction";
import {
  EditForm,
  CoupleList,
  StoryList,
  QuoteList,
  ImageList,
  SongList,
  VideoList,
  PaymentList,
  InvitationList,
  EventList,
} from "../../components/orders/";

const tabTitles = [
  "Edit",
  "Couple",
  "Event",
  "Story",
  "Quote",
  "Image",
  "Video",
  "Song",
  "Payment",
  "Invitation",
];

export default () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const [tab, setTab] = useState(1);

  useEffect(() => {
    dispatch(getOrder(orderId));
  });
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
  return (
    <div>
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Nav tabs>{renderTab()}</Nav>
              </CardHeader>
              <CardBody>
                <TabContent activeTab={tab}>
                  <TabPane tabId={1}>
                    <EditForm />
                  </TabPane>
                  <TabPane tabId={2}>
                    <CoupleList />
                  </TabPane>
                  <TabPane tabId={3}>
                    <EventList />
                  </TabPane>
                  <TabPane tabId={4}>
                    <StoryList />
                  </TabPane>
                  <TabPane tabId={5}>
                    <QuoteList />
                  </TabPane>
                  <TabPane tabId={6}>
                    <ImageList />
                  </TabPane>
                  <TabPane tabId={7}>
                    <VideoList />
                  </TabPane>
                  <TabPane tabId={8}>
                    <SongList />
                  </TabPane>
                  <TabPane tabId={9}>
                    <PaymentList />
                  </TabPane>
                  <TabPane tabId={10}>
                    <InvitationList />
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

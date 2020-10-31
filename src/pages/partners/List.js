import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardFooter,
  Container,
  Row,
  Button,
} from "reactstrap";
import { getPartners } from "../../store/actions/partnerAction";
import { List } from "../../components/partners";

export default () => {
  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  const history = useHistory();
  const { partners } = useSelector((state) => state.partnerReducer);
  useEffect(() => {
    dispatch(getPartners());
  }, [dispatch]);

  const toggleModalForm = () => {
    history.push(`${path}/create`);
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
                    <h3 className="mb-0">Partner List</h3>
                  </div>
                  <div className="text-right col-6">
                    <Button
                      className="btn-icon btn-2"
                      color="primary"
                      type="button"
                      size="sm"
                      onClick={toggleModalForm}
                    >
                      <span className="btn-inner--icon">
                        <i className="ni ni-fat-add" />
                      </span>
                      New
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <List partners={partners} />
              <CardFooter className="py-4"></CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </div>
  );
};

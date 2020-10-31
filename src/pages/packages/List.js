import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardHeader,
  CardFooter,
  Container,
  Row,
  Button,
} from "reactstrap";
import { getPackages, addPackage } from "../../store/actions/packageAction";
import { List, ModalForm } from "../../components/packages";

export default () => {
  const dispatch = useDispatch();
  const [isModal, setIsModal] = useState(false);
  const { packages } = useSelector((state) => state.packageReducer);
  useEffect(() => {
    dispatch(getPackages());
  }, [dispatch]);

  const toggleModalForm = () => {
    setIsModal(!isModal);
  };

  const onSubmit = (newPackage) => {
    dispatch(addPackage(newPackage));
    setIsModal(!isModal);
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
                    <h3 className="mb-0">Package List</h3>
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
              <List packages={packages} />
              <CardFooter className="py-4"></CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
      <ModalForm
        toggle={toggleModalForm}
        isOpen={isModal}
        onSubmit={onSubmit}
      />
    </div>
  );
};

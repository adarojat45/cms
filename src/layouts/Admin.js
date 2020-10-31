import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Container } from "reactstrap";
import { connect } from "react-redux";

import AdminNavbar from "../components/base/Navbars/AdminNavbar.js";
import AdminFooter from "../components/base/Footers/AdminFooter.js";
import Sidebar from "../components/base/Sidebar/Sidebar.js";
import Header from "../components/base/Headers/Header";

import {
  Dashboard,
  PostList,
  CategoryList,
  CategoryCreate,
  CategoryDetail,
} from "../pages";
import routes from "../pages/routes";
import { getProfile } from "../store/actions/userAction.js";

const routers = [
  {
    component: Dashboard,
    exact: true,
    path: "/admin/dashboard",
  },
  {
    component: CategoryList,
    exact: true,
    path: "/admin/category",
  },
  {
    component: CategoryCreate,
    exact: true,
    path: "/admin/category/create",
  },
  {
    component: CategoryDetail,
    exact: true,
    path: "/admin/category/detail/:categoryId",
  },
  {
    component: PostList,
    exact: true,
    path: "/admin/post",
  },
];

class Admin extends React.Component {
  componentDidUpdate(e) {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.mainContent.scrollTop = 0;
  }

  getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };
  render() {
    return (
      <div>
        <Sidebar
          {...this.props}
          routes={routes}
          logo={{
            innerLink: "/admin/dashboard",
            imgSrc: require("../assets/img/brand/argon-react.png"),
            imgAlt: "...",
          }}
        />
        <div className="main-content" ref="mainContent">
          <AdminNavbar
            {...this.props}
            // brandText={this.getBrandText(this.props.location.pathname)}
          />
          <Header />
          <Switch>
            {routers.map((router, i) => {
              return <Route key={i} {...router} />;
            })}
            <Redirect from="*" to="/admin/dashboard" />
          </Switch>
          <Container fluid>
            <AdminFooter />
          </Container>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return {
    getProfile: dispatch(getProfile()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);

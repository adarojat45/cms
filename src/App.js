import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";

import "./assets/css/argon-dashboard-react.min.css";
import "./assets/plugins/nucleo/css/nucleo.css";
import "./assets/css/style.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "toastr/build/toastr.min.css";
import "toastr/build/toastr.min.js";

import AdminLayout from "./layouts/Admin";
import AuthLayout from "./layouts/Auth";

import store from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/admin" component={AdminLayout} />
          <Route path="/" component={AuthLayout} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;

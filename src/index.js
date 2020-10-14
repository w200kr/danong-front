import React from "react";
import ReactDOM from "react-dom";
// import { createBrowserHistory } from "history";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import CssBaseline from '@material-ui/core/CssBaseline';

// pages for this product
import AuthRoute from "contexts/Auth/AuthRoute.js";
import AuthProvider from "contexts/Auth/AuthProvider.js"

import PageIndex from "containers/PageIndex/PageIndex.js"
import PageLogin from 'domains/account/Login'
import PageSignUp from 'domains/account/SignUp'

import "utils/date.js";

// import "./index.css";


// import "./assets/scss/material-kit-react.scss";

// var hist = createBrowserHistory();

ReactDOM.render(
  <React.Fragment>
    <CssBaseline />
    <Router>
      <AuthProvider>
        <Switch>
          <Route exact path="/" component={PageIndex} />
          <Route path="/login" component={PageLogin} />
          <Route path="/signup" component={PageSignUp} />
        </Switch>
      </AuthProvider>
    </Router>
  </React.Fragment>,
  document.getElementById("root")
);
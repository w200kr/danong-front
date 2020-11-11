import React from "react";
import ReactDOM from "react-dom";
// import { createBrowserHistory } from "history";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import CssBaseline from '@material-ui/core/CssBaseline';

// pages for this product
// import AuthRoute from "contexts/Auth/AuthRoute.js";
import AuthProvider from "contexts/Auth/AuthProvider.js"

// import PageIndex from "containers/PageIndex/PageIndex.js"
import PageAdd from "domains/product/Add"
import PageSearch from "domains/product/Search"
import PageWishList from "domains/product/WishList"
import PageDetail from "domains/product/Detail"
import PageLogin from 'domains/account/Login'
import PageSignUp from 'domains/account/SignUp'
import "utils/date.js";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

ReactDOM.render(
  <React.Fragment>
    <CssBaseline />
    <Router>
      <AuthProvider>
        <Switch>
          <Route exact path="/" component={PageSearch} />
          <Route path="/login" component={PageLogin} />
          <Route path="/signup" component={PageSignUp} />

          <Route path="/wishlist" component={PageWishList} />
          <Route path="/add" component={PageAdd} />
          <Route path="/:productId" component={PageDetail} />
        </Switch>
      </AuthProvider>
    </Router>
  </React.Fragment>,
  document.getElementById("root")
);
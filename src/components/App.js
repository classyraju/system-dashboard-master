import React from "react";
import {   BrowserRouter as Router,useHistory , Route, Switch, Redirect, useLocation } from "react-router-dom";

// components
import Layout from "./Layout";

// pages
import Error from "../pages/error";
import Login from "../pages/login";
import SignUp from "../pages/login/signUp";


// context
import { useUserState } from "../context/UserContext";

export default function App() {
  // global
  var { isAuthenticated,userData } = useUserState();

  return (
    <Router history={useHistory}>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
        <PublicRoute path="/login" component={Login} />
        <PublicRoute path="/signUp" component={SignUp} />
        <PrivateRoute path="/"  component={Layout} />
       

        <Route component={Error} />
      </Switch>
    </Router>
  );

  // #######################################################################

  function PrivateRoute({ component, ...rest }) {
    var currentLocation = useLocation().pathname.replace(/^\/|\/$/g, ''); //replace first and last slashes as its not needed
       return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            React.createElement(component, props)
          ) : (
            <Redirect
              to={{
                pathname: "/login", //?notAuth=true

              }}

            />
          )
        }
      />
    );
  }

  function PublicRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          ) : (
            React.createElement(component, props)
          )
        }
      />
    );
  }
}

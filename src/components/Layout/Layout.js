import React from "react";
import {
  Route,
  Switch,
  withRouter,
  Redirect,
  useLocation
} from "react-router-dom";
import classnames from "classnames";
import useStyles from "./styles";
import Header from "../Header/Header";
import Sidebar from "../Sidebar";
import { useLayoutState } from "../../context/LayoutContext";

import Error from "../../pages/error/Error";
import { Dashboard } from "../../pages/dashboard";
import { EmailVerification } from "../../pages/emailVerification"
import { UserProvider } from "../../context/UserContext";
import { Users } from "../../pages/Users";
function Layout(props) {
  var classes = useStyles();
  // global
  var layoutState = useLayoutState();
  const { pathname } = useLocation();

  return (
    <div className={ classes.root }>
        <>
          <Header />
          <Sidebar />
          <div
            className={classnames(classes.content, {
              [classes.contentShift]: layoutState.isSidebarOpened,
            })}
          >
            {/* <div className={classes.fakeToolbar} /> */}
            <Switch>
            <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
            

            <Route path="/dashboard" component={Dashboard} />
            <Route path="/email-verfication" component={EmailVerification} />
            <Route path="/tenants" component={Users} />
               <Route exact path="/404"  component={Error}  />
                <Redirect from='*' to="/404" />
            </Switch>
          </div>
        </>
    </div>
  );
}
export default withRouter(Layout);
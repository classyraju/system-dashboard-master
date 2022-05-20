import React, { useState, useEffect } from "react";
import { Drawer, IconButton } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import classNames from "classnames";
import useStyles from "./styles";
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";

import SidebarMenu from "./SidebarMenu";
import SidebarMenuLeft from "./sidebar-left";
import HoursheetsLogo from "../../images/hoursheets-logo-white.png";
import MenuOpenIcon from '@material-ui/icons/MenuOpen';


function Sidebar(props) {
 var classes = useStyles();
  var theme = useTheme();

  // global
  var { isSidebarOpened } = useLayoutState();
  var layoutDispatch = useLayoutDispatch();

  // local
  var [isPermanent, setPermanent] = useState(true);
  useEffect(() => {
   var sideBarOpen = localStorage.getItem('isSidebarOpened');
   if(!JSON.parse(sideBarOpen)){
    toggleSidebar(layoutDispatch)
   }
  }, []);
  useEffect(function() {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });
  return (
<Drawer
      variant={isPermanent ? "permanent" : "temporary"}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >
<div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton className="menu-btn" onClick={() => toggleSidebar(layoutDispatch)}>
          <MenuOpenIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse),
            }}
          />
        </IconButton>
      </div>
       <div className="flex-blk h-100">
     
       <div className="left">
       <SidebarMenuLeft history={props.history} />
       </div>
       <div className="right">
       <div className="logo-sec">
         <img src={HoursheetsLogo} alt="hoursheets" title="Hoursheets" />
       </div>
       <SidebarMenu  />    
       </div>
      
     </div>
   
      
    </Drawer>
  );
  // ##################################################################
  function handleWindowWidthChange() {
    var windowWidth = window.innerWidth;
    var breakpointWidth = theme.breakpoints.values.md;
    var isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }
}

export default withRouter(Sidebar);

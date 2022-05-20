import React from "react";
import {Toolbar,IconButton} from "@material-ui/core";
import classNames from "classnames";
import useStyles from "./styles";
import {useLayoutState,useLayoutDispatch,toggleSidebar,} from "../../context/LayoutContext";
import "./header.css";
import MenuOpenIcon from '@material-ui/icons/MenuOpen';



export default function Header(props) {
  var classes = useStyles();
  // global
  var layoutState = useLayoutState();
  var layoutDispatch = useLayoutDispatch();

  // local

  return (
    
      <Toolbar className="toolbar" variant="dense" style={{ height: '0px'}}>
        <IconButton
          color="inherit"
          onClick={() => toggleSidebar(layoutDispatch)}
          className={classNames(
            classes.headerMenuButton,
            classes.headerMenuButtonCollapse,
          )}
        >
          
          {layoutState.isSidebarOpened ? (
            <MenuOpenIcon
              classes={{
                root: classNames(
                  classes.headerIcon,
                  classes.headerIconCollapse,
                ),
              }}
            />
          ) : (
            <MenuOpenIcon
              classes={{
                root: classNames(
                  classes.headerIcon,
                  classes.headerIconCollapse,                  
                ),
              }}
            />
          )}
        </IconButton>

       

        {/* <HeaderMenu /> */}
      </Toolbar>
  
  );
}

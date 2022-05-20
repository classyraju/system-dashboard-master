import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link, useLocation } from "react-router-dom";
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import { DarkTooltip } from '../../config/helpers/tooltip.helper';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import PersonIcon from '@material-ui/icons/Person';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 330,
    backgroundColor: theme.palette.background.paper,
  },
  dropdown: {
    transition: theme.transitions.create(["transform"], {
      duration: theme.transitions.duration.short
    })
  },

  nested: {
    paddingLeft: theme.spacing(3),
  },
  dropdownOpen: {
    transform: "rotate(-180deg)"
  },
  dropdownClosed: {
    transform: "rotate(0)"
  },
  expand: {
    cursor: 'pointer'
  },
  people_expanded: {
    cursor: 'pointer'
  }
}));

export default function SidebarMenu() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [allowedTabs, setAllowedTabs] = React.useState('');
  const [expanded, setExpanded] = React.useState(false);
  const [people_expanded, setPeople_expanded] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  const location = useLocation()
  const isLinkActive = (link) => {
    return (location.pathname === link || location.pathname.indexOf(link) !== -1);
  }






  return (
    <div className="sidebar-menu-list">

      <List component="nav" aria-labelledby="Main-menu" className={classes.root} >

        <ListItem className={isLinkActive('dashboard') ? 'link-active' : ''} component={Link} to="/dashboard">
          <ListItemIcon>
            <DarkTooltip title={"Dashboard"} aria-label="Dashboard">
              <DashboardOutlinedIcon />
            </DarkTooltip>
          </ListItemIcon>
          <ListItemText primary={"Dashboard"} />
        </ListItem>

      <ListItem className={isLinkActive('email-verfication') ? 'link-active' : ''} component={Link} to="/email-verfication">
          <ListItemIcon>
            <DarkTooltip title={"Email"} aria-label="EmailVerfication">
              <EmailOutlinedIcon />
            </DarkTooltip>
          </ListItemIcon>
          <ListItemText primary={"Email"} />
        </ListItem>

 <ListItem className={isLinkActive('tenants') ? 'link-active' : ''} component={Link} to="/tenants">
          <ListItemIcon>
            <DarkTooltip title={"tenants"} aria-label="Tenants">
              <PersonIcon />
            </DarkTooltip>
          </ListItemIcon>
          <ListItemText primary={"Tenants"} />
        </ListItem>

      </List>
    </div>


  );
}

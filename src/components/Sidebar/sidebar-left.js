import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, Link, IconButton, Tooltip} from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import HeaderMenu from "../Header/HeaderMenu";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 50,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function SidebarMenuLeft(props) {
  const classes = useStyles();
  return (
    <List component="nav" aria-labelledby="Main-menu" className={classes.root} >

     <ListItem button component={Link} to="/dashboard">
        <ListItemIcon className='color-white'>
        <Tooltip title="Home" aria-label="Home">
          <HomeOutlinedIcon />
          </Tooltip>
        </ListItemIcon>       
      </ListItem>

      <div className="Logout">         
        <HeaderMenu />
      </div>
    </List>
  );
}

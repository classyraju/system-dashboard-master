import React, {useEffect} from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import { Link } from "react-router-dom";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Avatar from '@material-ui/core/Avatar';
import { useUserDispatch, signOut  } from "../../context/UserContext";
import useStyles from "./styles";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { configData } from '../../config/config.helper';
import { authHeader } from '../../context/helpers/auth-header';
import axios from 'axios';
import { UserContext } from "../../context/UserContext";
import { decryptLocalStorage } from '../../config/secure';
// import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

export default function HeaderMenu(props) {
    var classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [userEmail, setuserEmail] = React.useState(null);
  const open = Boolean(anchorEl);
  var userDispatch = useUserDispatch();
  useEffect(() => {
    if(localStorage.getItem("currentUserData")){
      var  userData= decryptLocalStorage(JSON.parse(localStorage.getItem("currentUserData")))
        console.log("userData",userData)
      setuserEmail(userData.email)
      }
}, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="avatar-blk">   
         <div className="user-avatar left">  

      <Avatar alt="User" className='bg-white' src={'https://hoursheets.com/wp-content/uploads/2020/11/hoursheets-logo-1-300x104.png'} aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick}/>
      {/* <Avatar alt="User" className='bg-white' src={'https://hoursheets.com/wp-content/uploads/2020/11/hoursheets-logo-1-300x104.png'} aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick}/> */}
      </div>
     
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        className="header-menu"
      >

        <MenuItem> {userEmail} </MenuItem>
        <MenuItem onClick={() => signOut(userDispatch)}><ExitToAppIcon className={classes.profileMenuIcon} /> Logout</MenuItem>
      </Menu>
    </div>
  );
}

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Tooltip from "@material-ui/core/Tooltip";
const useStyles = makeStyles((theme) => ({
    
  searchIcon: {        
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',  
    padding: '0px 8px',
    position: 'absolute' ,
    top: '12px',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),   
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',   
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
}
  
}));


export default function SearchBar(props) {
  const classes = useStyles();

  return (  
    // <Tooltip title="Search Projects " aria-label="add">
  //  <div className="searchblock"> 
  <div>
                    <div className={classes.searchIcon}>
                    <SearchIcon className="search-icon"/>
                    </div>
                <InputBase
                onChange={props.handleInputChange} value={props.query} placeholder="Search" classes={{root: classes.inputRoot,input: classes.inputInput,  }}
                inputProps={{ 'aria-label': 'search' }}
                />
          </div>   

    // </Tooltip>
            
    
  );
}

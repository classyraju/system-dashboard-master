import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Tooltip } from '@material-ui/core';
import { ArrowBackIos } from '@material-ui/icons';
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function Backbtn(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
    <IconButton aria-label="delete" className={classes.iconbtn} size="small" onClick={()=>props.back()}>
                    <Tooltip title="Back">
                        <ArrowBackIos color="btn-icon-color" /> 
                    </Tooltip>
                </IconButton>    </div>
  );
}

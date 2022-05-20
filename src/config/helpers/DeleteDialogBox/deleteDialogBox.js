import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import "./delete.css";
import {TextField } from '@material-ui/core';
import { DarkTooltip } from '../tooltip.helper';
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function DeleteDialogBox(props) {
  return (
    <div>
      <Dialog  fullWidth maxWidth="xs" onClose={props.handleDeleteClose} aria-labelledby="customized-dialog-title" open={props.openDeleteDialogBox}>
        <DialogTitle id="customized-dialog-title" className="customized-dialog-title-deleteProject" onClose={props.handleDeleteClose}>
          {props.DeleteTitle}
        </DialogTitle>
        <div className="button-and-content-height">
            {/* {!props.isTimeLogReport && */}
                <DialogContent className="dialogContent-project-delete">
            <div className="crossicon-and-content-display-flex">
            <div className="crossicon-padding">
                <DeleteOutlinedIcon/>
            </div>
          <Typography gutterBottom>
             {"Are you sure to do this action "} <span className="delete-content-projectname-bold">{props.name} ?</span>  <br />
          </Typography>
          </div>

          {props.isDeletedReason && 
          <div className="deleted-reason-text">
            <DarkTooltip  placement="bottom-start" title={(props.ErrordeletedReason)}>
             <TextField
                id="DeletedReason"
                label={"Reason"}
                name="deletedReason"
                multiline
                rows={4}
                variant="outlined"
                className="formfield"
                InputLabelProps={{ shrink: true }}
                onChange={props.handleDeletedReasonChange}
                value={props.deletedReason}
                error={props.ErrordeletedReason}               
              />
              </DarkTooltip>
          </div>
          
          }
        </DialogContent>
            {/* } */}
            {/* {props.isTimeLogReport &&
                  <DialogContent className="dialogContent-project-delete">
                  <div className="crossicon-and-content-display-flex">
                  <div className="crossicon-padding">
                      <DeleteOutlinedIcon/>
                  </div>
                <Typography gutterBottom>
                   {t("Are you sure you want to delete")} <span className="delete-content-projectname-bold">{props.reportsName} ?</span>  <br />
                   <span className="delete-content-projectname-bold">{props.totalHours} </span>{t("of logged time will be deleted.")} <br />
                   {t("This action is irreversible.")}
                </Typography>
                </div>
              </DialogContent>
            } */}
        
        <DialogActions>
          <Button autoFocus onClick={props.handleSuccess} color="primary">
            {"Yes"}
          </Button>
          <Button autoFocus onClick={props.handleDeleteClose} color="primary">
            {"No"}
          </Button>
        </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}

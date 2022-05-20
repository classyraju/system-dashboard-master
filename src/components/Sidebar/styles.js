import { makeStyles } from "@material-ui/styles";

const drawerWidth = 250;

export default makeStyles(theme => ({
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    // width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  pl5:{
    paddingLeft:'5px',
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(12) + 4,
    [theme.breakpoints.down("sm")]: {
      width: drawerWidth,
    },
    // width:'110px',
  },
  toolbar: {
    ...theme.mixins.toolbar,
    minHeight:'0px !important',
    // [theme.breakpoints.down("sm")]: {
    //   display: "none",
    // },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  /* sidebarList: {
    marginTop: theme.spacing(6),
  }, */
  mobileBackButton: {
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(0),
    minHeight:'0px !important' ,
    display:'block',
    textAlign:'right',
    position:'absolute !important',
    right:'0px',
    width: '42px',
    zIndex : '1',
    // backgroundColor:'#0a2540',
    backgroundColor:'#151719',
    marginLeft:'auto',
  },
}));

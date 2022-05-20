import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  root: {
    display: "flex",
    maxWidth: "100vw",
    overflowX: "hidden",
  },
  content: {
    flexGrow: 1,
    // padding: theme.spacing(3),
    padding:'12px',
    width: `calc(100vw - 250px)`,
    minHeight: "100vh",
  },
  contentShift: {
    // width: `calc(100vw - ${250 + theme.spacing(6)}px)`,
    width: `calc(100vw - 250px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  fakeToolbar: {
    ...theme.mixins.toolbar,
       display:'none',
  },
}));

import defaultTheme from "./default";
import { createMuiTheme } from "@material-ui/core";
import "./index.css";
import './summary.css'
const overrides = {
 
  typography: {
    fontSize: 12,
   
    p:{
      fontSize:"0.875rem",
    },
    h1: {
      fontSize: "3rem",
    },
    h2: {
      fontSize: "2rem",
    },
    h3: {
      fontSize: "1.64rem",
    },
    h4: {
      fontSize: "1.5rem",
    },
    h5: {
      fontSize: "1.285rem",
    },
    h6: {
      fontSize: "1.142rem",
    },
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',      
      '"Helvetica Neue"',
      '"Ubuntu"',
      'Arial',
      'sans-serif',
    
    ].join(','),
  },
};

export default {
  default: createMuiTheme({ ...defaultTheme, ...overrides }),
};

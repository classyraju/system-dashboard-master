import { Tooltip } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
export const DarkTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.87)',
      color: theme.palette.common.white,
      boxShadow: theme.shadows[1],
      fontSize: 11,
      // marginRight: "300px",
      // marginTop:"10px"
    },
  }))(Tooltip);
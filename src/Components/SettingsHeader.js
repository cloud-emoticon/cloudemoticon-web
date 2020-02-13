import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";

const useStyles = makeStyles(theme => ({
  dividerFullWidth: {
    margin: `5px 0 0 ${theme.spacing(2)}px`,
  },
}));

const SettingsHeader = props => {
  const classes = useStyles();

  return (
    <li>
      <Typography
        className={classes.dividerFullWidth}
        color="textSecondary"
        display="block"
        variant="caption"
      >
        {props.title}
      </Typography>
    </li>
  )
};

export default SettingsHeader;

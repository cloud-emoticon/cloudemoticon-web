import React from "react"
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const EmptyViewText = props => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Typography variant='h4'>
        {props.firstLine}
      </Typography>
      <Typography variant='h6'>
        {props.secondLine}
      </Typography>
    </Box>
  )
};

export default EmptyViewText;

import React from "react"
import Box from "@material-ui/core/Box";

const EmptyView = props => {
  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      {props.children}
    </Box>
  )
};

export default EmptyView

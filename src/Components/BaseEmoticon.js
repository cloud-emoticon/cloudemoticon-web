import copy from "copy-to-clipboard";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import React from "react";

const BaseEmoticon = props => {
  const { data: { emoticon, description } } = props;

  return (
    <ListItem button onClick={e => {
      e.preventDefault();
      copy(emoticon);
      props.addHistory(emoticon);
      props.openSnackbar(`Copied ${emoticon}`)
    }}>
      {props.icon}
      <ListItemText
        primary={emoticon}
        secondary={description}
      />
      {props.secondaryAction}
    </ListItem>
  )
};

export default BaseEmoticon

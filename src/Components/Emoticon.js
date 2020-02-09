import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import FavoriteIcon from '@material-ui/icons/Favorite'
import NoFavoriteIcon from '@material-ui/icons/FavoriteBorder';
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import copy from 'copy-to-clipboard'

const Emoticon = (props) => {
  const data = props.data;
  const emoticon = data['emoticon'];
  const description = data['description'];
  const isInFavorite = props.isInFavorite(emoticon, description);
  return (
    <ListItem button onClick={e => {
      e.preventDefault();
      copy(emoticon);
      props.snackbarOpen(`Copied ${emoticon}`)
    }}>
      <ListItemText
        primary={emoticon}
        secondary={description}
      />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete">
          {isInFavorite ?
            <FavoriteIcon
              onClick={e => {
                e.stopPropagation();
                props.removeFavorite(emoticon, description);
                props.snackbarOpen(`Removed ${emoticon} from favorites`)
              }}
            /> :
            <NoFavoriteIcon
              onClick={e => {
                e.stopPropagation();
                props.addFavorite(emoticon, description);
                props.snackbarOpen(`Added ${emoticon} to favorites`)
              }}
            />
          }
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
};

export default Emoticon

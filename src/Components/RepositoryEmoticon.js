import React from 'react'
import FavoriteIcon from '@material-ui/icons/Favorite'
import NoFavoriteIcon from '@material-ui/icons/FavoriteBorder';
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import BaseEmoticon from "./BaseEmoticon";

const RepositoryEmoticon = (props) => {
  const { snackbarOpen, addHistory, data } = props;
  const { emoticon, description } = data;
  const isInFavorite = props.isInFavorite(emoticon);

  return (
    <BaseEmoticon
      addHistory={addHistory}
      snackbarOpen={snackbarOpen}
      data={data}
    >
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete" onClick={e => {
          e.preventDefault();
          if (isInFavorite) {
            props.removeFavorite(emoticon);
            props.snackbarOpen(`Removed ${emoticon} from favorites`)
          } else {
            props.addFavorite(emoticon, description);
            props.snackbarOpen(`Added ${emoticon} to favorites`)
          }
        }}>
          {isInFavorite ? <FavoriteIcon /> : <NoFavoriteIcon />}
        </IconButton>
      </ListItemSecondaryAction>
    </BaseEmoticon>
  );
};

export default RepositoryEmoticon

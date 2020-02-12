import React from 'react'
import FavoriteIcon from '@material-ui/icons/Favorite'
import NoFavoriteIcon from '@material-ui/icons/FavoriteBorder';
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import BaseEmoticon from "./BaseEmoticon";

const RepositoryEmoticon = (props) => {
  const { snackbarOpen, data } = props;
  const { emoticon, description } = data;
  const isInFavorite = props.isInFavorite(emoticon, description);

  return (
    <BaseEmoticon
      snackbarOpen={snackbarOpen}
      data={data}
    >
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
    </BaseEmoticon>
  );
};

export default RepositoryEmoticon

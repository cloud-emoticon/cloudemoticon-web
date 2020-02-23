import React from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import NoFavoriteIcon from "@material-ui/icons/FavoriteBorder";
import IconButton from "@material-ui/core/IconButton";

const FavoriteIconButton = props => {
  const { isInFavorite, emoticon, description, removeFavorite, addFavorite, openSnackbar } = props;

  return (
    <IconButton edge="end" aria-label="delete" onClick={e => {
      e.preventDefault();
      if (isInFavorite) {
        removeFavorite(emoticon);
        openSnackbar(`Removed ${emoticon} from favorites`)
      } else {
        addFavorite(emoticon, description);
        openSnackbar(`Added ${emoticon} to favorites`)
      }
    }}>
      {isInFavorite ? <FavoriteIcon /> : <NoFavoriteIcon />}
    </IconButton>
  )
};

export default FavoriteIconButton;

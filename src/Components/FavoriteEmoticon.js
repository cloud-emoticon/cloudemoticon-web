import React from 'react'
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import BaseEmoticon from "./BaseEmoticon";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import FavoriteIconButton from "./FavoriteIconButton";

const FavoriteEmoticon = props => {
  const { addHistory, data, removeFavorite, addFavorite, openSnackbar } = props;
  const { emoticon, description } = data;
  const isInFavorite = props.isInFavorite(emoticon);

  return (
    <BaseEmoticon
      addHistory={addHistory}
      openSnackbar={openSnackbar}
      data={data}
      icon={
        <ListItemIcon>
          <DragIndicatorIcon />
        </ListItemIcon>
      }
      secondaryAction={
        <ListItemSecondaryAction>
          <FavoriteIconButton
            isInFavorite={isInFavorite}
            emoticon={emoticon}
            description={description}
            removeFavorite={removeFavorite}
            addFavorite={addFavorite}
            openSnackbar={openSnackbar}
          />
        </ListItemSecondaryAction>
      }
    />
  );
};

export default FavoriteEmoticon

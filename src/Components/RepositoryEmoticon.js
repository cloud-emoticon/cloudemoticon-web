import React from 'react'
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import BaseEmoticon from "./BaseEmoticon";
import FavoriteIconButton from "./FavoriteIconButton";

const RepositoryEmoticon = props => {
  const { addHistory, data, removeFavorite, addFavorite, openSnackbar } = props;
  const { emoticon, description } = data;
  const isInFavorite = props.isInFavorite(emoticon);

  return (
    <BaseEmoticon
      addHistory={addHistory}
      openSnackbar={openSnackbar}
      data={data}
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

export default RepositoryEmoticon

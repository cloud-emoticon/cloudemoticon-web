import React from 'react'
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import BaseEmoticon from "./BaseEmoticon";
import FavoriteIconButton from "./FavoriteIconButton";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit"
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';


const FavoriteEmoticon = props => {
  const {
    data,
    addHistory,
    removeFavorite,
    addFavorite,
    openSnackbar,
    isEditing,
    showMoveUp,
    showMoveDown,
    onMoveUp,
    onMoveDown
  } = props;
  const { emoticon, description } = data;
  const isInFavorite = props.isInFavorite(emoticon);

  return (
    <BaseEmoticon
      addHistory={addHistory}
      openSnackbar={openSnackbar}
      data={data}
      secondaryAction={
        <ListItemSecondaryAction>
          {
            isEditing ?
              <IconButton disabled={!showMoveUp} onClick={e => {
                e.preventDefault();
                onMoveUp();
              }}>
                <ArrowUpwardIcon />
              </IconButton> :
              null
          }
          {
            isEditing ?
              <IconButton disabled={!showMoveDown} onClick={e => {
                e.preventDefault();
                onMoveDown();
              }}>
                <ArrowDownwardIcon />
              </IconButton> :
              null
          }
          {
            isEditing ?
              <IconButton>
                <EditIcon />
              </IconButton> :
              null
          }
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

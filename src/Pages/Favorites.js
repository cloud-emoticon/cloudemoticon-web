import React from 'react'
import List from '@material-ui/core/List';
import EmptyView from "../Components/EmptyView";
import EmptyViewText from "../Components/EmptyViewText";
import FavoriteEmoticon from "../Components/FavoriteEmoticon";

const Favorites = (props) => {
  const favorites = props.favorites;
  if (!favorites || favorites.length === 0) {
    return (
      <EmptyView>
        <EmptyViewText
          firstLine="(〜￣△￣)〜"
          secondLine="You don't have any bookmarks"
        />
      </EmptyView>
    )
  }
  const items = favorites.map((item, i) => {
    return (
      <FavoriteEmoticon
        key={i}
        data={item}
        addHistory={props.addHistory}
        openSnackbar={props.openSnackbar}
        addFavorite={props.addFavorite}
        removeFavorite={props.removeFavorite}
        isInFavorite={props.isInFavorite}
        isEditing={props.isEditing}
      />
    )
  });
  return <List>{items}</List>
};

export default Favorites

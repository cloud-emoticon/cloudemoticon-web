import React from 'react'
import List from '@material-ui/core/List';
import EmptyView from "../Components/EmptyView";
import EmptyViewText from "../Components/EmptyViewText";
import FavoriteEmoticon from "../Components/FavoriteEmoticon";

const Favorites = (props) => {
  const { favorites, reorderFavorite } = props;
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
        showMoveUp={i !== 0}
        showMoveDown={i !== favorites.length - 1}
        onMoveUp={() => {
          reorderFavorite(i, i - 1)
        }}
        onMoveDown={() => {
          reorderFavorite(i, i + 1)
        }}
      />
    )
  });
  return <List>{items}</List>
};

export default Favorites

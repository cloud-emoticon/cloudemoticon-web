import React from 'react'
import RepositoryEmoticon from '../Components/RepositoryEmoticon'
import List from '@material-ui/core/List';
import EmptyView from "../Components/EmptyView";
import EmptyViewText from "../Components/EmptyViewText";

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
      <RepositoryEmoticon
        key={i}
        data={item}
        addHistory={props.addHistory}
        snackbarOpen={props.snackbarOpen}
        addFavorite={props.addFavorite}
        removeFavorite={props.removeFavorite}
        isInFavorite={props.isInFavorite}
      />
    )
  });
  return <List>{items}</List>
};

export default Favorites

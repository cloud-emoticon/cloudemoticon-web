import React from 'react'
import Emoticon from './Emoticon'
import List from '@material-ui/core/List';

const Favorites = (props) => {
  const items = props.getFavorites().map((item, i) => {
    return (
      <Emoticon
        key={i}
        data={item}
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

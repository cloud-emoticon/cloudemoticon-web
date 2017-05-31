import React from 'react'
import Emoticon from './Emoticon'
import {ListItem} from 'material-ui/List';

const Category = (props) => {
  const data = props.data;
  const emoticonItems = data['entries'].map((entry, i) => {
    return (
      <Emoticon
        key={i}
        data={entry}
        snackbarOpen={props.snackbarOpen}
        addFavorite={props.addFavorite}
        removeFavorite={props.removeFavorite}
        isInFavorite={props.isInFavorite}
      />
    )
  })
  return (
    <ListItem
      primaryText={data['name']}
      nestedItems={emoticonItems}
    />
  )
}

export default Category

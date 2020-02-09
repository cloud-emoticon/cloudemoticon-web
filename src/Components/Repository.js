import React from 'react';
import Category from './Category';
import List from '@material-ui/core/List';
import CircularProgress from '@material-ui/core/CircularProgress';

const Repository = (props) => {
  if (props.ifRepoIsLoading()) {
    return <CircularProgress
      size={80}
      thickness={5}
    />
  } else if (props.getRepoError()) {
    const error = props.getRepoError();
    console.error(error);
    return <div>{error.message}</div>
  } else {
    const data = props.getRepoData();
    const categoryItems = data['categories'].map((category, i) => {
      return (
        <Category
          key={i}
          data={category}
          snackbarOpen={props.snackbarOpen}
          addFavorite={props.addFavorite}
          removeFavorite={props.removeFavorite}
          isInFavorite={props.isInFavorite}
        />
      )
    });
    return <List>{categoryItems}</List>
  }
};

export default Repository

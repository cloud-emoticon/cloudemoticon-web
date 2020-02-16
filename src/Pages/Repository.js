import React from 'react';
import Category from '../Components/Category';
import List from '@material-ui/core/List';
import CircularProgress from '@material-ui/core/CircularProgress';

const Repository = props => {
  if (props.loading) {
    return <CircularProgress
      size={80}
      thickness={5}
    />
  }
  const error = props.error;
  if (error) {
    console.error(error);
    return <div>{error.message}</div>
  }
  const data = props.data;
  const categoryItems = data['categories'].map((category, i) => {
    return (
      <Category
        key={i}
        data={category}
        addHistory={props.addHistory}
        snackbarOpen={props.snackbarOpen}
        addFavorite={props.addFavorite}
        removeFavorite={props.removeFavorite}
        isInFavorite={props.isInFavorite}
      />
    )
  });
  return <List>{categoryItems}</List>
};

export default Repository

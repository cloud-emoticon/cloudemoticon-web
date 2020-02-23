import React from 'react';
import Category from '../Components/Category';
import List from '@material-ui/core/List';
import CircularProgress from '@material-ui/core/CircularProgress';
import EmptyView from "../Components/EmptyView";
import EmptyViewText from "../Components/EmptyViewText";

const Repository = props => {
  if (props.loading) {
    return (
      <EmptyView>
        <CircularProgress
          size={80}
          thickness={5}
        />
      </EmptyView>
    );
  }
  const error = props.error;
  if (error) {
    return (
      <EmptyView>
        <EmptyViewText
          firstLine="(((( ；ﾟДﾟ)))))))"
          secondLine={`Ooops. Something bad happened: ${error.toString()}`}
        />
      </EmptyView>
    );
  }
  const data = props.data;
  const categoryItems = data.categories.map((category, i) => {
    return (
      <Category
        key={i}
        data={category}
        addHistory={props.addHistory}
        openSnackbar={props.openSnackbar}
        addFavorite={props.addFavorite}
        removeFavorite={props.removeFavorite}
        isInFavorite={props.isInFavorite}
        onToggle={() => {
          props.onRepoToggle(category.name)
        }}
      />
    )
  });
  return <List>{categoryItems}</List>
};

export default Repository

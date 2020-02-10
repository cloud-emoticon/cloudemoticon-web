import React from 'react'
import Emoticon from './Emoticon'
import List from '@material-ui/core/List';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const Favorites = (props) => {
  const favorites = props.getFavorites();
  if (!favorites || favorites.length === 0) {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Typography variant='h4'>
            (〜￣△￣)〜
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h6'>
            You don't have any bookmarks
          </Typography>
        </Grid>
      </Grid>
    )
  }
  const items = favorites.map((item, i) => {
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

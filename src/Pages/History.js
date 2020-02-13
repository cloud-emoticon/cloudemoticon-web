import React from 'react'
import BaseEmoticon from '../Components/BaseEmoticon'
import List from '@material-ui/core/List';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const History = (props) => {
  const history = props.getHistory();
  if (!history || history.length === 0) {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Typography variant='h4'>
            (〜￣△￣)〜
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h6'>
            You don't have any history
          </Typography>
        </Grid>
      </Grid>
    )
  }
  const items = history.map((emoticon, i) => {
    return (
      <BaseEmoticon
        key={i}
        data={{
          emoticon,
          description: null
        }}
        addHistory={props.addHistory}
        snackbarOpen={props.snackbarOpen}
      />
    )
  });
  return <List>{items}</List>
};

export default History

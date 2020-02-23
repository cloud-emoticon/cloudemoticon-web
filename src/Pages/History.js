import React from 'react'
import BaseEmoticon from '../Components/BaseEmoticon'
import List from '@material-ui/core/List';
import EmptyView from "../Components/EmptyView";
import EmptyViewText from "../Components/EmptyViewText";

const History = (props) => {
  const history = props.history;
  if (!history || history.length === 0) {
    return (
      <EmptyView>
        <EmptyViewText
          firstLine="(〜￣△￣)〜"
          secondLine="You don't have any history"
        />
      </EmptyView>
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
        openSnackbar={props.openSnackbar}
      />
    )
  });
  return <List>{items}</List>
};

export default History

import React from 'react'
import RepositoryEmoticon from './RepositoryEmoticon'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List"

const Category = props => {
  const data = props.data;
  const emoticonItems = data.entries.map((entry, i) => {
    return (
      <RepositoryEmoticon
        key={i}
        data={entry}
        addHistory={props.addHistory}
        openSnackbar={props.openSnackbar}
        addFavorite={props.addFavorite}
        removeFavorite={props.removeFavorite}
        isInFavorite={props.isInFavorite}
      />
    )
  });
  return (
    <React.Fragment>
      <ListItem button onClick={e => {
        e.preventDefault();
        props.onToggle()
      }}>
        <ListItemText primary={data.name}/>
        {data._open ? <ExpandLess/> : <ExpandMore/>}
      </ListItem>
      <Collapse in={data._open} timeout="auto" unmountOnExit>
        <List>
          {emoticonItems}
        </List>
      </Collapse>
    </React.Fragment>
  )
};

export default Category

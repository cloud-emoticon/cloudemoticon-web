import React from 'react'
import RepositoryEmoticon from './RepositoryEmoticon'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List"

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true
    }
  }

  render() {
    const data = this.props.data;
    const emoticonItems = data['entries'].map((entry, i) => {
      return (
        <RepositoryEmoticon
            key={i}
            data={entry}
            snackbarOpen={this.props.snackbarOpen}
            addFavorite={this.props.addFavorite}
            removeFavorite={this.props.removeFavorite}
            isInFavorite={this.props.isInFavorite}
        />
      )
    });
    return (
      <React.Fragment>
        <ListItem button onClick={e => {
          e.preventDefault();
          this.setState({
            open: !this.state.open
          })
        }}>
          <ListItemText primary={data['name']} />
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          <List>
            {emoticonItems}
          </List>
        </Collapse>
      </React.Fragment>
    )
  }
}

export default Category

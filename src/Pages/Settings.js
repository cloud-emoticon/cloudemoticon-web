import React, {Component} from 'react'
import { List, ListItem, ListItemText } from '@material-ui/core';
import SettingsHeader from "../Components/SettingsHeader";

class Settings extends Component {
  render() {
    return (
      <List>
        <SettingsHeader title="Settings" />
        <ListItem>
          <ListItemText primary="Version" secondary={window.ceVersion}/>
        </ListItem>
        <ListItem onClick={e => {
          e.preventDefault();
          window.close()
        }}>
          <ListItemText primary="Exit" secondary="Exit the app"/>
        </ListItem>
      </List>
    )
  }
}

export default Settings

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
      </List>
    )
  }
}

export default Settings

import React, { Component } from 'react';
import Repository from './Repository'
import Settings from './Settings'
import {Tabs, Tab} from 'material-ui/Tabs';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Snackbar from 'material-ui/Snackbar';
import ListIcon from 'material-ui/svg-icons/action/list'
import SettingsIcon from 'material-ui/svg-icons/action/settings'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends Component {
  constructor() {
    super()
    this.state = {
      snackbar: false,
    };
  }
  snackbarOpen = (text) => {
    this.setState({
      snackbar: text,
    });
  };
  snackbarClose = () => {
    this.setState({
      snackbar: false,
    });
  };
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Tabs>
            <Tab
              icon={<ListIcon/>}
              label="Repository" >
              <Repository
                snackbarOpen={this.snackbarOpen}
                url="https://ktachibana.party/cloudemoticon/default.json"
              />
            </Tab>
            <Tab
              icon={<SettingsIcon/>}
              label="Settings" >
              <Settings/>
            </Tab>
          </Tabs>
          <Snackbar
            open={this.state.snackbar !== false}
            message={this.state.snackbar}
            autoHideDuration={2000}
            onRequestClose={this.snackbarClose}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;

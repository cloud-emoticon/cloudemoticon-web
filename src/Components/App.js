import React, { Component } from 'react';
import Repository from './Repository'
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Snackbar from 'material-ui/Snackbar';

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
          <Repository
            snackbarOpen={this.snackbarOpen}
            url="https://ktachibana.party/cloudemoticon/default.json"
          />
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

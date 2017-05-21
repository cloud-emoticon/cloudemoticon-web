import React, { Component } from 'react';
import Repository from './Repository'
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Repository url="https://ktachibana.party/cloudemoticon/default.json"/>
      </MuiThemeProvider>

    );
  }
}

export default App;

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

const DEFAULT_REPO_URL = 'https://ktachibana.party/cloudemoticon/default.json'

class App extends Component {
  constructor() {
    super()
    this.state = {
      repo: {
        url: this.getPersistRepoUrl(),
        data: undefined,
        loading: true,
        error: false
      },
      snackbar: false,
    };
    this.fetchRepo(this.getPersistRepoUrl())
  }
  fetchRepo = (fetchUrl) => {
    fetch(fetchUrl)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw new Error(`Unable to download ${fetchUrl}`)
      })
      .then(data => {
        this.setState({
          repo: {
            url: fetchUrl,
            data: data,
            loading: false,
            error: false
          }
        })
      })
      .catch(error => {
        this.setState({
          repo: {
            url: fetchUrl,
            data: undefined,
            loading: false,
            error: error
          }
        })
      })
  }
  getRepoUrl = () => {
    return this.state.repo.url
  }
  setRepoUrl = (newUrl) => {
    this.setState({
      repo: {
        url: newUrl,
        data: undefined,
        loading: true,
        error: false
      }
    })
    this.setPersistRepoUrl(newUrl)
    this.fetchRepo(newUrl)
    this.snackbarOpen('Repository URL set')
  }
  getPersistRepoUrl = () => {
    return window.localStorage.getItem('repoUrl') || DEFAULT_REPO_URL
  }
  setPersistRepoUrl = (newUrl) => {
    window.localStorage.setItem('repoUrl', newUrl)
  }
  getRepoData = () => {
    return this.state.repo.data
  }
  ifRepoIsLoading = () => {
    return this.state.repo.loading
  }
  getRepoError = () => {
    return this.state.repo.error
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
              icon={<ListIcon/>}>
              <Repository
                snackbarOpen={this.snackbarOpen}
                getRepoData={this.getRepoData}
                ifRepoIsLoading={this.ifRepoIsLoading}
                getRepoError={this.getRepoError}
              />
            </Tab>
            <Tab
              icon={<SettingsIcon/>}>
              <Settings
                getRepoUrl={this.getRepoUrl}
                setRepoUrl={this.setRepoUrl}
              />
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

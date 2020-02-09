import React, {Component} from 'react';
import Favorites from './Favorites'
import Repository from './Repository'
import Settings from './Settings'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Snackbar from '@material-ui/core/Snackbar';
import ListIcon from '@material-ui/icons/List'
import SettingsIcon from '@material-ui/icons/Settings'
import FavoriteIcon from '@material-ui/icons/Favorite'
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";

const DefaultRepoUrl = 'https://ktachibana.party/cloudemoticon/default.json';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repo: {
        url: this.getPersistRepoUrl(),
        data: undefined,
        loading: true,
        error: false
      },
      favorites: this.getPersistFavorites(),
      snackbar: false,
      tabIndex: 0,
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
  };
  getRepoUrl = () => {
    return this.state.repo.url
  };
  setRepoUrl = (newUrl) => {
    this.setState({
      repo: {
        url: newUrl,
        data: undefined,
        loading: true,
        error: false
      }
    });
    this.setPersistRepoUrl(newUrl);
    this.fetchRepo(newUrl);
    this.snackbarOpen('Repository URL set')
  };
  getPersistRepoUrl = () => {
    return window.localStorage.getItem('repoUrl') || DefaultRepoUrl
  };
  setPersistRepoUrl = (newUrl) => {
    window.localStorage.setItem('repoUrl', newUrl)
  };
  getRepoData = () => {
    return this.state.repo.data
  };
  ifRepoIsLoading = () => {
    return this.state.repo.loading
  };
  getRepoError = () => {
    return this.state.repo.error
  };
  getFavorites = () => {
    return this.state.favorites
  };
  addFavorite = (emoticon, description) => {
    const favorites = this.state.favorites;
    favorites.push({emoticon, description});
    this.setState({favorites});
    this.setPersistFavorites(favorites)
  };
  _findFavoriteIndex = (targetEmoticon, targetDescription) => {
    return this.state.favorites.findIndex(({emoticon, description}) => {
      return targetEmoticon === emoticon && targetDescription === description
    })
  };
  removeFavorite = (emoticon, description) => {
    const i = this._findFavoriteIndex(emoticon, description);
    if (i !== -1) {
      const favorites = this.state.favorites;
      favorites.splice(i, 1);
      this.setState({favorites});
      this.setPersistFavorites(favorites)
    }
  };
  isInFavorite = (emoticon, description) => {
    return this._findFavoriteIndex(emoticon, description) !== -1
  };
  getPersistFavorites = () => {
    return JSON.parse(window.localStorage.getItem('favorites')) || []
  };
  setPersistFavorites = (newFavorites) => {
    window.localStorage.setItem('favorites', JSON.stringify(newFavorites))
  };
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
      <React.Fragment>
        <CssBaseline/>
        <AppBar position='static'>
          <Tabs
            value={this.state.tabIndex}
            onChange={(e, newTabIndex) => {
              e.preventDefault();
              this.setState({
                ...this.state,
                tabIndex: newTabIndex
              })
            }}
            variant='fullWidth'
          >
            <Tab value={0} icon={<FavoriteIcon/>}/>
            <Tab value={1} icon={<ListIcon/>}/>
            <Tab value={2} icon={<SettingsIcon/>}/>
          </Tabs>
        </AppBar>
        <div hidden={this.state.tabIndex !== 0}>
          <Favorites
            snackbarOpen={this.snackbarOpen}
            getFavorites={this.getFavorites}
            addFavorite={this.addFavorite}
            removeFavorite={this.removeFavorite}
            isInFavorite={this.isInFavorite}
          />
        </div>
        <div hidden={this.state.tabIndex !== 1}>
          <Repository
            snackbarOpen={this.snackbarOpen}
            getRepoData={this.getRepoData}
            ifRepoIsLoading={this.ifRepoIsLoading}
            getRepoError={this.getRepoError}
            addFavorite={this.addFavorite}
            removeFavorite={this.removeFavorite}
            isInFavorite={this.isInFavorite}
          />
        </div>
        <div hidden={this.state.tabIndex !== 2}>
          <Settings
            getRepoUrl={this.getRepoUrl}
            setRepoUrl={this.setRepoUrl}
          />
        </div>
        <Snackbar
          open={this.state.snackbar !== false}
          message={this.state.snackbar}
          autoHideDuration={2000}
          onRequestClose={this.snackbarClose}
        />
      </React.Fragment>
    );
  }
}

export default App;

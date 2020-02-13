import React, {Component} from 'react';
import Favorites from './Favorites'
import Repository from './Repository'
import Settings from './Settings'
import History from "./History";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Snackbar from '@material-ui/core/Snackbar';
import SettingsIcon from '@material-ui/icons/Settings'
import FavoriteIcon from '@material-ui/icons/Favorite'
import HistoryIcon from '@material-ui/icons/History'
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete"
import AddIcon from "@material-ui/icons/Add"
import KitchenIcon from "@material-ui/icons/Kitchen"
import RefreshIcon from "@material-ui/icons/Refresh"
import IconButton from "@material-ui/core/IconButton";
import RepoManager from "./RepoManager";

export const DefaultRepoUrl = 'https://ktachibana.party/cloudemoticon/default.json';
const MaxHistoryCount = 50;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: this.getPersistentFavorites(),
      history: this.getPersistentHistory(),
      repos: this.getPersistentRepos(),
      snackbar: false,
      tabIndex: 0,
    };
  }

  addFavorite = (emoticon, description) => {
    const favorites = this.state.favorites;
    favorites.push({emoticon, description});
    this.setState({favorites});
    this.setPersistentFavorites(favorites)
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
      this.setPersistentFavorites(favorites)
    }
  };

  isInFavorite = (emoticon, description) => {
    return this._findFavoriteIndex(emoticon, description) !== -1
  };

  getPersistentFavorites = () => {
    return JSON.parse(window.localStorage.getItem('favorites')) || []
  };

  setPersistentFavorites = (newFavorites) => {
    window.localStorage.setItem('favorites', JSON.stringify(newFavorites))
  };

  addHistory = (newEmoticon) => {
    let history = this.getPersistentHistory();
    history = [newEmoticon, ...history];
    if (history.length > MaxHistoryCount) {
      history.pop()
    }
    this.setState({history});
    this.setPersistentHistory(history)
  };

  clearHistory = () => {
    this.setState({history: []});
    this.setPersistentHistory([])
  };

  getPersistentHistory = () => {
    return JSON.parse(window.localStorage.getItem('history')) || []
  };

  setPersistentHistory = (newHistory) => {
    window.localStorage.setItem('history', JSON.stringify(newHistory))
  };

  addRepo = (newRepoName, newRepoUrl) => {
    const repos = this.state.repos;
    repos.push({
      url: newRepoUrl,
      name: newRepoName
    });
    this.setState({ repos });
    this.setPersistentRepos(repos)
  };

  removeRepo = (repoUrl) => {
    let repos = this.state.repos;
    repos = repos.filter(repo => repo.url !== repoUrl);
    this.setState({ repos });
    this.setPersistentRepos(repos)
  };

  getPersistentRepos = () => {
    return JSON.parse(window.localStorage.getItem('repos')) || [
      {
        "name": "KT's favorites",
        "url": DefaultRepoUrl
      }
    ]
  };

  setPersistentRepos = newRepos => {
    window.localStorage.setItem('repos', JSON.stringify(newRepos))
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

  renderMenuAction = () => {
    const tabIndex = this.state.tabIndex;
    const repoCount = this.state.repos.length;
    if (tabIndex === 0) {
      return (
        <IconButton color="inherit">
          <AddIcon />
        </IconButton>
      )
    }
    if (tabIndex === 1) {
      return (
        <IconButton color="inherit" onClick={e => {
          e.preventDefault();
          this.clearHistory()
        }}>
          <DeleteIcon />
        </IconButton>
      )
    }
    if (tabIndex === 2 + repoCount) {
      return (
        <IconButton color="inherit">
          <AddIcon />
        </IconButton>
      )
    }
    if (tabIndex === 2 + repoCount + 1) {
      return null;
    }
    return (
      <IconButton color="inherit">
        <RefreshIcon />
      </IconButton>
    )
  };

  renderTabs = () => {
    const repoCount = this.state.repos.length;
    const repoTabs = this.state.repos.map((repo, i) => {
      return <Tab key={2 + i} value={2 + i} label={repo.name} />
    });
    return [
      (<Tab key={0} value={0} icon={<FavoriteIcon/>} />),
      (<Tab key={1} value={1} icon={<HistoryIcon/>} />),
      ...repoTabs,
      (<Tab key={2 + repoCount} value={2 + repoCount} icon={<KitchenIcon/>} />),
      (<Tab key={2 + repoCount + 1} value={2 + repoCount + 1} icon={<SettingsIcon/>} />)
    ]
  };

  renderPages = () => {
    const repoPages = this.state.repos.map(repo => {
      return (
        <Repository
          url={repo.url}
          snackbarOpen={this.snackbarOpen}
          addFavorite={this.addFavorite}
          removeFavorite={this.removeFavorite}
          isInFavorite={this.isInFavorite}
          addHistory={this.addHistory}
        />
      )
    });
    return [
      <Favorites
        favorites={this.state.favorites}
        snackbarOpen={this.snackbarOpen}
        addFavorite={this.addFavorite}
        removeFavorite={this.removeFavorite}
        isInFavorite={this.isInFavorite}
        addHistory={this.addHistory}
      />,
      <History
        history={this.state.history}
        snackbarOpen={this.snackbarOpen}
        addHistory={this.addHistory}
      />,
      ...repoPages,
      <RepoManager
        repos={this.state.repos}
        addRepo={this.addRepo}
        removeRepo={this.removeRepo}
      />,
      <Settings />
    ].map((page, i  ) => {
      return (
        <div key={i} hidden={this.state.tabIndex !== i}>
          {page}
        </div>
      )
    })
  };

  render() {
    return (
      <React.Fragment>
        <CssBaseline/>
        <AppBar position='static'>
          <Toolbar>
            <Typography variant="h5">
              Cloud Emoticon 2
            </Typography>
            {this.renderMenuAction()}
          </Toolbar>
          <Tabs
            value={this.state.tabIndex}
            onChange={(e, newTabIndex) => {
              e.preventDefault();
              this.setState({
                tabIndex: newTabIndex
              })
            }}
            variant='scrollable'
          >
            {this.renderTabs()}
          </Tabs>
        </AppBar>
        {this.renderPages()}
        <Snackbar
          open={this.state.snackbar !== false}
          message={this.state.snackbar}
          autoHideDuration={2000}
          onClose={this.snackbarClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        />
      </React.Fragment>
    );
  }
}

export default App;

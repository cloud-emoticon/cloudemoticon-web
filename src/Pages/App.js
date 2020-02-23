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
import DeleteIcon from "@material-ui/icons/Delete"
import AddIcon from "@material-ui/icons/Add"
import KitchenIcon from "@material-ui/icons/Kitchen"
import RefreshIcon from "@material-ui/icons/Refresh"
import RepoManager from "./RepoManager";
import Fab from "@material-ui/core/Fab"
import DualTextDialog from "../Components/DualTextDialog";
import { createStyles, withStyles } from "@material-ui/core/styles";
import xmlToJsonRepo from "../utils/xmlToJsonRepo";
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

export const DefaultRepoUrl = 'https://ktachibana.party/cloudemoticon/default.json';
const MaxHistoryCount = 50;

const styles = theme => createStyles({
  primaryFab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  secondaryFab: {
    position: 'fixed',
    bottom: theme.spacing(12),
    right: theme.spacing(3),
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: this.getPersistentFavorites(),
      history: this.getPersistentHistory(),
      repos: this.getPersistentRepos().map(repo => {
        return {
          ...repo,
          loading: true,
          error: undefined,
          data: undefined,
        }
      }),
      snackbar: false,
      tabIndex: 0,
      newFavoriteDialogOpen: false,
      newRepoDialogOpen: false
    };
    this.fetchRepo = this.fetchRepo.bind(this)
  }

  componentDidMount() {
    this.state.repos.forEach((_, index) => {
      this.fetchRepo(index)
    })
  }

  async fetchRepo(index) {
    this.setRepoStateLoading(index, true);
    const repo = this.state.repos[index];
    const url = repo.url;
    try {
      const response = await fetch(url, {cache: 'no-cache'});
      if (!response.ok) {
        throw new Error(`Unable to download ${url}`)
      }
      const text = await response.text();
      let repo;
      if (url.endsWith('.json')) {
        repo = JSON.parse(text)
      } else if (url.endsWith('.xml')) {
        repo = await xmlToJsonRepo(text);
      } else {
        throw new Error(`Unknown repo type ${url}`)
      }
      this.setStateRepo(index, false, undefined, repo)
    } catch (e) {
      this.setStateRepo(index, false, e, undefined)
    } finally {
      this.setRepoStateLoading(index, false)
    }
  }

  setRepoStateLoading = (index, loading) => {
    this.setState({
      repos: Object.assign(
        [],
        this.state.repos,
        { [index]: {
            ...this.state.repos[index],
            loading
          }
        }
      )
    })
  };

  setStateRepo = (index, loading, error, data) => {
    this.setState({
      repos: Object.assign(
        [],
        this.state.repos,
        { [index]: {
            ...this.state.repos[index],
            loading, error, data
          }
        }
      )
    })
  };

  addFavorite = (emoticon, description) => {
    const favorites = this.state.favorites;
    favorites.push({emoticon, description});
    this.setState({favorites});
    this.setPersistentFavorites(favorites)
  };

  removeFavorite = (emoticon) => {
    let favorites = this.state.favorites;
    favorites = favorites.filter(favorite => favorite.emoticon !== emoticon);
    this.setState({ favorites });
    this.setPersistentFavorites(favorites)
  };

  isInFavorite = (emoticon) => {
    return this.state.favorites.map(f => f.emoticon).indexOf(emoticon) !== -1
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
    const oldReposLength = this.state.repos.length;
    const repos = [
      ...this.state.repos,
      {
        url: newRepoUrl,
        name: newRepoName,
        loading: true,
        error: undefined,
        data: undefined
      }
    ];
    this.setState({ repos }, () => {
      // only fetch repo after the new repo item is added to state
      this.fetchRepo(oldReposLength)
    });
    this.setPersistentRepos(repos);
  };

  removeRepo = (repoUrl) => {
    const repos = this.state.repos.filter(repo => {
      return repo.url !== repoUrl
    });
    this.setState({ repos });
    this.setPersistentRepos(repos)
  };

  isInRepos = (repoUrl) => {
    return this.state.repos.map(repo => repo.url).indexOf(repoUrl) !== -1
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
    const toBePersisted = newRepos.map(repo => {
      return {
        "name": repo.name,
        "url": repo.url
      }
    });
    window.localStorage.setItem('repos', JSON.stringify(toBePersisted))
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

  renderFabs = () => {
    const { classes } = this.props;
    const tabIndex = this.state.tabIndex;

    const fabs = [
      (
        <Fab color="secondary" className={classes.primaryFab} onClick={e => {
          e.preventDefault();
          this.setState({
            newFavoriteDialogOpen: true
          })
        }}>
          <AddIcon />
        </Fab>
      ),
      (
        <Fab color="secondary" className={classes.primaryFab} onClick={e => {
          e.preventDefault();
          this.clearHistory()
        }}>
          <DeleteIcon />
        </Fab>
      ),
      ...this.state.repos.map((_, index) => {
        return (
          <React.Fragment>
            <Fab color="secondary" className={classes.primaryFab} onClick={e => {
              e.preventDefault();
              this.fetchRepo(index)
            }}>
              <RefreshIcon />
            </Fab>
            <Fab color="primary" size="small" className={classes.secondaryFab}>
              <ExpandLessIcon />
            </Fab>
          </React.Fragment>
        )
      }),
      (
        <Fab color="secondary" className={classes.primaryFab} onClick={e => {
          e.preventDefault();
          this.setState({
            newRepoDialogOpen: true
          })
        }}>
          <AddIcon />
        </Fab>
      ),
      null
    ];

    return fabs[tabIndex];
  };

  renderTabs = () => {
    const repoTabConfigs = this.state.repos.map(repo => {
      return { label: repo.name }
    });
    const tabConfigs = [
      { icon: (<FavoriteIcon/>) },
      { icon: (<HistoryIcon/>) },
      ...repoTabConfigs,
      { icon: (<KitchenIcon/>) },
      { icon: (<SettingsIcon/>) },
    ];
    return tabConfigs.map((tabConfig, i) => {
      return (
        <Tab
          key={i}
          value={i}
          {...tabConfig}
        />
      )
    });
  };

  renderPages = () => {
    const repoPages = this.state.repos.map((repo, index) => {
      return (
        <Repository
          loading={this.state.repos[index].loading}
          error={this.state.repos[index].error}
          data={this.state.repos[index].data}
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
        isInRepos={this.isInRepos}
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
        <AppBar position='sticky'>
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
        {this.renderFabs()}
        <DualTextDialog
          open={this.state.newFavoriteDialogOpen}
          onClose={() => {
            this.setState({
              newFavoriteDialogOpen: false
            })
          }}
          title='Add favorite'
          primaryLabel='Emoticon'
          secondaryLabel='Description'
          onValidate={emoticon => {
            if (this.isInFavorite(emoticon)) {
              return 'This emoticon already exists'
            } else {
              return false
            }
          }}
          onConfirm={(emoticon, description) => {
            this.addFavorite(emoticon, description)
          }}
        />
        <DualTextDialog
          open={this.state.newRepoDialogOpen}
          onClose={() => {
            this.setState({
              newRepoDialogOpen: false
            })
          }}
          title='Add repo'
          primaryLabel='URL'
          secondaryLabel='Alias'
          onValidate={url => {
            if (this.isInRepos(url)) {
              return 'This URL already exists'
            } else {
              return false
            }
          }}
          onConfirm={(url, alias) => {
            this.addRepo(alias, url)
          }}
        />
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

export default withStyles(styles)(App);

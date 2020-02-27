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
import {createStyles, MuiThemeProvider, withStyles} from "@material-ui/core/styles";
import xmlToJsonRepo from "../utils/xmlToJsonRepo";
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SwipeableViews from 'react-swipeable-views';
import EditIcon from '@material-ui/icons/Edit'
import DoneIcon from '@material-ui/icons/Done'
import ControlledDualTextDialog from "../Components/ControlledDualTextDialog";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

export const DefaultRepoUrl = 'https://ktachibana.party/cloudemoticon/default.json';
const MaxHistoryCount = 50;

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2196f3'
    },
    secondary: {
      main: '#e91e63'
    }
  }
});

const styles = theme => createStyles({
  primaryFab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  secondaryFab: {
    position: 'fixed',
    bottom: theme.spacing(11),
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
      newRepoDialogOpen: false,
      editingFavorites: false,
      editFavoriteDialogOpen: false,
      editingFavoriteIndex: -1,
      editingFavoriteEmoticon: '',
      editingFavoriteDescription: '',
      editingFavoriteError: false
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
            loading, error,
            data: {
              ...data,
              categories: data.categories.map(cat => {
                return {
                  ...cat,
                  _open: true
                }
              })
            }
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

  reorderFavorite = (fromIndex, toIndex) => {
    const favorites = this.state.favorites;
    [favorites[fromIndex], favorites[toIndex]] = [favorites[toIndex], favorites[fromIndex]];
    this.setState({ favorites });
    this.setPersistentFavorites(favorites)
  };

  replaceFavorite = (index, newEmotion, newDescription) => {
    const favorites = this.state.favorites;
    favorites[index] = {
      emoticon: newEmotion,
      description: newDescription
    };
    this.setState({ favorites });
    this.setPersistentFavorites(favorites)
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

  addRepo = (newRepoName, newRepoUrl, newRepoDescription, newRepoAuthorName, newRepoAuthorAvatarUrl) => {
    const oldReposLength = this.state.repos.length;
    const repos = [
      ...this.state.repos,
      {
        url: newRepoUrl,
        name: newRepoName,
        description: newRepoDescription,
        authorName: newRepoAuthorName,
        authorAvatarUrl: newRepoAuthorAvatarUrl,
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
        "url": repo.url,
        "description": repo.description,
        "authorName": repo.authorName,
        "authorAvatarUrl": repo.authorAvatarUrl,
      }
    });
    window.localStorage.setItem('repos', JSON.stringify(toBePersisted))
  };

  toggleRepoCategory = (repoIndex, categoryIndex) => {
    this.setState({
      repos: Object.assign(
        [],
        this.state.repos,
        {
          [repoIndex]: {
            ...this.state.repos[repoIndex],
            data: {
              ...this.state.repos[repoIndex].data,
              categories: Object.assign(
                [],
                this.state.repos[repoIndex].data.categories,
                {
                  [categoryIndex]: {
                    ...this.state.repos[repoIndex].data.categories[categoryIndex],
                    _open: !this.state.repos[repoIndex].data.categories[categoryIndex]._open
                  }
                }
              )
            }
          }
        }
      )
    })
  };

  setAllCategoriesOfRepoOpenOrClose = (repoIndex, open) => {
    this.setState({
      repos: Object.assign(
        [],
        this.state.repos,
        {
          [repoIndex]: {
            ...this.state.repos[repoIndex],
            data: {
              ...this.state.repos[repoIndex].data,
              categories: this.state.repos[repoIndex].data.categories.map(category => {
                return {
                  ...category,
                  _open: open
                }
              })
            }
          }
        }
      )
    })
  };

  isAnyCategoryOfRepoOpen = repoIndex => {
    return this.state.repos[repoIndex].data.categories
      .map(category => category._open)
      .reduce((acc, cur) => {
        return acc || cur
      }, false)
  };

  openSnackbar = (text) => {
    this.setState({
      snackbar: text,
    });
  };

  closeSnackbar = () => {
    this.setState({
      snackbar: false,
    });
  };

  renderFabs = () => {
    const { classes } = this.props;
    const tabIndex = this.state.tabIndex;

    const fabs = [
      (
        <React.Fragment>
          <Fab color="secondary" className={classes.primaryFab} onClick={e => {
            e.preventDefault();
            this.setState({
              newFavoriteDialogOpen: true
            })
          }}>
            <AddIcon />
          </Fab>
          {
            this.state.editingFavorites ?
              <Fab color="primary" size="small" className={classes.secondaryFab} onClick={e => {
                e.preventDefault();
                this.setState({
                  editingFavorites: false
                })
              }}>
                <DoneIcon />
              </Fab> :
              <Fab color="primary" size="small" className={classes.secondaryFab} onClick={e => {
                e.preventDefault();
                this.setState({
                  editingFavorites: true
                })
              }}>
                <EditIcon />
              </Fab>
          }
        </React.Fragment>
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
            {!this.state.repos[index].loading ?
              this.isAnyCategoryOfRepoOpen(index) ?
                (
                  <Fab color="primary" size="small" className={classes.secondaryFab} onClick={e => {
                    e.preventDefault();
                    this.setAllCategoriesOfRepoOpenOrClose(index, false);
                  }}>
                    <ExpandLessIcon />
                  </Fab>
                ) :
                (
                  <Fab color="primary" size="small" className={classes.secondaryFab} onClick={e => {
                    e.preventDefault();
                    this.setAllCategoriesOfRepoOpenOrClose(index, true);
                  }}>
                    <ExpandMoreIcon />
                  </Fab>
                ) :
              null
            }
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
    const repoPages = this.state.repos.map((_, index) => {
      return (
        <Repository
          loading={this.state.repos[index].loading}
          error={this.state.repos[index].error}
          data={this.state.repos[index].data}
          openSnackbar={this.openSnackbar}
          addFavorite={this.addFavorite}
          removeFavorite={this.removeFavorite}
          isInFavorite={this.isInFavorite}
          addHistory={this.addHistory}
          onRepoToggle={categoryIndex => {
            this.toggleRepoCategory(index, categoryIndex)
          }}
        />
      )
    });
    const pages = [
      <Favorites
        favorites={this.state.favorites}
        openSnackbar={this.openSnackbar}
        addFavorite={this.addFavorite}
        removeFavorite={this.removeFavorite}
        isInFavorite={this.isInFavorite}
        addHistory={this.addHistory}
        isEditing={this.state.editingFavorites}
        reorderFavorite={this.reorderFavorite}
        onEditFavorite={index => {
          const { emoticon, description } = this.state.favorites[index];
          this.setState({
            editFavoriteDialogOpen: true,
            editingFavoriteIndex: index,
            editingFavoriteEmoticon: emoticon,
            editingFavoriteDescription: description,
            editingFavoriteError: false
          })
        }}
      />,
      <History
        history={this.state.history}
        openSnackbar={this.openSnackbar}
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
        <div key={i}>
          {page}
        </div>
      )
    });
    return (
      <SwipeableViews
        index={this.state.tabIndex}
        onChangeIndex={newIndex => {
          this.setState({
            tabIndex: newIndex
          })
        }}
      >
        {pages}
      </SwipeableViews>
    )
  };

  renderNewFavoriteDialog = () => {
    return (
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
          if (!emoticon) {
            return 'Emoticon cannot be empty'
          }
          if (this.isInFavorite(emoticon)) {
            return 'This emoticon already exists'
          }
          return false
        }}
        onConfirm={(emoticon, description) => {
          this.addFavorite(emoticon, description)
        }}
      />
    )
  };

  renderNewRepoDialog = () => {
    return (
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
          if (!url) {
            return 'URL cannot be empty'
          }
          if (this.isInRepos(url)) {
            return 'This URL already exists'
          }
          return false
        }}
        onConfirm={(url, alias) => {
          this.addRepo(alias, url)
        }}
      />
    )
  };

  renderEditFavoriteDialog = () => {
    return (
      <ControlledDualTextDialog
        open={this.state.editFavoriteDialogOpen}
        onClose={() => {
          this.setState({
            editFavoriteDialogOpen: false
          })
        }}
        title="Edit favorite"
        primaryLabel="Emoticon"
        secondaryLabel="Description"
        onValidate={emoticon => {
          if (!emoticon) {
            return 'Emoticon cannot be empty'
          }
          return false
        }}
        onConfirm={(newEmoticon, newDescription) => {
          const index = this.state.editingFavoriteIndex;
          this.replaceFavorite(index, newEmoticon, newDescription);
        }}
        primaryText={this.state.editingFavoriteEmoticon}
        onChangePrimaryText={newEmoticon => {
          this.setState({
            editingFavoriteEmoticon: newEmoticon,
          })
        }}
        secondaryText={this.state.editingFavoriteDescription}
        onChangeSecondaryText={newDescription => {
          this.setState({
            editingFavoriteDescription: newDescription
          })
        }}
        primaryError={this.state.editingFavoriteError}
        onChangePrimaryError={error => {
          this.setState({
            editingFavoriteError: error
          })
        }}
      />
    )
  };

  render() {
    return (
      <MuiThemeProvider theme={theme}>
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
          {this.renderNewFavoriteDialog()}
          {this.renderNewRepoDialog()}
          {this.renderEditFavoriteDialog()}
          <Snackbar
            open={this.state.snackbar !== false}
            message={this.state.snackbar}
            autoHideDuration={2000}
            onClose={this.closeSnackbar}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          />
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(App);

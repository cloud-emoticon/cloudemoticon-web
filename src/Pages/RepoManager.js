import React from 'react'
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import SettingsHeader from "../Components/SettingsHeader";
import SettingsDivider from "../Components/SettingsDivider";
import CircularProgress from "@material-ui/core/CircularProgress";
import EmptyView from "../Components/EmptyView";
import EmptyViewText from "../Components/EmptyViewText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';


const RemoteReposIndexUrl = "https://cloud-emoticon-store-bridge.herokuapp.com/json";

class RepoManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: undefined,
      data: undefined
    }
  }

  componentDidMount() {
    fetch(RemoteReposIndexUrl)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw new Error(`Unable to download remote repos index`)
      })
      .then(data => {
        this.setState({
          data: data.map(item => {
            return {
              name: item.name,
              url: item.codeurl,
              description: item.introduction,
              authorName: item.creator,
              authorAvatarUrl: item.iconurl,
            }
          }),
        })
      })
      .catch(error => {
        this.setState({
          error: error
        })
      })
      .finally(() => {
        this.setState({
          loading: false
        })
      })
  }

  renderAvailableRepos = () => {
    if (this.state.loading) {
      return (
        <EmptyView>
          <CircularProgress
            size={80}
            thickness={5}
          />
        </EmptyView>
      )
    }
    const error = this.state.error;
    if (error) {
      return (
        <EmptyView>
          <EmptyViewText
            firstLine="(((( ；ﾟДﾟ)))))))"
            secondLine={`Ooops. Something bad happened: ${error.toString()}`}
          />
        </EmptyView>
      )
    }
    return this.state.data.map((repo, i)=> {
      const { name, url, description, authorName, authorAvatarUrl } = repo;
      return (
        <ListItem key={i}>
          <ListItemAvatar>
            <Avatar alt={authorName} src={authorAvatarUrl} />
          </ListItemAvatar>
          <ListItemText
            primary={`${name} by ${authorName}`}
            secondary={description}
          />
          <ListItemSecondaryAction>
            <IconButton disabled={this.props.isInRepos(url)} onClick={e => {
              e.preventDefault();
              this.props.addRepo(name, url, description, authorName, authorAvatarUrl)
            }}>
              <AddCircleIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      )
    })
  };

  render() {
    const repos = this.props.repos;
    const fixedLocalRepos = repos.filter(repo => repo.fixed).map((repo, i) => {
      const { name, description, authorName, authorAvatarUrl } = repo;
      return (
        <ListItem key={i}>
          {
            authorAvatarUrl ?
              <ListItemAvatar>
                <Avatar alt={authorName} src={authorAvatarUrl} />
              </ListItemAvatar> :
              null
          }
          <ListItemText
            primary={`${name} by ${authorName || '(Unknown)'}`}
            secondary={description || '(No description. You might need to re-add the repo.)'}
          />
        </ListItem>
      )
    });
    const localRepos = repos.filter(repo => !repo.fixed).map((repo, i) => {
      const { name, url, description, authorName, authorAvatarUrl } = repo;
      return (
        <ListItem key={fixedLocalRepos.length + i}>
          {
            authorAvatarUrl ?
              <ListItemAvatar>
                <Avatar alt={authorName} src={authorAvatarUrl} />
              </ListItemAvatar> :
              null
          }
          <ListItemText
            primary={`${name} by ${authorName || '(Unknown)'}`}
            secondary={description || '(No description. You might need to re-add the repo.)'}
          />
          <ListItemSecondaryAction>
            <IconButton onClick={e => {
              e.preventDefault();
              this.props.removeRepo(url)
            }}>
              <RemoveCircleIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      )
    });

    return (
      <List>
        <SettingsHeader title="Local repos" />
        {fixedLocalRepos}
        {localRepos}
        <SettingsDivider />
        <SettingsHeader title="Available repos" />
        {this.renderAvailableRepos()}
      </List>
    )
  }
}

export default RepoManager

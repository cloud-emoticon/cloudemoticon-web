import React from 'react'
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import SettingsHeader from "../Components/SettingsHeader";
import SettingsDivider from "../Components/SettingsDivider";
import CircularProgress from "@material-ui/core/CircularProgress";

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
              url: item.codeurl
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
      return <CircularProgress
        size={80}
        thickness={5}
      />
    }
    const error = this.state.error;
    if (error) {
      console.error(error);
      return <div>{error.message}</div>
    }
    const currentRepoUrls = this.props.getRepos().map(repo => repo.url);
    return this.state.data.map((repo, i)=> {
      const { name, url } = repo;
      return (
        <ListItem key={i} button disabled={currentRepoUrls.indexOf(url) !== -1} onClick={e => {
          e.preventDefault();
          this.props.addRepo(name, url)
        }}>
          <ListItemText
            primary={name}
            secondary={url}
          />
        </ListItem>
      )
    })
  };

  render() {
    const repos = this.props.getRepos();
    const fixedLocalRepos = repos.filter(repo => repo.fixed).map((repo, i) => {
      return (
        <ListItem key={i} disabled={true}>
          <ListItemText
            primary={repo.name}
            secondary={repo.url}
          />
        </ListItem>
      )
    });
    const localRepos = repos.filter(repo => !repo.fixed).map((repo, i) => {
      const { name, url } = repo;
      return (
        <ListItem key={fixedLocalRepos.length + i} button onClick={e => {
          e.preventDefault();
          this.props.removeRepo(url)
        }}>
          <ListItemText
            primary={name}
            secondary={url}
          />
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

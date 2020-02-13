import React from 'react'
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import SettingsHeader from "../Components/SettingsHeader";
import SettingsDivider from "../Components/SettingsDivider";

const RepoManager = props => {
  const repos = props.getRepos();
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
    return (
      <ListItem key={fixedLocalRepos.length + i}>
        <ListItemText
          primary={repo.name}
          secondary={repo.url}
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
      <ListItem disabled={true}>
        <ListItemText primary="WIP"/>
      </ListItem>
    </List>
  )
};

export default RepoManager

import React from 'react';
import Category from '../Components/Category';
import List from '@material-ui/core/List';
import CircularProgress from '@material-ui/core/CircularProgress';

class Repository extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: undefined,
      data: undefined
    }
  }

  componentDidMount() {
    this.fetchRepo()
  }

  fetchRepo = () => {
    const url = this.props.url;

    this.setState({
      loading: true
    });
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw new Error(`Unable to download ${url}`)
      })
      .then(data => {
        this.setState({
          data: data,
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
  };

  render() {
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
    const data = this.state.data;
    const categoryItems = data['categories'].map((category, i) => {
      return (
        <Category
          key={i}
          data={category}
          addHistory={this.props.addHistory}
          snackbarOpen={this.props.snackbarOpen}
          addFavorite={this.props.addFavorite}
          removeFavorite={this.props.removeFavorite}
          isInFavorite={this.props.isInFavorite}
        />
      )
    });
    return <List>{categoryItems}</List>
  }
}

export default Repository

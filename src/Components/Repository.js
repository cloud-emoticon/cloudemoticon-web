import React, { Component } from 'react';
import Category from './Category';

class Repository extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: false,
      data: undefined
    }
    fetch(props.url)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw new Error(`Unable to download ${props.url}`)
      })
      .then(json => {
        this.setState({
          loading: false,
          data: json
        })
      })
      .catch(error => {
        this.setState({
          loading: false,
          error: error
        })
      })
  }

  render() {
    if (this.state.loading) {
      return <div>loading</div>
    } else if (this.state.error) {
      console.error(this.state.error)
      return <div>{this.state.error.message}</div>
    } else {
      const categoryItems = this.state.data['categories'].map((category, i) => {
        return (
          <li key={i}>
            <Category data={category} />
          </li>
        )
      })
      return <ul>{categoryItems}</ul>
    }
  }
}

export default Repository

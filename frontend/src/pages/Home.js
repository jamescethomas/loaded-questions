import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Home extends Component {
  render() {
  return <div className="App-header">
      <a
        className="App-link"
        href="/join"
      >
        Join game
      </a>
      <br/>
      <a
        className="App-link"
        href="/create"
      >
        Create game
      </a>
    </div>
  }
}

export default withRouter(Home);

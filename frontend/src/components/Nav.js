import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Nav extends Component {
  onHomeClicked() {
    this.props.history.push('/');
  }

  render() {
    return <div className="nav">
      <div
      onClick={this.onHomeClicked.bind(this)}
      >Loaded questions</div>
    </div>
  }
}

export default withRouter(Nav);

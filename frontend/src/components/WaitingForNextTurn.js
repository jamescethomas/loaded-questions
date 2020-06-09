import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/actions.js';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

import StompClient from "react-stomp-client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faBook } from '@fortawesome/free-solid-svg-icons'



class WaitingForNextTurn extends Component {
  constructor(props) {
    super(props);

    this.onKeyDown = this.onKeyDown.bind(this);
  }

  componentDidMount(){
    document.addEventListener("keydown", this.onKeyDown, false);
  }
  componentWillUnmount(){
    document.removeEventListener("keydown", this.onKeyDown, false);
  }
  onKeyDown(event) {
    if (this.props.gameState.player.role === "GUESS") {
      if(event.key === 'Enter'){
        this.onSubmit()
        document.removeEventListener("keydown", this.onKeyDown, false);
      }
    }
  }

  onSubmit() {
    fetch(process.env.REACT_APP_SERVER_URL + '/nextTurn', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: this.props.gameState.player.token,
      }),
    })
  }

  render() {
    if (this.props.gameState.player.role === "GUESS") {
      return <Button variant="contained" color="primary" fullWidth={true} onClick={this.onSubmit.bind(this)}>
          Start next turn
        </Button>
    }

    var guesser;
    for(let i = 0; i < this.props.gameState.players.length; i++) {
      if (this.props.gameState.players[i].role === "GUESS") {
        guesser = this.props.gameState.players[i];
      }
    }

    return <Paper className="paper">
    <p>Waiting for <span className="text-highlight">{guesser.name}</span> to start next turn</p>
        </Paper>
  }
}

function mapStateToProps(state) {
  return {
    gameState: state.gameState
  }
}

function mapDispatchToProps(dispatch) {
  return {
    	actions: bindActionCreators(actions, dispatch)
    };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(WaitingForNextTurn)
);

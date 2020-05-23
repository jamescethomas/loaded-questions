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



class WaitingForAnswers extends Component {
  render() {
    var answers = {};
    // build answer token hash
    if (this.props.gameState.game.answers) {
      for (let i = 0; i < this.props.gameState.game.answers.length; i++) {
        answers[this.props.gameState.game.answers[i].token] = true;
      }
    }

    var players = [];
    for(let i = 0; i < this.props.gameState.players.length; i++) {
      if (!answers[this.props.gameState.players[i].token] && this.props.gameState.players[i].role != "GUESS") {
        players.push(<span className="text-highlight" key={i}>{this.props.gameState.players[i].name}</span>);
        players.push(<span key={i + "span"}>, </span>)
      }
    }

    // Remove trailing comma
    players.splice(-1,1)

    var text = "Waiting for answers from ";
    if (players.length == 1) {
      var text = "Waiting for answer from ";
    }

    return <Paper className="paper">
    <p className="question">{text}{players}</p>
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
  connect(mapStateToProps, mapDispatchToProps)(WaitingForAnswers)
);

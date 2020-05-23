import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/actions.js';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import StompClient from "react-stomp-client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCrown } from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';


class FinalResults extends Component {

  renderScores() {
    var players = [...this.props.gameState.players];
    players.sort(function(a, b) {
      return b.score - a.score
    });

    var rows = [];

    // create score to rank hash
    var scoreToRank = {};
    var rank = 0;
    for (var i = 1; i <= players.length; i++) {
      var player = players[i - 1];

      if (!scoreToRank[player.score]) {
        rank += 1;
        scoreToRank[player.score] = rank;
      }

      var icon = rank == 1 ? <FontAwesomeIcon icon={faCrown}/> : <span className="icon-placeholder"/>

      rows.push(<div key={i} className="final-reslts-row">
        <span className="final-results-name">
          {icon}
          <span className="name">{scoreToRank[player.score]}. {player.name}</span>
        </span>
        <span className="final-results-score">{player.score}</span>
      </div>)
    }

    return rows;
  }

  renderLikes() {
    var players = [...this.props.gameState.players];
    players.sort(function(a, b) {
      return b.likes - a.likes
    });

    var rows = [];
    var scoreToRank = {};
    var rank = 0;
    for (var i = 1; i <= players.length; i++) {
      var player = players[i - 1];

      if (!scoreToRank[player.likes]) {
        rank += 1;
        scoreToRank[player.likes] = rank;
      }

      var icon = rank == 1 ? <FontAwesomeIcon icon={faThumbsUp}/> : <span className="icon-placeholder"/>

      rows.push(<div key={i} className="final-reslts-row">
        <span className="final-results-name">
        {icon}
        <span className="name">{scoreToRank[player.likes]}. {player.name}</span>
        </span>
        <span className="final-results-score">{player.likes}</span>
      </div>)
    }

    return rows;
  }

  render() {
    return <Grid container spacing={2}>
      <Grid item xs={1}>
      </Grid>
      <Grid item xs={5}>
        <Paper className="paper">
          <h1>Final Scores</h1>
          <div className="final-scores-container">
            {this.renderScores()}
          </div>
        </Paper>
      </Grid>
      <Grid item xs={5}>
        <Paper className="paper">
          <h1>Most Likes</h1>
          <div className="final-scores-container">
            {this.renderLikes()}
            </div>
        </Paper>
      </Grid>

      <Grid item xs={1}>
      </Grid>
    </Grid>
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
  connect(mapStateToProps, mapDispatchToProps)(FinalResults)
);

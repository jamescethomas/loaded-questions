import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/actions.js';

import ResultsRow from './ResultsRow.js';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import StompClient from "react-stomp-client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

class Results extends Component {
  render() {
    // hash to name map of players
    var playerHash = {};
    var guesser;
    for (var i = 0; i < this.props.gameState.players.length; i++) {
      if (this.props.gameState.players[i].role === "GUESS") {
        guesser = this.props.gameState.players[i];
      }

      playerHash[this.props.gameState.players[i].token] = this.props.gameState.players[i];
    }

    var score = 0;
    var results = [];
    for (var i = 0; i < this.props.gameState.game.results.length; i++) {
      var result = this.props.gameState.game.results[i];
      score += result.guessedCorrectly ? 100 : 0;
      var rowClass = result.guessedCorrectly ? "correct-row" : "incorrect-row";

      results.push(<ResultsRow
        key={i}
        rowClass={rowClass}
        name={playerHash[result.token].name}
        token={result.token}
        answer={result.answer}
        guessedCorrectly={result.guessedCorrectly}
        playerToken={this.props.gameState.player.token}
      />)

      // results.push(<TableRow key={i} className={rowClass}>
      //   <TableCell className="text-highlight">{playerHash[result.token].name} </TableCell>
      //   <TableCell>{result.answer}</TableCell>
      //   <TableCell align="right">{result.guessedCorrectly ? "+100" : "+0"}</TableCell>
      //   <TableCell align="right"><FontAwesomeIcon icon={faThumbsUp} /></TableCell>
      // </TableRow>)
    }

    var bonusRow = null;
    if (this.props.gameState.game.bonusScore > 0) {
      score += this.props.gameState.game.bonusScore;
      bonusRow = <TableRow>
        <TableCell><strong>BONUS</strong></TableCell>
        <TableCell></TableCell>
        <TableCell align="right"><strong>{"+" + this.props.gameState.game.bonusScore}</strong></TableCell>
      </TableRow>;
    }

    var totalRow = <TableRow className="total-row">
      <TableCell><strong>Total</strong></TableCell>
      <TableCell></TableCell>
      <TableCell align="right"><strong>{"+" + score}</strong></TableCell>
    </TableRow>;

    return <Paper className="paper">
    <h1 className="results-header">Results for <span className="text-highlight">{guesser.name}</span></h1>

    <Table aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Player</TableCell>
          <TableCell>Answer</TableCell>
          <TableCell align="right">Score</TableCell>
          <TableCell className="like-cell" align="right"></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {results}
        {bonusRow}
        {totalRow}
      </TableBody>
    </Table>
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
  connect(mapStateToProps, mapDispatchToProps)(Results)
);

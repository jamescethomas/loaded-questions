import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/actions.js';

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

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

class ResultsRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wasClicked: false
    }
  }

  onLikeButtonClick() {
    if (this.state.wasClicked) {
      return;
    }

    // Make request
    fetch('/likeAnswer', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: this.props.token,
      }),
    })

    // set state
    this.setState((prevState) => {
      prevState.wasClicked = true;
      return prevState;
    })
  }

  render() {
    var likeButtonClass = this.state.wasClicked ? "like-cell like-button-clicked" : "like-cell like-button";
    var likeButton =
      this.props.token == this.props.playerToken ?
      <TableCell className="like-cell"></TableCell>
      :
      <TableCell className={likeButtonClass} align="right" onClick={this.onLikeButtonClick.bind(this)}><FontAwesomeIcon icon={faThumbsUp} /></TableCell>;

    return <TableRow className={this.props.rowClass}>
      <TableCell className="text-highlight">{this.props.name} </TableCell>
      <TableCell>{this.props.answer}</TableCell>
      <TableCell align="right">{this.props.guessedCorrectly ? "+100" : "+0"}</TableCell>
      {likeButton}
    </TableRow>
  }
}

export default ResultsRow;

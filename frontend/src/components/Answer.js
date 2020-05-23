import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/actions.js';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import StompClient from "react-stomp-client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faBook } from '@fortawesome/free-solid-svg-icons'



class Answer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      flip: false
    }
  }

  onCardClick() {
    if (this.state.flip) return;

    this.setState((prevState) => {
      prevState.flip = true
      return prevState;
    })
  }

  onSelection(event) {
    this.setState((prevState) => {
      prevState.value = event.target.value;
      return prevState;
    });

    // Alert parent of change
    this.props.selection(event.target.value, this.props.id);
  }

  getCorrectAnswerToken() {
    return this.props.answerToken;
  }

  getValue() {
    return this.state.value;
  }

  hasValue() {
    return this.state.value != "";
  }

  clearValue() {
    this.setState((prevState) => {
      prevState.value = "";
      return prevState;
    });
  }

  renderMenuItems() {
    var items = [];
    items.push(<MenuItem key={"menu"} value=""><em>None</em></MenuItem>);

    if (this.props.answeringPlayers) {
      for (var i = 0; i < this.props.answeringPlayers.length; i++) {
        items.push(<MenuItem key={"menu" + i} value={this.props.answeringPlayers[i].token}>{this.props.answeringPlayers[i].name}</MenuItem>)
      }
    }

    return items;
  }

  render() {
    var cardClass = this.state.flip ? "thecard flip" : "thecard";

    return <div className="maincontroller">
      <div className={cardClass}>
        <Paper className="front" onClick={this.onCardClick.bind(this)}></Paper>
        <Paper className="back">
          <div className="answer-row">
          <Grid container spacing={1}>
            <Grid item xs={10}>
                  <div className="answer">
                    {this.props.answer}
                  </div>
            </Grid>
            <Grid itme xs={2}>
                  <Select
                    className="player-selection"
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={this.state.value}
                    onChange={this.onSelection.bind(this)}
                  >
                  {this.renderMenuItems()}
                  </Select>
              </Grid>
            </Grid>
          </div>
        </Paper>
      </div>
    </div>
  }
}

export default Answer;

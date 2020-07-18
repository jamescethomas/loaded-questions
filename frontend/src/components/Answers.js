import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/actions.js';

import Answer from './Answer.js';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

import StompClient from "react-stomp-client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faBook } from '@fortawesome/free-solid-svg-icons'

// Lock it in Array
const LOCK_IT_IN = ["Lock It In!", "Lock It In?", "Is that Your Final Answer?", "Continue.", "See if you are right!", "Affirmative."];


class Answers extends Component {
  constructor(props) {
    super(props);

    this.onKeyDown = this.onKeyDown.bind(this);

    var answeringPlayers = [];
    if (props.gameState.players) {
      for (var i = 0; i < props.gameState.players.length; i++) {
        if (props.gameState.players[i].token != props.guesserToken) {
          answeringPlayers.push(props.gameState.players[i])
        }
      }
    }



    this.state = {
      disableSubmit: true,
      answeringPlayers: answeringPlayers,
      buttonText: this.randomizeLockItIn()
    }
  }

  onSelection(token, id) {
    var clearedValue = false;
    // Clear all other selections
    for (var ref in this.refs) {
      if (this.refs[ref].props.id !== id && this.refs[ref].getValue() === token) {
        // Clear the selection
        clearedValue = true;
        this.refs[ref].clearValue();
      }
    }

    // Check if everything has values and set the state
    var allHaveValues = token !== "" && !clearedValue;
    if (allHaveValues == true) {
      for (var ref in this.refs) {
        if (!this.refs[ref].hasValue() && this.refs[ref].props.id != id) {
          allHaveValues = false;
          break;
        }
      }
    }

    this.setState((prevState) => {
      prevState.disableSubmit = !allHaveValues;
      return prevState;
    })
  }

  componentDidMount(){
    document.addEventListener("keydown", this.onKeyDown, false);
  }
  componentWillUnmount(){
    document.removeEventListener("keydown", this.onKeyDown, false);
  }
  onKeyDown(event) {
    if (this.state.disableSubmit) {
      return;
    }

    if(event.key === 'Enter'){
      this.onSubmit()
      document.removeEventListener("keydown", this.onKeyDown, false);
    }
  }

  onSubmit() {
    var answers = [];
    var answer;
    for (var ref in this.refs) {
      answer = this.refs[ref];
      answers.push({
        answer: answer.getCorrectAnswerToken(),
        guess: answer.getValue()
      })
    }

    fetch(process.env.REACT_APP_SERVER_URL + '/lockInGuesses', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: this.props.gameState.player.token,
        answers: answers
      }),
    })
  }

  // Function to randomize Lock it In Phrases.
  randomizeLockItIn() {
    var randomIndex = Math.floor(Math.random() * Math.floor(LOCK_IT_IN.length));
    return LOCK_IT_IN [randomIndex];
  }


  render() {
    var answers = this.props.gameState.game.answers;
    var answerCards = [];
    for (var i = 0; i < answers.length; i++) {
      answerCards.push(<Answer
        key={"answers" + i}
        id={i}
        ref={"answers" + i}
        answer={answers[i].answer}
        answerToken={answers[i].token}
        answeringPlayers={this.state.answeringPlayers}
        selection={this.onSelection.bind(this)}
        />
      )
      answerCards.push(<br key={"br" + i}/>)
    }

    // Remove trailing br
    answerCards.splice(-1,1)

    var guesser;
    for (var i = 0; i < this.props.gameState.players.length; i++) {
      if (this.props.gameState.players[i].role === "GUESS") {
        guesser = this.props.gameState.players[i];
      }
    }

    return <div>
          <Paper className="paper"><h1>You're the reader.<br/><span className="text-highlight">{guesser.name}</span> is guessing.</h1>
          <p>Click to reveal answers</p>
          {answerCards}
          </Paper>
          <br/>
          <Button variant="contained"
            color="primary"
            fullWidth={true}
            disabled={this.state.disableSubmit}
            onClick={this.onSubmit.bind(this)}>
            {this.state.buttonText}
          </Button>
      </div>
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
  connect(mapStateToProps, mapDispatchToProps)(Answers)
);

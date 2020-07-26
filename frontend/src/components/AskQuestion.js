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

const preMadeQuestions = [
  "Given the choice of anyone in the world, whom would you want as a dinner guest?",
  "Would you like to be famous? In what way?",
  "Before making a telephone call, do you ever rehearse what you are going to say? Why?",
  "What would constitute a \"perfect\" day for you?",
  "Describe when you last sang to yourself."
];

class AskQuestion extends Component {
  constructor(props) {
    super(props);

    this.onKeyDown = this.onKeyDown.bind(this);

    this.state = {
      question: '',
      questionError: false,
    }
  }

  onQuestionChange(element) {
    this.setState({
        question: element.target.value,
        questionError: false
    });
  }

  componentDidMount(){
    document.addEventListener("keydown", this.onKeyDown, false);
  }
  componentWillUnmount(){
    document.removeEventListener("keydown", this.onKeyDown, false);
  }
  onKeyDown(event) {
    if(event.key === 'Enter'){
      this.onSubmitQuestion()
    }
  }
  onKeyPress(event) {
    if(event.key === 'Enter'){
      event.preventDefault();
    }
  }
  onSubmitQuestion() {
    if (!this.state.question) {
      this.setState({
          questionError: true
      });
      return;
    }

    document.removeEventListener("keydown", this.onKeyDown, false);

    fetch(process.env.REACT_APP_SERVER_URL + '/askQuestion', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: this.props.gameState.player.token,
        question: this.state.question
      }),
    });
  }
  onGenerateQuestionClick() {
    var needQuestion = preMadeQuestions[Math.floor(Math.random() * preMadeQuestions.length)];

    fetch(process.env.REACT_APP_SERVER_URL + '/askQuestion', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: this.props.gameState.player.token,
        question: needQuestion
      }),
    });
  }

  render() {
    return <div><Paper className="paper">
    <h1>Ask a question</h1>
    <TextField
          onKeyPress={this.onKeyPress.bind(this)}
          id="outlined-multiline-flexible"
          className="question-text"
          multiline
          rowsMax={4}
          value={this.state.question}
          error={this.state.questionError}
          onChange={this.onQuestionChange.bind(this)}
          variant="outlined"
          fullWidth={true}
        />
        </Paper>
        <br/>
        <Button variant="contained" color="primary" fullWidth={true} onClick={this.onSubmitQuestion.bind(this)}>
          Submit question
        </Button>
        <br/>
        <br/>
        <Button variant="contained" color="primary" fullWidth={true} onClick={this.onGenerateQuestionClick.bind(this)}>
          Generate Pre-Made Question
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
  connect(mapStateToProps, mapDispatchToProps)(AskQuestion)
);

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



class AnswerQuestion extends Component {
  constructor(props) {
    super(props);

    this.onKeyDown = this.onKeyDown.bind(this);

    this.state = {
      answer: '',
      answerError: false,
    }
  }

  onChange(element) {
    this.setState({
        answer: element.target.value,
        answerError: false
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
      this.onSubmit();
    }
  }
  onKeyPress(event) {
    if(event.key === 'Enter'){
      event.preventDefault();
    }
  }

  onSubmit() {
    if (!this.state.answer) {
      this.setState({
          questionError: true
      });
      return;
    }

    document.removeEventListener("keydown", this.onKeyDown, false);

    fetch('/answerQuestion', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: this.props.gameState.player.token,
        answer: this.state.answer
      }),
    })
  }

  render() {
    return <div><Paper className="paper">
    <h1>Answer</h1>
    <TextField
          onKeyPress={this.onKeyPress.bind(this)}
          id="outlined-multiline-flexible"
          multiline
          rowsMax={4}
          value={this.state.question}
          error={this.state.questionError}
          onChange={this.onChange.bind(this)}
          variant="outlined"
          fullWidth={true}
        />
        </Paper>
        <br/>
        <Button variant="contained" color="primary" fullWidth={true} onClick={this.onSubmit.bind(this)}>
          Submit answer
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
  connect(mapStateToProps, mapDispatchToProps)(AnswerQuestion)
);

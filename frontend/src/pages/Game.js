import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/actions.js';

import AskQuestion from '../components/AskQuestion.js';
import Question from '../components/Question.js';
import WaitingForAnswers from '../components/WaitingForAnswers.js';
import WaitingForNextTurn from '../components/WaitingForNextTurn.js';
import AnswerQuestion from '../components/AnswerQuestion.js';
import Answers from '../components/Answers.js';
import Results from '../components/Results.js';
import FinalResults from '../components/FinalResults.js';

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
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faBook } from '@fortawesome/free-solid-svg-icons'
import { faGlobeAmericas } from '@fortawesome/free-solid-svg-icons'


const PLAYING_STATES = [
  "ASKING", "ANSWERING", "GUESSING", "RESULTS"
]


class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gameState: {},
      openEndGameDialog: false
    }
  }



  componentDidMount() {
    if (!this.props.gameState.game) {
      this.props.history.push("/");
      return;
    }

    // TODO fetch game state
    fetch('/gameState', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: this.props.gameState.player.token
      }),
    })
  }

  onStartGameClick() {
    fetch('/startGame', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: this.props.gameState.player.token
      }),
    })
  }

  onEndGame() {
    fetch('/endGame', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: this.props.gameState.player.token
      }),
    })

    this.handleEndGameDialogClose();
  }

  handleMessage(stompMessage) {
    var newGameState = JSON.parse(stompMessage.body);
    this.props.actions.setPlayerlessGameState(newGameState);
  }

  renderMainView(leader, reader, guesser) {
    // Waiting to start
    if (this.props.gameState.game.state === "NOT_STARTED" && leader) {
      // Display waiting message
      return <Paper className="paper">
        <h1>Waiting for <span className="text-highlight">{leader.name}</span> to start the game.</h1>
        <FontAwesomeIcon className="loading" icon={faGlobeAmericas}/>
      </Paper>
    }

    // Waiting for question
    if (this.props.gameState.game.state === "ASKING" && this.props.gameState.player.role !== "GUESS") {
      // Display waiting message
      return <Paper className="paper">
        <h1><span className="text-highlight">{leader.name}</span> is asking a question.</h1>
      </Paper>
    }

    // Asking a question
    if (this.props.gameState.game.state === "ASKING" && this.props.gameState.player.role === "GUESS") {
      return <AskQuestion/>
    }

    // ANSWERING STATE
    if (this.props.gameState.game.state === "ANSWERING") {
      if (this.props.gameState.player.role === "GUESS") {
        return <div><Question/>
        <br/>
          <WaitingForAnswers/>
        </div>; // todo add waiting for
      }

      if (this.props.gameState.player.role !== "GUESS") {
        var answers = {};
        // build answer token hash
        if (this.props.gameState.game.answers) {
          for (let i = 0; i < this.props.gameState.game.answers.length; i++) {
            answers[this.props.gameState.game.answers[i].token] = true;
          }
        }

        var hasAnswered = answers[this.props.gameState.player.token];

        return <div>
        <Question/>
        <br/>
          { hasAnswered ? <div/> : <div><AnswerQuestion/><br/></div> }
          <WaitingForAnswers/>
        </div>;
      }
    }

    // GUESSING STATE
    if (this.props.gameState.game.state === "GUESSING") {
      if (this.props.gameState.player.role !== "READ") {
        return <div><Question/>
          <br/>
          <Paper className="paper">
            <h1><span className="text-highlight">{reader.name}</span> is reading the answers.<br/>
              <span className="text-highlight">{guesser.name}</span> is guessing.
            </h1>
          </Paper>
        </div>;
      }
      return <div><Question/>
        <br/>
        <Answers guesserToken={guesser.token}/>
      </div>;
    }

    // Results state
    if (this.props.gameState.game.state === "RESULTS") {
      return <div>
      <Question/>
      <br/>
      <Results/>
      <br/>
      <WaitingForNextTurn/>
      </div>
    }

    return <div/>
  }

  onEndGameClick() {
    this.setState((prevState) => {
      prevState.openEndGameDialog = true;
      return prevState;
    });
  }

  handleEndGameDialogClose() {
    this.setState((prevState) => {
      prevState.openEndGameDialog = false;
      return prevState;
    });
  }

  renderEndGameButtom(guesser) {
    if (this.props.gameState.game.state === "RESULTS" && this.props.gameState.player.token === guesser.token) {
      return <div>
      <Dialog
        open={this.state.openEndGameDialog}
        onClose={this.handleEndGameDialogClose.bind(this)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">End game</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to end the game?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleEndGameDialogClose.bind(this)} color="primary">
            NO
          </Button>
          <Button onClick={this.onEndGame.bind(this)} color="primary" autoFocus>
            YES
          </Button>
        </DialogActions>
      </Dialog>

      <Button variant="contained" color="primary" fullWidth={true} onClick={this.onEndGameClick.bind(this)}>
        End game
      </Button>
      </div>
    }

    return null;
  }

  render() {
    if (!this.props.gameState.game) {
      return <div/>
    }

    if (this.props.gameState.game.state === "FINAL_RESULTS") {
      return <FinalResults />
    }

    let players = [];
    var leader;
    var reader;
    var guesser;
    for(let i = 0; i < this.props.gameState.players.length; i++) {
      if (this.props.gameState.players[i].isLeader) {
        leader = this.props.gameState.players[i];
      }

      if (this.props.gameState.players[i].role === "GUESS") {
        guesser = this.props.gameState.players[i];
      } else if (this.props.gameState.players[i].role === "READ") {
        reader = this.props.gameState.players[i];
      }

      var iconElement = null;
      if (this.props.gameState.game.state === "NOT_STARTED" && this.props.gameState.players[i].isLeader) {
        iconElement = <FontAwesomeIcon className="player-icon" icon={faStar} />
      } else if (PLAYING_STATES.indexOf(this.props.gameState.game.state) > -1 && this.props.gameState.players[i].role === "READ") {
        iconElement = <FontAwesomeIcon className="player-icon" icon={faBook} />
      } else if (PLAYING_STATES.indexOf(this.props.gameState.game.state) > -1 && this.props.gameState.players[i].role === "GUESS") {
        iconElement = <FontAwesomeIcon className="player-icon" icon={faArrowRight} />
      } else {
        iconElement = <span className="icon-placeholder"/>
      }

      var score = <span/>;
      if (this.props.gameState.game.state !== "NOT_STARTED") {
        score = <span className="player-score">{this.props.gameState.players[i].score}</span>; // TODO add the score here
      }

      var playerRowClass = this.props.gameState.players[i].token === this.props.gameState.player.token ? "player-row text-highlight" : "player-row";

      players.push(
        <div key={i} className={playerRowClass}>
        {iconElement}
        <span className="player-name">{this.props.gameState.players[i].name}</span>
        {score}
        </div>
      );
    }

    var mainView = this.renderMainView(leader, reader, guesser);

    var endGameButton = this.renderEndGameButtom(guesser);

    return <StompClient
        endpoint="ws://localhost:8080/socket/gs-guide-websocket"
        topic={"topic/greetings/" + this.props.gameState.game.code}
        onMessage={this.handleMessage.bind(this)}
      >
      <div>
      <Grid container spacing={2}>
        <Grid item xs={1}>
        </Grid>
        <Grid item xs={3}>
          <Paper className="paper">
            <h1 className="players-title">Players</h1>
            <div className="players-list">
            {players}
            </div>

            {this.props.gameState.player.isLeader && this.props.gameState.game.state === "NOT_STARTED" ?
              <Button variant="contained" color="primary" fullWidth={true} onClick={this.onStartGameClick.bind(this)}>
                Start game
              </Button>
               : <div/>}
          </Paper>

          <br/>
          <Paper className="paper">
          <div>Code: {this.props.gameState.game.code}</div>
          </Paper>
          <br/>
          {endGameButton}

        </Grid>

        <Grid item xs={7}>
          {mainView}
        </Grid>
      </Grid>
    </div>
    </StompClient>
  }
}

function mapStateToProps(state) {
  console.log("REDUX");
  console.log(state);

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
  connect(mapStateToProps, mapDispatchToProps)(Game)
);

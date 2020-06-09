import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Cookies from 'universal-cookie';
import config from '../config.js';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/actions.js';

const classes = makeStyles();

class Join extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      nameError: false,
      code: '',
      codeError: false
    }
  }

  onNameChange(element) {
    this.setState({
        name: element.target.value,
        nameError: false
    });
  }

  onCodeChange(element) {
    var error = false;
    if (element.target.value.length > 4) {
      error = true;
    }

    this.setState({
        code: element.target.value,
        codeError: error
    });
  }

  onJoinClick() {
    if (!this.state.name || !this.state.code) {
      this.setState((prevState) => {
        prevState.nameError = !this.state.name;
        prevState.codeError = !this.state.code;
        return prevState;
      });
      return;
    }

    // Make backend request to create game and then redirect to /game
    fetch(process.env.REACT_APP_SERVER_URL + '/joinGame', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.name,
        code: this.state.code
      }),
    })

    .then(response => {
      const statusCode = response.status;
      const data = response.json();
      return Promise.all([statusCode, data]);
    })
    .then(response => {
      if (response[0] == 404) {
        this.setState((prevState) => {
          prevState.codeError = true
          return prevState;
        });
      } else {
        // Save game state
        this.props.actions.setGameState(response[1]);

        // Transition to Game page
        this.props.history.push("/game");
      }
    });
  }

  render() {
    return <div className={classes.root}>
    <Grid container spacing={3}>
        <Grid item xs={4}/>
      <Grid item xs={4}>
        <TextField id="outlined-basic" label="Code" variant="outlined" fullWidth={true}
        vale={this.state.code}
        onChange={this.onCodeChange.bind(this)}
        error={this.state.codeError}
        />
      </Grid>
      <Grid item xs={4}/>


        <Grid item xs={4}/>
      <Grid item xs={4}>
        <TextField id="outlined-basic" label="Name" variant="outlined" fullWidth={true}
        value={this.state.name}
        onChange={this.onNameChange.bind(this)}
        error={this.state.nameError}
        />
      </Grid>
      <Grid item xs={4}/>

      <Grid item xs={4}/>
        <Grid item xs={4}>
          <Button variant="contained" color="primary" fullWidth={true} onClick={this.onJoinClick.bind(this)}>
            Join
          </Button>
        </Grid>
        <Grid item xs={4}/>
      </Grid>
    </div>
  }
}

function mapDispatchToProps(dispatch) {
  return {
    	actions: bindActionCreators(actions, dispatch)
    };
}

export default withRouter(
  connect(null, mapDispatchToProps)(Join)
);

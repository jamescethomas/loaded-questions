import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/actions.js';

const classes = makeStyles();

class Create extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      nameError: false
    }
  }

  onNameChange(element) {
    this.setState({
        name: element.target.value,
        nameError: false
    });
  }

  onCreateClick() {
    if (!this.state.name) {
      this.setState((prevState) => {
        prevState.nameError = true;
        return prevState;
      });
      return;
    }

    // Make backend request to create game and then redirect to /game
    fetch('/createGame', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.name
      }),
    })
    .then(res => res.json())
    .then(body => {
      // Save game state
      this.props.actions.setGameState(body);

      // Transition to Game page
      this.props.history.push('/game');
      console.log(body);
    });
  }

  render() {
    return <div className={classes.root}>
    <Grid container spacing={3}>
        <Grid item xs={4}/>
      <Grid item xs={4}>
        <TextField id="outlined-basic"
          label="Name"
          variant="outlined"
          fullWidth={true}
          value={this.state.name}
          onChange={this.onNameChange.bind(this)}
          error={this.state.nameError}/>
      </Grid>
      <Grid item xs={4}/>

      <Grid item xs={4}/>
        <Grid item xs={4}>
          <Button variant="contained" color="primary" fullWidth={true} onClick={this.onCreateClick.bind(this)}>
            Create
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
  connect(null, mapDispatchToProps)(Create)
);

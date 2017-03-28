import React, {Component} from 'react';
import PatientHome from './PatientHome'
import VideoPlayer from './VideoPlayer'
import {BASE_URL, userID} from './helpers.js';
import axios from 'axios';

class PatientWrapper extends Component {
  constructor(props) {
    super(props)

    this.state = {
      videoIDs: '',
      videoIdx: 0
    }
  }

  componentWillMount(){
    var self = this;
    axios.get(`${BASE_URL}/api/users/${userID()}/assessments/1`)
    .then(function (response) {
      self.setState({videoIDs: response.data.screens});
    })
  }

  render() {
    return(
      <PatientHome videosLength={this.state.videoIDs.length}>
        <p>Welcome! You will watch short videos and answer questions about yourself. <br />Please read the instructions carefully. You will have 30 seconds to respond to each question. <br />Your answers will be recorded so please speak OUT LOUD when responding. <br /><br />Please press the spacebar when you are ready to go forward</p>
        <p>You will now watch several short video clips. <br />After each video, you will be asked questions  about what happened in the video. <br />You will have 30 secons  to answer each question. <br />Please speak out loud and keep speaking until the time runs out. <br /><br />When you are ready, please press the spacebar to continue.</p>
        <p>When you are ready, please press the spacebar to continue to the video.</p>
        <VideoPlayer videos={this.state.videoIDs} />
        <p>Please describe what happened in the video. <br />Use as much detail as possible when describing the video. <br />You have 30 seconds. Please try to talk for the entire duration of the timer.<br /><br />Please press the spacebar when you are ready to start.</p>
        <p>Timer</p>
        <p>Bye!</p>
      </PatientHome>
    )
  }
}

export default PatientWrapper;

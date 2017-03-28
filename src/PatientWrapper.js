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
    axios.get(`${BASE_URL}/api/users/${userID()}/assessments/21`)
    .then(function (response) {
      self.setState({videoIDs: response.data.screens});
    })
  }

  render() {
    return(
      <PatientHome videosLength={this.state.videoIDs.length}>
        <p>this is the first instructional message Press Space Bar to Continue</p>
        <p>this is the second instructional message Press Space Bar to Continue</p>
        <p>Please Watch the Video</p>
        <VideoPlayer videos={this.state.videoIDs} />
        <p>Answer the Question</p>
        <p>Timer</p>
        <p>Bye!</p>
      </PatientHome>
    )
  }
}

export default PatientWrapper;

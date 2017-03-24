import React, {Component} from 'react';
import PatientHome from './Patient'
import VideoPlayer from './VideoPlayer'
import {BASE_URL} from './helpers.js';
import axios from 'axios';

class PatientWrapper extends Component {
  constructor(props) {
    super(props)

    this.state = {
      videoIds: '',
      videoIdx: 0
    }

  }

  componentWillMount(){
    var self = this;
    axios.get(`${BASE_URL}/api/assessments/21`).then(function (response) {
      self.setState({videoIds: response.data.screens});
    })
  }

  render() {
    return(
      <PatientHome videosLength={this.state.videoIds.length}>
        <p>this is the first instructional message Press Space Bar to Continue</p>
        <p>this is the second instructional message Press Space Bar to Continue</p>
        <p>Please Watch the Video</p>
        <VideoPlayer videos={this.state.videoIds} />
        <p>Answer the Question</p>
        <p>Timer</p>
        <p>Bye!</p>
      </PatientHome>
    )
  }

}

export default PatientWrapper;

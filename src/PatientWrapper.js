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
    axios.get(`${BASE_URL}/api/assessments/13`).then(function (response) {
      self.setState({videoIds: response.data.screens});
    })
  }

  render() {
    return(
      <PatientHome>
        <p>this is the first instructional message Press Space Bar to Continue</p>
        <p>this is the second instructional message Press Space Bar to Continue</p>
        <p>Instructions</p>
        <VideoPlayer video={this.state.videoIds[this.state.videoIdx]} />
        <p>Instructions</p>
        <p>Test</p>
        <p>Bye!</p>
      </PatientHome>
    )
  }

}

export default PatientWrapper;

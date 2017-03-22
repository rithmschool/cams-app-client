import React, {Component} from 'react';
import PatientHome from './Patient'
import VideoPlayer from './VideoPlayer'

class PatientWrapper extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <PatientHome>
        <p>this is the first instructional message Press Space Bar to Continue</p>
        <p>this is the second instructional message Press Space Bar to Continue</p>
        <p>Instructions</p>
        <VideoPlayer />
        <p>Instructions</p>
        <p>Test</p>
        <p>Bye!</p>
      </PatientHome>
    )
  }

}

export default PatientWrapper;
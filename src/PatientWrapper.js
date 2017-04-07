import React, {Component} from 'react';
import PatientHome from './PatientHome'
import VideoPlayer from './VideoPlayer'
import VideoViewer from './VideoViewer'
import TimerWrapper from './TimerWrapper'
import {BASE_URL, userID, BrowserDetect} from './helpers.js';
import axios from 'axios';

const Text = props => <p className="lg">{props.children}</p>

class PatientWrapper extends Component {
  constructor(props) {
    super(props)

    this.state = {
      videoIDs: '',
      assessment_id: 0,
      token: '',
      src: null
    }
  }

  captureUserMedia(callback) {
    let params = {audio: true, video: true};
    navigator.getUserMedia(params, callback, (error) => {
      alert(JSON.stringify(error));
    });
  };

  requestUserMedia() {
    this.captureUserMedia(stream => {
      this.setState({ src: window.URL.createObjectURL(stream) });
    });
  }

  componentDidMount() {
    this.requestUserMedia();
  }

  componentWillMount(){
    var self = this;
    var data = window.location.href.split('?')[1]
    var data_obj = JSON.parse(
              '{"' + 
              decodeURI(data).replace(/"/g, '\\"')
              .replace(/&/g, '","')
              .replace(/=/g,'":"') + '"}'
          )
    var doctor_id = data_obj['doctor_id']
    var assessment_id = data_obj['assessment_id']
    var token = data_obj['token']
    self.setState({assessment_id: assessment_id});
    self.setState({token: token})
    if(assessment_id && token){
      axios.get(`${BASE_URL}/api/users/${doctor_id}/assessments/${assessment_id}`, {token: token}).then(function (response) {
        self.setState({videoIDs: response.data.screens});
      })
    }
  }


  render() {
    BrowserDetect.init()
    let display = BrowserDetect.browser === 'Chrome' ? (
      <PatientHome videosLength={this.state.videoIDs.length} assessment_id={this.state.assessment_id}>
        <Text>Welcome! You will watch short videos and answer questions about yourself. <br />Please read the instructions carefully. You will have 30 seconds to respond to each question. <br />Your answers will be recorded so please speak OUT LOUD when responding. <br /><br />Please press the spacebar when you are ready to go forward</Text>
        <VideoViewer src={this.state.src} />
        <Text>You will now watch several short video clips. <br />After each video, you will be asked questions  about what happened in the video. <br />You will have 30 secons  to answer each question. <br />Please speak out loud and keep speaking until the time runs out. <br /><br />When you are ready, please press the spacebar to continue.</Text>
        <Text>When you are ready, please press the spacebar to continue to the video.</Text>
        <VideoPlayer videos={this.state.videoIDs} />
        <Text>Please describe what happened in the video. <br />Use as much detail as possible when describing the video. <br />You have 30 seconds. Please try to talk for the entire duration of the timer.<br /><br />Please press the spacebar when you are ready to start.</Text>
        <TimerWrapper></TimerWrapper>
        <Text>Bye!</Text>
      </PatientHome> 
    ) : (
      <PatientHome videosLength={this.state.videoIDs.length} assessment_id={this.state.assessment_id}>
        <Text>Browser not supported. Please switch to <a href="https://www.google.com/chrome/browser/desktop/index.html">Google Chrome</a> to proceed.</Text>
        <VideoPlayer videos={this.state.videoIDs} />
        <TimerWrapper></TimerWrapper>
      </PatientHome>
    )
    return(
      <div>
        {display}
      </div>
    )
  }
}

export default PatientWrapper;

import React, {Component} from 'react';
import PatientHome from './PatientHome'
import {BASE_URL, BrowserDetect} from './helpers.js';
import axios from 'axios';

class PatientWrapper extends Component {
  constructor(props) {
    super(props)

    this.state = {
      screens: [],
      assessment_id: 0,
      token: '',
      src: null,
      screenCount: 0
    }
  }

  captureUserMedia(callback) {
    let params = {audio: true, video: true};
    navigator.getUserMedia(params, callback, (error) => {
      alert(JSON.stringify(error));
    });
  };

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
        self.setState({
          screens: response.data.screens,
          screenCount: response.data.screens.reduce((prev, curScreen) => (
            prev + (curScreen.type === 'video' ? 3 : 2)
          ), 3)
        });
      })
    }
  }

  render() {
    BrowserDetect.init()
    let display = BrowserDetect.browser === 'Chrome' ? (
      <PatientHome 
        screens={this.state.screens} 
        screenCount={this.state.screenCount}
        assessment_id={this.state.assessment_id}
      />
    ) : (
      <p>Browser not supported. Please switch to <a href="https://www.google.com/chrome/browser/desktop/index.html">Google Chrome</a> to proceed.</p>
    )
    return(
      <div>
        {display}
      </div>
    )
  }
}

export default PatientWrapper;

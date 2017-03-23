import React, {Component} from 'react';
import RecordRTC from 'recordrtc';
import {BASE_URL} from './helpers.js';
import axios from 'axios';
var Whammy = RecordRTC.Whammy;
var video = new Whammy.Video(100);
var recordRTC;

class PatientHome extends Component {

  constructor(props) {
    super(props)
    this.state = {
      idx: 0,
      videoIdx:1,
	    recordVideo: null,
	    src: null,
	    uploadSuccess: null,
	    uploading: false
    }
    this.handleSpaceBar = this.handleSpaceBar.bind(this)
	  this.startRecord = this.startRecord.bind(this);
	  this.stopRecord = this.stopRecord.bind(this);
  }

	captureUserMedia(callback) {
		let params = {audio: true, video: true};
		navigator.getUserMedia(params, callback, (error) => {
			alert(JSON.stringify(error));
		});
	};

	startRecord() {
		this.captureUserMedia((mediaStream) => {
			var options = {
				mimeType: 'video/webm',
				audioBitsPerSecond: 128000,
				videoBitsPerSecond: 128000
			};
			recordRTC = RecordRTC(mediaStream, options)
			recordRTC.startRecording()
		});
		setTimeout(() => {
			this.stopRecord();
		}, 4000);
	}

	stopRecord() {
		let recordedBlob;
		recordRTC.stopRecording(function(){
			let fd = new FormData();
			recordedBlob = recordRTC.getBlob();
			fd.append('fname', 'video_' + Date.now() + '.webm');
			fd.append('file', recordedBlob)
			axios.post(`${BASE_URL}/api/recording`, fd).then(response => {
			})
		});
	}

  handleSpaceBar(event) {
    if (event.keyCode === 32) {
      event.preventDefault()
      if(this.state.videoIdx <=  this.props.videosLength){
        if(this.state.idx === 2){
          this.startRecord()
        }
        if(this.state.idx === 5 && this.state.videoIdx === this.props.videosLength){
          this.setState({idx: 6})
          this.stopRecord()
        }else if(this.state.idx <= 4){
          this.setState({idx: ++this.state.idx})
        } else if (this.state.idx === 5 && this.state.videoIdx !== this.props.videosLength){
          this.setState({idx: 2, videoIdx: ++this.state.videoIdx})
        }
      }
    }
  }

  render() {
    document.addEventListener("keydown", this.handleSpaceBar)
    return (
      <div>
        <h1>Welcome Patient</h1>
      <div>{this.props.children[this.state.idx]}</div>
      </div>
    )
  }
}

export default PatientHome;

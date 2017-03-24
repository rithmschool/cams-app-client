import React, {Component} from 'react';
import RecordRTC from 'recordrtc';
import {BASE_URL} from './helpers.js';
import axios from 'axios';
let Whammy = RecordRTC.Whammy;
let video = new Whammy.Video(100);
let recordRTC;

class PatientHome extends Component {

	constructor(props) {
		super(props)
		this.state = {
			idx: 0,
			videoIdx: 1,
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
	}

	stopRecord() {
		let recordedBlob;
		recordRTC.stopRecording(function () {
			let fd = new FormData();
			recordedBlob = recordRTC.getBlob();
			fd.append('fname', 'video_' + Date.now() + '.webm');
			fd.append('file', recordedBlob)
			axios.post(`${BASE_URL}/api/recording`, fd).then(response => {
			}).catch(err => {
				console.log(err)
			})
		});
	}

	handleSpaceBar(event) {
		if (event.keyCode === 32) {
			event.preventDefault()
			// If the current video index is less than the length of the playlist
			if (this.state.videoIdx <= this.props.videosLength) {
				//If the first two instructional videos have completed and the video component has rendered start the recording
				if (this.state.idx === 2) {
					this.startRecord()
				}
				//If the timer for the question response has completed and we have made it through all the videos in the
				//stop recording and send the recording file
				if (this.state.idx === 5 && this.state.videoIdx === this.props.videosLength) {
					this.setState({idx: 6})
					this.stopRecord()
					// Keep cycling through the components until we reach the timer
				} else if (this.state.idx <= 4) {
					this.setState({idx: ++this.state.idx})
					//If we reach the timer and we are not on the last video in the playlist then go to the next video in the
					//playlist's instructions.
				} else if (this.state.idx === 5 && this.state.videoIdx !== this.props.videosLength) {
					this.setState({idx: 2, videoIdx: ++this.state.videoIdx})
				}
			}
		}
	}

  render() {
    document.addEventListener("keydown", this.handleSpaceBar)
    return (
      <div>
        <div className="banner-text">
          <h1 className="banner-bold">Patient</h1>
        </div>
        <div className="content">
          <div>
            <div>{this.props.children[this.state.idx]}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default PatientHome;

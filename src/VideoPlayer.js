import React, {Component} from 'react';
import YouTube from 'react-youtube';
import RecordRTC from 'recordrtc';
import {BASE_URL} from './helpers.js';
import axios from 'axios';
var Whammy = RecordRTC.Whammy;
var video = new Whammy.Video(100);
var recordRTC;

class VideoPlayer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			recordVideo: null,
			src: null,
			uploadSuccess: null,
			uploading: false
		};
		this.startRecord = this.startRecord.bind(this);
		this.stopRecord = this.stopRecord.bind(this);
	}

	_onReady(event) {
		// access to player in all event handlers via event.target
		event.target.playVideo();
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

	componentDidMount(){
		this.startRecord()
	}

	render() {
		const opts = {
			height: '390',
			width: '640',
			playerVars: { // https://developers.google.com/youtube/player_parameters
				autoplay: 1
			}
		};
		return (
			<YouTube
				videoId={this.props.video.url}
				opts={opts}
				onReady={this._onReady}
			/>
		)
	}
}

export default VideoPlayer;

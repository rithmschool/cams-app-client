import React, {Component} from 'react';
import RecordRTC from 'recordrtc';
import {BASE_URL} from './helpers.js';
import axios from 'axios';
import Timeline from './horizontal-timeline/Timeline';
import VideoPlayer from './VideoPlayer';
import VideoViewer from './VideoViewer';
import TimerWrapper from './TimerWrapper';

let recordRTC;

const Text = props => <div className="lg">{props.children}</div>

const QuestionView = props => <p>{props.text}</p>

class PatientHome extends Component {

  constructor(props) {
    super(props)
    this.state = {
      idx: 0,
      src: null,
      keyBoardEnabled: true,
      stream: ''
    }
    this.handleSpaceBar = this.handleSpaceBar.bind(this)
    this.startRecord = this.startRecord.bind(this);
    this.stopRecord = this.stopRecord.bind(this);
    this.toggle = this.toggle.bind(this)
  }

  captureUserMedia(callback) {
    let params = {audio: true, video: true};
    navigator.getUserMedia(params, callback, (error) => {
      alert(JSON.stringify(error));
    });
  }

  requestUserMedia() {
    this.captureUserMedia(stream => {
      this.setState({ src: window.URL.createObjectURL(stream) });
    });
  }

  startRecord() {
    this.captureUserMedia((mediaStream) => {
      this.setState({
        stream: mediaStream
      })
      var options = {
        mimeType: 'video/webm;codecs=H264',
        audioBitsPerSecond: 128000,
        videoBitsPerSecond: 512000
      };
      recordRTC = RecordRTC(mediaStream, options)
      recordRTC.startRecording()
    });
  }

  stopRecord() {
    let recordedBlob;
    recordRTC.stopRecording(() => {
      let fd = new FormData();
      recordedBlob = recordRTC.getBlob();
      fd.append('assessment_id', this.props.assessment_id)
      fd.append('fname', 'video_' + Date.now() + '.mp4');
      fd.append('file', recordedBlob)
      axios.post(`${BASE_URL}/api/recording`, fd)
        .then(r => null)
        .catch(err => {
          console.log(err)
        });
    });
    this.stopMedia()
  }

  stopMedia() {
    this.state.stream.getTracks()[1].stop()
    this.state.stream.getTracks()[0].stop()
  }

  handleSpaceBar(e) {
    if (e.keyCode === 32 && this.state.keyBoardEnabled) {
      e.preventDefault()
      if (this.state.idx === 2) {
        this.startRecord()
      }

      this.setState({idx: ++this.state.idx}, () => {
        if (this.state.idx === this.props.screenCount) {
          this.stopRecord();
        }
      })
    }
  }

  toggle(){
    this.setState({
      keyBoardEnabled: !this.state.keyBoardEnabled
    })
  }

  componentDidMount() {
    window.focus()
    document.addEventListener("keydown", this.handleSpaceBar)
    this.requestUserMedia();
  }

  render() {
    let screens = [
      <Text>
        <p>Welcome! You will watch short videos and answer questions about yourself.</p> 
        <p>Please read the instructions carefully. You will have 30 seconds to respond to each question.</p>
        <p>Your answers will be recorded so please speak OUT LOUD when responding.</p>
        <p>Please press the spacebar when you are ready to go forward.</p>
      </Text>,
      <VideoViewer src={this.state.src} />,
      <Text>
        <p>You will now watch several short video clips.</p>
        <p>After each video, you will be asked questions about what happened in the video.</p> 
        <p>You will have 30 seconds to answer each question.</p>
        <p>Please speak out loud and keep speaking until the time runs out.</p>
        <p>When you are ready, please press the spacebar to continue.</p>
      </Text>
    ]
    screens = this.props.screens.reduce((prev, screenData) => (
      prev.concat(screenData.type === "video" ? [
        <VideoPlayer toggle={this.toggle} videoId={screenData.youtube_id}/>,
        <Text>
          <p>Please describe what happened in the video.</p>
          <p>Use as much detail as possible when describing the video.</p>
          <p>You have 30 seconds. Please try to talk for the entire duration of the timer.</p>
          <p>Please press the spacebar when you are ready to start.</p>
        </Text>,
        <TimerWrapper toggle={this.toggle}/>
      ] : [
        <QuestionView text={screenData.title}/>,
        <TimerWrapper toggle={this.toggle}/>
      ])
    ), screens)
    screens.push(
      <Text>
        <p>Thank you for participating in CAMS!</p>
      </Text>
    )
    return (
      <div className="content">
        {screens[this.state.idx]}
        <Timeline valuesLength={screens.length} keyBoardEnabled={this.state.keyBoardEnabled}></Timeline>
      </div>
    )
  }
}

export default PatientHome;

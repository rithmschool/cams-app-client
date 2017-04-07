import React, {Component} from 'react';
import RecordRTC from 'recordrtc';
import {BASE_URL} from './helpers.js';
import axios from 'axios';
import Timer from './Timer';
import Timeline from './horizontal-timeline/Timeline';


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
      uploading: false,
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
  };


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
  };

  handleSpaceBar(e) {
    if (e.keyCode === 32 && this.state.keyBoardEnabled) {
      e.preventDefault()
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

  toggle(){
    this.setState({
      keyBoardEnabled: !this.state.keyBoardEnabled
    })
  }

  componentDidMount() {
    window.focus()
    document.addEventListener("keydown", this.handleSpaceBar)
  }

  render() {
    return (
      <div>
        <div className="content">
          <div>
            <div>{React.cloneElement(this.props.children[this.state.idx], {
                  videoIdx: this.state.videoIdx - 1,
                  toggle: this.toggle
                })}
            </div>
          </div>
          <Timeline keyBoardEnabled={this.state.keyBoardEnabled}></Timeline>
        </div>
      </div>
    )
  }
}

export default PatientHome;

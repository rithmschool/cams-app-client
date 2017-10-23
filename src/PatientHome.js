import React, { Component } from "react";
import RecordRTC from "recordrtc";
import { connect } from "react-redux";
import { uploadRecordRequest } from "./store/actions/actionCreators";
import HorizontalTimeline from "./horizontal-timeline/HorizontalTimeline";
import AudioPlayer from "./AudioPlayer";
import VideoPlayer from "./VideoPlayer";
import VideoViewer from "./VideoViewer";
import TimerWrapper from "./TimerWrapper";
import PatientScreenWrapper from "./PatientScreenWrapper";
import VideoInstructions from "./VideoInstructions";
import WelcomeScreen from "./WelcomeScreen";
import PlaylistInstructions from "./PlaylistInstructions";
import "./PatientHome.css";
import PropTypes from "prop-types";
import Error from "./Error";

let recordRTC;

class PatientHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idx: 0,
      src: null,
      keyBoardEnabled: true,
      stream: "",
      cameraEnabled: true,
      screens: []
    };
    this.handleSpaceBar = this.handleSpaceBar.bind(this);
    this.startRecord = this.startRecord.bind(this);
    this.stopRecord = this.stopRecord.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.screens.length === 0) {
      let screens = [
        <WelcomeScreen />,
        <VideoViewer src={this.state.src} />,
        <AudioPlayer />,
        <PlaylistInstructions />
      ];
      screens = nextProps.assessment.screens.reduce(
        (prev, screenData) =>
          prev.concat(
            screenData.type === "video"
              ? [
                  <VideoPlayer toggle={this.toggle} url={screenData.url} />,
                  <VideoInstructions />,
                  <TimerWrapper toggle={this.toggle} />
                ]
              : [
                  <p>{screenData.title}</p>,
                  <TimerWrapper
                    title={screenData.title}
                    toggle={this.toggle}
                    timer={screenData.timer}
                  />
                ]
          ),
        screens
      );
      screens.push(
        <div className="lg">
          <p>Thank you for participating in CAMS!</p>
        </div>
      );
      this.setState({ screens: screens });
    }
  }

  captureUserMedia(callback) {
    let params = { audio: true, video: true };
    navigator.getUserMedia(params, callback, error => {
      this.setState({
        cameraEnabled: false
      });
    });
  }

  requestUserMedia() {
    this.captureUserMedia(stream => {
      this.setState({ src: window.URL.createObjectURL(stream) });
    });
  }

  startRecord() {
    this.captureUserMedia(mediaStream => {
      this.setState({
        stream: mediaStream
      });
      var options = {
        mimeType: "video/webm;codecs=H264",
        audioBitsPerSecond: 128000,
        videoBitsPerSecond: 512000
      };
      recordRTC = RecordRTC(mediaStream, options);
      recordRTC.startRecording();
    });
  }

  stopRecord() {
    let recordedBlob;

    recordRTC.stopRecording(() => {
      recordedBlob = recordRTC.getBlob();
      this.props.uploadRecord(recordedBlob);
    });
    this.stopMedia();
  }

  stopMedia() {
    this.state.stream.getTracks()[1].stop();
    this.state.stream.getTracks()[0].stop();
  }

  handleSpaceBar(e) {
    if (e.keyCode === 32 && this.state.keyBoardEnabled) {
      e.preventDefault();
      if (this.state.idx === 2) {
        this.startRecord();
      }

      this.setState({ idx: this.state.idx + 1 }, () => {
        if (this.state.idx === this.state.screens.length) {
          this.stopRecord();
        }
      });
    }
  }

  toggle() {
    this.setState({
      keyBoardEnabled: !this.state.keyBoardEnabled
    });
  }

  componentDidMount() {
    window.focus();
    document.addEventListener("keydown", this.handleSpaceBar);
    this.requestUserMedia();
  }

  render() {
    const { cameraEnabled, screens, keyBoardEnabled, idx } = this.state;
    let result = null;

    if (!cameraEnabled) {
      result = (
        <div className="patient-home">
          <Error msg="Whoops, seems like your camera isn't working!" />
        </div>
      );
    } else if (screens.length > 0) {
      result = (
        <div className="patient-home">
          <div>
            <HorizontalTimeline
              numScreens={screens.length}
              keyBoardEnabled={keyBoardEnabled}
              linePadding={100}
              minEventPadding={20}
              maxEventPadding={120}
              containerWidth={800}
              containerHeight={100}
            />
            <PatientScreenWrapper
              className="screens"
              screens={screens}
              handleSpaceBar={this.handleSpaceBar}
              idx={idx}
            />
          </div>
        </div>
      );
    }
    return result;
  }
}

PatientHome.propTypes = {
  uploadRecord: PropTypes.func,
  assessment: PropTypes.shape({
    current_screen: PropTypes.number,
    id: PropTypes.number,
    playlist_id: PropTypes.number,
    recording_url: PropTypes.string,
    screens: PropTypes.arrayOf(
      PropTypes.shape({
        duration: PropTypes.string,
        type: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        url: PropTypes.string,
        title: PropTypes.string.isRequired
      })
    )
  })
};

const mapStateToProps = function(state) {
  return {
    assessment: state.assessment
  };
};

const mapDispatchToProps = dispatch => {
  return {
    uploadRecord: fd => dispatch(uploadRecordRequest(fd))
  };
};

export { PatientHome };
export default connect(mapStateToProps, mapDispatchToProps)(PatientHome);

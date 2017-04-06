import React, {Component} from 'react';   

class VideoViewer extends Component {

	constructor(props) {
    super(props)
    this.state = {
      src: null,
      stream: ''
    }
  }

	captureUserMedia(callback) {
    let params = {audio: true, video: true};
    navigator.getUserMedia(params, callback, (error) => {
      alert(JSON.stringify(error));
    });
  };

  requestUserMedia() {  
  this.captureUserMedia((stream) => {
    this.setState({ src: window.URL.createObjectURL(stream) });
    });
  }

  componentDidMount() {
    this.requestUserMedia();
  }

  render() {
    return (
      <div>
      <video src={this.state.src} id="videoElement" autoPlay="true"/>
      <p>Please take this time to look at the video viewer to make sure it is positioned on your face. 
      <br/> Please adjust lighting so your face is clearly visible.
      <br /><br />Please press the spacebar when you are ready to go forward</p>
      </div> 
    )
  }


}

export default VideoViewer;
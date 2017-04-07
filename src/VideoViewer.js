import React, {Component} from 'react';   

class VideoViewer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      src: null
    }
  }

  render() {
    return (
      <div className="lg">
        <video src={this.props.src} id="videoElement" autoPlay="true"/>
        <p>Please take this time to look at the video viewer to make sure it is positioned on your face.</p> 
        <p> Please adjust lighting so your face is clearly visible.</p>
        <p>Please press the spacebar when you are ready to go forward</p>
      </div> 
    )
  }
}

export default VideoViewer;

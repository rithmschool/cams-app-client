import React, {Component} from 'react';
import YouTube from 'react-youtube';

class VideoPlayer extends Component {

  _onReady(event) {
      event.target.pauseVideo();
  }

  render() {
    const opts = {
      height: '390',
      width: '640',
      playerVars: {
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

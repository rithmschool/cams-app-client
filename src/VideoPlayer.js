import React, {Component} from 'react';
import YouTube from 'react-youtube';

class VideoPlayer extends Component {
  constructor(props) {
    super(props)

  }

  _onReady(event) {
      // access to player in all event handlers via event.target
      event.target.pauseVideo();
  }

  render() {
    console.log(this.props.video.url)
    const opts = {
      height: '390',
      width: '640',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    };
    return (
      <YouTube
        videoId= {this.props.video.url}
        opts={opts}
        onReady={this._onReady}
      />
    )
  }
}

export default VideoPlayer;

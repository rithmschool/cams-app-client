import React, {Component} from 'react';
import YouTube from 'react-youtube';

class VideoPlayer extends Component {

  _onReady(e) {
    // access to player in all event handlers via event.target
    e.target.playVideo();
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
      <div>
        <YouTube
          videoID={this.props.videos[this.props.videoIdx].youtube_id}
          opts={opts}
          onReady={this._onReady}
        />
      </div>
    )
  }
}

export default VideoPlayer;

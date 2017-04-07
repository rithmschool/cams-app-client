import React, {Component} from 'react';
import YouTube from 'react-youtube';

class VideoPlayer extends Component {
  constructor(props){
    super(props);
    this._onEnd = this._onEnd.bind(this)
  }

  _onReady(e) {
    // access to player in all event handlers via event.target
    e.target.playVideo();
  }

  _onEnd(e){
    e.target.stopVideo();
    this.props.toggle();
  }

  componentDidMount(){
    this.props.toggle();
  }

  render() {
    const opts = {
      height: '562.5',
      width: '1000',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
        controls: 0,
        rel: 0
      }
    };
    return (
      <div>
        <YouTube
          videoId={this.props.videoId}
          opts={opts}
          onReady={this._onReady}
          onEnd={this._onEnd}
        />
        <p className="lg">Press the space key to move on once the video has ended </p>
      </div>
    )
  }
}

export default VideoPlayer;

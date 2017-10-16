import React, { Component } from "react";
import AudioSignalMeter from "./AudioSignalMeter";
import count from "./images/count_to_ten.mp3";
import "./AudioPlayer.css";

class AudioPlayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      audio: null
    };

    this.setAudio = this.setAudio.bind(this);
  }

  setAudio(audio) {
    if (!this.state.audio) {
      this.setState({ audio: audio });
    }
  }

  render() {
    return (
      <div className="lg">
        <p>
          Please adjust the volume on your computer until you can clearly hear
          the sound playing on this page.
        </p>
        <audio src={count} autoPlay ref={this.setAudio} />

        {this.state.audio ? (
          <AudioSignalMeter count={count} audio={this.state.audio} />
        ) : null}
      </div>
    );
  }
}

export default AudioPlayer;

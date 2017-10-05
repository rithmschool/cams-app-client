import React, { Component } from "react";
import PropTypes from "prop-types";

class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoEnded: false
    };
    this.onEnd = this.onEnd.bind(this);
  }

  onEnd() {
    this.props.toggle();
    this.setState({
      videoEnded: true
    });
  }

  componentDidMount() {
    this.props.toggle();
    this.setState({
      videoEnded: false
    });
  }

  render() {
    const endText = this.state.videoEnded ? (
      <p className="lg">Press the space key to move on </p>
    ) : null;
    return (
      <div>
        <video
          autoPlay="true"
          height="450px"
          width="750px"
          src={this.props.url}
          onEnded={this.onEnd}
        />
        {endText}
      </div>
    );
  }
}

VideoPlayer.propTypes = {
  toggle: PropTypes.func.isRequired
};

export default VideoPlayer;

import React, { Component } from "react";
import Timer from "./Timer";
import PropTypes from "prop-types";

class TimerWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: props.timer || 30,
      timerEnded: false
    };
    this.onEnd = this.onEnd.bind(this);
  }

  componentDidMount() {
    this.props.toggle();
  }

  onEnd() {
    this.props.toggle();
    this.setState({ timerEnded: true });
  }

  render() {
    let nextScreenMsg = this.state.timerEnded ? (
      <p className="lg">Press the space key to move on </p>
    ) : null;
    return (
      <div>
        <p>{this.props.title} </p>
        <p>Please describe what happened in the video</p>
        <Timer counter={this.state.counter} onEnd={this.onEnd} />
        {nextScreenMsg}
      </div>
    );
  }
}

TimerWrapper.propTypes = {
  toggle: PropTypes.func.isRequired,
  timer: PropTypes.number,
  title: PropTypes.string
};

export default TimerWrapper;

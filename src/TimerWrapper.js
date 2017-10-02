import React, { Component } from "react";
import PropTypes from "prop-types";

class TimerWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: props.timer || 30,
      timerId: null
    };
  }

  componentDidMount() {
    this.props.toggle();
    let timerId = setInterval(() => this.tick(), 1000);
    this.setState({ timerId });
  }

  tick() {
    if (this.state.counter > 0) {
      this.setState({
        counter: this.state.counter - 1
      });
    } else {
      this.props.toggle();
      clearTimeout(this.state.timerId);
    }
  }
  render() {
    return (
      <div>
        <div className="timer">
          <h2 className="center"> {this.state.counter} </h2>
        </div>
      </div>
    );
  }
}

TimerWrapper.propTypes = {
  toggle: PropTypes.func.isRequired,
  timer: PropTypes.number
};

export default TimerWrapper;

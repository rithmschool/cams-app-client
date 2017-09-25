import React, { Component } from "react";
import Timer from "./Timer";

class TimerWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 30,
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
        counter: --this.state.counter
      });
    } else {
      this.props.toggle();
      clearTimeout(this.state.timerId);
    }
  }
  render() {
    return (
      <div>
        <Timer count={this.state.counter} />
        <p> This is a question </p>
      </div>
    );
  }
}

TimerWrapper.propTypes = {
  toggle: PropType.func.isRequired
};

export default TimerWrapper;

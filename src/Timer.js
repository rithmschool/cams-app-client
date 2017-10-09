import React from "react";
import ReactCountdownClock from "react-countdown-clock";
import "./Timer.css";
import PropTypes from "prop-types";

const Timer = ({ counter, onEnd }) => (
  <div>
    <div className="timer-wrapper">
      <ReactCountdownClock
        seconds={counter}
        color="#1BA8AE"
        size="175"
        timeFormat="seconds"
        showMilliseconds="false"
        onComplete={onEnd}
      />
    </div>
  </div>
);

Timer.propTypes = {
  counter: PropTypes.number,
  onEnd: PropTypes.func.isRequired
};

export default Timer;

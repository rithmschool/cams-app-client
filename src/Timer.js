import React from "react";

const Timer = ({ count }) => (
  <div>
    <div className="timer">
      <h2 className="center"> {count} </h2>
    </div>
  </div>
);

Timer.propTypes = {
  count: PropType.number.isRequired
};

export default Timer;

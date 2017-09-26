import React from "react";
import PropTypes from "prop-types";

const Timer = ({ count }) => (
	<div>
		<div className="timer">
			<h2 className="center"> {count} </h2>
		</div>
	</div>
);

Timer.propTypes = {
	count: PropTypes.number.isRequired
};

export default Timer;

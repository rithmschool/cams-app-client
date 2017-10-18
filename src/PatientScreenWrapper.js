import React from "react";
import PropTypes from "prop-types";

const PatientScreenWrapper = ({ screens, idx }) => <div>{screens[idx]}</div>;

PatientScreenWrapper.propTypes = {
  screens: PropTypes.array.isRequired,
  idx: PropTypes.number.isRequired
};

export default PatientScreenWrapper;

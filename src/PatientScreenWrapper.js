import React, { Component } from "react";

class PatientScreenWrapper extends Component {
  render() {
    return <div>{this.props.screens[this.props.idx]}</div>;
  }
}

export default PatientScreenWrapper;

//will receive screens array as prop, will need to render each by index

import React, { Component } from "react";
import PatientHome from "./PatientHome";
import { BASE_URL, BrowserDetect, config } from "./helpers.js";
import axios from "axios";
import URLSearchParams from "url-search-params";
import { connect } from "react-redux";
import { confirmUser, getScreensAndURLs } from "./store/actions/actionCreators";

class PatientWrapper extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    const query = new URLSearchParams(this.props.location.search);
    const token = query.get("token");
    if (nextProps.assessment.screens.length === 0) {
      this.props.getScreensAndURLsAC(nextProps, token);
    }
  }

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const token = query.get("token");
    this.props.confirmUserAC(token);
  }

  render() {
    BrowserDetect.init();
    let display =
      BrowserDetect.browser === "Chrome" ? (
        <PatientHome />
      ) : (
        <p>
          Browser not supported. Please switch to{" "}
          <a href="https://www.google.com/chrome/browser/desktop/index.html">
            Google Chrome
          </a>{" "}
          to proceed.
        </p>
      );
    return <div>{display}</div>;
  }
}

const mapStateToProps = state => {
  return {
    assessment: state.assessment,
    confirmUser: state.confirmUser,
    stopRecord: state.stopRecord
  };
};

const mapDispatchToProps = dispatch => {
  return {
    confirmUserAC: token => dispatch(confirmUser(token)),
    getScreensAndURLsAC: (nextProps, token) =>
      dispatch(getScreensAndURLs(nextProps, token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientWrapper);

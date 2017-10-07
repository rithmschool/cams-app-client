import React, { Component } from "react";
import PatientHome from "./PatientHome";
import { BASE_URL, BrowserDetect, config } from "./helpers.js";
import axios from "axios";
import URLSearchParams from "url-search-params";

class PatientWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screens: [],
      assessmentId: 0,
      token: "",
      src: null,
      screenCount: 0
    };
  }

  captureUserMedia(callback) {
    let params = { audio: true, video: true };
    navigator.getUserMedia(params, callback, error => {
      alert(JSON.stringify(error));
    });
  }

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const token = query.get("token");

    axios
      .get(`${BASE_URL}/api/users/confirm/${token}`)
      .then(response => {
        this.setState({ assessmentId: response.data.assessment_id });
        return axios.get(
          `${BASE_URL}/api/users/${response.data
            .doctor_id}/assessments/${response.data.assessment_id}`,
          { token: token }
        );
      })
      .then(response => {
        this.setState({
          screens: response.data.screens,
          screenCount: response.data.screens.reduce(
            (prev, curScreen) => prev + (curScreen.type === "video" ? 3 : 2),
            3
          )
        });
        return response.data.screens;
      })
      .then(response => {
        let screensPromises = response
          .filter(s => s.type === "video")
          .map(s => {
            let title = decodeURIComponent(s.title);
            return axios.get(`${BASE_URL}/api/videofiles/${title}`, config());
          });

        Promise.all(screensPromises).then(response => {
          let screens = this.state.screens.map(s => {
            if (s.type === "video") {
              response.forEach(v => {
                if (s.title === v.data.title) {
                  s = { ...s, url: v.data.url };
                }
              });
            }
            return s;
          });
          this.setState({ screens });
        });
      });
  }

  render() {
    BrowserDetect.init();
    let display =
      BrowserDetect.browser === "Chrome" ? (
        <PatientHome
          screens={this.state.screens}
          screenCount={this.state.screenCount}
          assessmentId={+this.state.assessmentId}
        />
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

export default PatientWrapper;

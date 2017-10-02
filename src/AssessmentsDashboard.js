import React, { Component } from "react";
import { BASE_URL, userID, config } from "./helpers.js";
import axios from "axios";
import "./AssessmentsDashboard.css";

class AssessmentsDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctorAssessments: [],
      assessmentID: null,
      downloaded: []
    };
  }

  downloadFile(id) {
    axios.get(`${BASE_URL}/api/recording/${id}`, config()).then(response => {
      this.setState({ downloaded: [response.data.id, response.data.url] });
    });
  }

  selectAssessment(assessmentID) {
    if (
      this.state.assessmentID === null ||
      assessmentID !== this.state.assessmentID
    ) {
      this.setState({ assessmentID });
    } else if (this.state.assessmentID !== null) {
      this.setState({ assessmentID: null });
    }
  }

  componentWillMount() {
    axios
      .get(`${BASE_URL}/api/users/${userID()}/assessments`, config())
      .then(response => {
        this.setState({ doctorAssessments: response.data });
      });
  }

  render() {
    let assessments = this.state.doctorAssessments.map((assessment, i) => {
      console.log(
        assessment.recording_url,
        !!assessment.recording_url,
        this.state.downloaded.includes(assessment.id)
      );
      let completed = <h6>Completed: No</h6>;
      let className = "playlist-card";
      if (this.state.downloaded.includes(assessment.id)) {
        completed = (
          <div>
            <div>
              <video
                className="playlist-video"
                src={this.state.downloaded[1]}
                preload="metadata"
                controls="true"
              />
            </div>
            <button
              className="button button-hover"
              type="submit"
              value="Submit"
            >
              <a href={this.state.downloaded[1]}>Download</a>
            </button>
          </div>
        );
        className = "selected";
      } else if (assessment.recording_url) {
        completed = (
          <button
            className="button button-hover"
            onClick={this.downloadFile.bind(this, assessment.id)}
          >
            Get Video
          </button>
        );
      }

      return (
        <div
          key={i}
          className={`${className} button-hover playlist-card-contents`}
        >
          <h5 className="playlist-name-title">
            {assessment.patient_email.email}
          </h5>
          <h6>{assessment.playlist_name.name}</h6>
          <h6>{assessment.date_added.slice(0, -6)}</h6>
          {completed}
        </div>
      );
    });

    return (
      <div>
        <div className="banner-text">
          <h1 className="banner-bold">Patient Assessments</h1>
        </div>
        <div className="content">
          <div className="dash-nav" />
          <div className="playlist-container">{assessments}</div>
        </div>
      </div>
    );
  }
}
export default AssessmentsDashboard;

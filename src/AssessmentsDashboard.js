import React, { Component } from "react";
import { BASE_URL, userID, config } from "./helpers.js";
import axios from "axios";

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
      let completed = assessment.recording_url ? (
        <div>
          <h6>Completed: Yes</h6>
          <button
            className="button button-hover"
            onClick={this.downloadFile.bind(this, assessment.id)}
          >
            Get Download Link
          </button>
        </div>
      ) : (
        <h6>Completed: No</h6>
      );
      let className =
        this.state.assessmentID === assessment.id
          ? "selected"
          : "playlist-card";

      let dl = this.state.downloaded.includes(assessment.id) ? (
        <button className="button button-hover" type="submit" value="Submit">
          <a href={this.state.downloaded[1]}>Download</a>
        </button>
      ) : null;
      let dv = this.state.downloaded.includes(assessment.id) ? (
        <video src={this.state.downloaded[1]} autoPlay="true" controls="true" />
      ) : null;
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
          {dl}
          {dv}
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

import React, { Component } from "react";
import { BASE_URL, userID, config } from "./helpers.js";
import axios from "axios";
import "./AssessmentsDashboard.css";

class AssessmentsDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctorAssessments: []
    };
  }

  componentWillMount() {
    axios
      .get(`${BASE_URL}/api/users/${userID()}/assessments`, config())
      .then(response => {
        Promise.all(
          response.data.map(a => {
            if (a.recording_url)
              return axios.get(`${BASE_URL}/api/recording/${a.id}`, config());
            else return null;
          })
        ).then(downloadLinks => {
          let assessments = downloadLinks.map((v, i) => {
            if (v)
              return Object.assign(
                { download_url: v.data.url },
                response.data[i]
              );
            else return response.data[i];
          });
          this.setState({ doctorAssessments: assessments }, () => {});
        });
      });
  }

  render() {
    let assessments = this.state.doctorAssessments.map((assessment, i) => {
      if (assessment.recording_url) {
        return (
          <div
            key={i}
            className={`playlist-card button-hover playlist-card-contents`}
          >
            <h5 className="playlist-name-title">
              {assessment.patient_email.email}
            </h5>
            <h6>{assessment.playlist_name.name}</h6>
            <h6>{assessment.date_added.slice(0, -6)}</h6>
            <div>
              <div>
                <video
                  className="playlist-video"
                  src={assessment.download_url}
                  preload="metadata"
                  controls="true"
                />
              </div>
              <button
                className="button button-hover"
                type="submit"
                value="Submit"
              >
                <a href={assessment.download_url}>Download</a>
              </button>
            </div>
          </div>
        );
      } else {
        return (
          <div
            key={i}
            className={`playlist-card button-hover playlist-card-contents`}
          >
            <h5 className="playlist-name-title">
              {assessment.patient_email.email}
            </h5>
            <h6>{assessment.playlist_name.name}</h6>
            <h6>{assessment.date_added.slice(0, -6)}</h6>
            <h6>Completed: No</h6>
          </div>
        );
      }
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

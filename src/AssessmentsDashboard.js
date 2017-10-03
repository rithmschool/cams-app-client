import React, { Component } from "react";
import { BASE_URL, userID, config, dateFormat } from "./helpers.js";
import axios from "axios";
import Assessment from "./Assessment";

class AssessmentsDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctorAssessments: [],
      selected: { id: null, url: null }
    };
  }

  downloadFile(id) {
    axios.get(`${BASE_URL}/api/recording/${id}`, config()).then(response => {
      this.setState({ selected: { id, url: response.data.url } });
    });
  }

  handleEvaluated(id) {
    axios
      .patch(
        `${BASE_URL}/api/users/${userID()}/assessments/${id}`,
        {},
        config()
      )
      .then(response => {
        var newDoctorAssessments = this.state.doctorAssessments.map(
          v => (v.id === id ? response.data : v)
        );
        this.setState({ doctorAssessments: newDoctorAssessments });
      });
  }

  selectAssessment(assessmentID) {
    this.setState({ selected: { id: null, url: null } });
  }

  componentWillMount() {
    axios
      .get(`${BASE_URL}/api/users/${userID()}/assessments`, config())
      .then(response => {
        console.log(response.data);
        this.setState({ doctorAssessments: response.data });
      });
  }

  render() {
    let assessments = this.state.doctorAssessments.map((assessment, i) => {
      let selected = this.state.selected.id === assessment.id;
      let download_url = selected ? this.state.selected.url : null;
      return (
        <Assessment
          key={assessment.id}
          download_url={download_url}
          recording_url={assessment.recording_url}
          handlelUnselect={this.selectAssessment.bind(this, assessment.id)}
          handleSelect={this.downloadFile.bind(this, assessment.id)}
          handleEvaluated={this.handleEvaluated.bind(this, assessment.id)}
          patient_email={assessment.patient_email.email}
          playlist_name={assessment.playlist_name.name}
          date_added={dateFormat(assessment.date_added)}
          date_assessed={dateFormat(assessment.date_assessed)}
          date_evaluated={dateFormat(assessment.date_evaluated)}
        />
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

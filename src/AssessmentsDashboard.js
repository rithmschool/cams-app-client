import React, {Component} from 'react';
import {BASE_URL, userID, config} from './helpers.js';
import axios from 'axios';

class AssessmentsDashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      doctorAssessments: [],
      assessmentID: null
    }
  }

  selectAssessment(assessmentID){
    if (this.state.assessmentID === null || assessmentID !== this.state.assessmentID){
      this.setState({assessmentID})
    }
    else if(this.state.assessmentID !== null){
      this.setState({assessmentID: null})
    }
  }

  componentWillMount() {
    axios.get(`${BASE_URL}/api/users/${userID()}/assessments`, config())
    .then(response => {
      this.setState({doctorAssessments: response.data})
    })
  }

  render() {
    let assessments = this.state.doctorAssessments.map((assessment, i) => {
      let completed = assessment.recording_url ?
        <h6>Completed: Yes</h6> :
        <h6>Completed: No</h6>
      let className = this.state.assessmentID === assessment.id ?
        'selected' :
        'playlist-card'
      return (
        <div
          key={i}
          className={`${className} button-hover playlist-card-contents`}
          onClick={this.selectAssessment.bind(this, assessment.id)}
        >
          <h5 className="playlist-name-title">
            {assessment.patient_email.email}
          </h5>
          <h6>{assessment.playlist_name.name}</h6>
          <h6>{assessment.date_added}</h6>
          {completed}
        </div>
      )
    })
    return (
      <div>
        <div className="banner-text">
          <h1 className="banner-bold">Patient Assessments</h1>
        </div>
        <div className="content">
          <div className="dash-nav">
          </div>
          <div className="playlist-container">
            {assessments}
          </div>
        </div>
      </div>
    )
  }
}
export default AssessmentsDashboard;

import React, { Component } from "react";
import { BASE_URL, userID, config, dateFormat } from "./helpers.js";
import axios from "axios";
import Assessment from "./Assessment";
import Dropdown from "./Dropdown.js";
import "./AssessmentsDashboard.css";
import Modal from "react-modal";

class AssessmentsDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctorAssessments: [],
      selected: { id: null, url: null },
      modalIsOpen: false,
      sorts: [
        { name: "Patient Email", value: "patientEmail", selected: true },
        { name: "Playlist", value: "playlistName", selected: false },
        { name: "Date Added", value: "dateAdded", selected: false },
        { name: "Date Assessed", value: "dateAssessed", selected: false },
        { name: "Date Evaluated", value: "dateEvaluated", selected: false },
        { name: "Recently Changed", value: "dateChanged", selected: false }
      ]
    };
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillMount() {
    axios
      .get(`${BASE_URL}/api/users/${userID()}/assessments`, config())
      .then(response => {
        var res = response.data.map(v =>
          Object.assign(
            {},
            {
              id: v.id,
              patientEmail: v.patient_email.email,
              playlistName: v.playlist_name.name,
              dateAdded: v.date_added,
              dateAssessed: v.date_assessed,
              dateEvaluated: v.date_evaluated,
              recordingUrl: v.recording_url
            }
          )
        );
        this.setState({ doctorAssessments: res });
      });
  }

  handleVideo(id) {
    axios.get(`${BASE_URL}/api/recording/${id}`, config()).then(response => {
      console.log(response);
      this.setState({
        selected: { id, url: response.data.url },
        modalIsOpen: true
      });
    });
  }

  closeModal() {
    this.setState({ selected: { id: null, url: null }, modalIsOpen: false });
  }

  handleSort(val) {
    let sorts = this.state.sorts.map(v =>
      Object.assign({}, v, { selected: v.value === val })
    );
    this.setState({ sorts });
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
          v =>
            v.id === id
              ? Object.assign({}, v, {
                  dateEvaluated: response.data.date_evaluated
                })
              : v
        );
        this.setState({ doctorAssessments: newDoctorAssessments });
      });
  }

  render() {
    let sortField = this.state.sorts.filter(v => v.selected)[0].value;
    console.log("sortField", sortField);
    let assessments = this.state.doctorAssessments.sort((a, b) => {
      if (a[sortField] > b[sortField]) return 1;
      if (a[sortField] < b[sortField]) return -1;
      return 0;
    });

    assessments = assessments.map((assessment, i) => {
      return (
        <Assessment
          key={assessment.id}
          recordingUrl={assessment.recordingUrl}
          handleEvaluated={this.handleEvaluated.bind(this, assessment.id)}
          patientEmail={assessment.patientEmail}
          playlistName={assessment.playlistName}
          dateAdded={dateFormat(assessment.dateAdded)}
          dateAssessed={dateFormat(assessment.dateAssessed)}
          dateEvaluated={dateFormat(assessment.dateEvaluated)}
          handleVideo={this.handleVideo.bind(this, assessment.id)}
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
          <table className="asssessmentL-list">
            <thead>
              <tr>
                <th colSpan="3">
                  <label htmlFor="title">Sort: </label>
                  <Dropdown
                    id="Sorts"
                    title={this.state.sorts.filter(v => v.selected)[0].name}
                    content={this.state.sorts}
                    onChange={this.handleSort.bind(this)}
                  />
                  <button className="al-button">
                    {String.fromCharCode(8679)}
                  </button>
                  <button className="al-button">
                    {String.fromCharCode(8681)}
                  </button>
                </th>
                <th colSpan="3">
                  <label>Filter</label>
                </th>
              </tr>
              <tr>
                <th>Patient Email</th>
                <th>Playlist</th>
                <th>Date Added</th>
                <th>Date Assessed</th>
                <th>Date Evaluated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{assessments}</tbody>
          </table>
          <Modal
            className="video"
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            contentLabel="Assessment Video"
          >
            <button onClick={this.closeModal}>close</button>
            <h2>Assessment Video</h2>
            <video
              className="playlist-video"
              src={this.state.selected.url}
              preload="metadata"
              controls="true"
            />
          </Modal>
        </div>
      </div>
    );
  }
}
export default AssessmentsDashboard;

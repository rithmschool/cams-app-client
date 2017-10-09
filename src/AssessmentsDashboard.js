import React, { Component } from "react";
import { BASE_URL, userID, config, dateFormat, createDate } from "./helpers.js";
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
        { name: "Patient Email", value: "patientEmail", selected: false },
        { name: "Playlist", value: "playlistName", selected: false },
        { name: "Date Added", value: "dateAdded", selected: false },
        { name: "Date Assessed", value: "dateAssessed", selected: false },
        { name: "Date Evaluated", value: "dateEvaluated", selected: false },
        { name: "Recently Changed", value: "dateChanged", selected: true }
      ],
      sortOrder: -1,
      filters: [
        { name: "All", value: () => true, selected: true },
        { name: "Not Assesed", value: v => !v.dateAssessed, selected: false },
        { name: "Not Evaluated", value: v => !v.dateEvaluated, selected: false }
      ]
    };
    this.closeModal = this.closeModal.bind(this);
    this.sortAssessments = this.sortAssessments.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.changeSortOrder = this.changeSortOrder.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }

  componentWillMount() {
    axios
      .get(`${BASE_URL}/api/users/${userID()}/assessments`, config())
      .then(response => {
        var res = response.data.map(v => ({
          id: v.id,
          patientEmail: v.patient_email.email,
          playlistName: v.playlist_name.name,
          dateAdded: createDate(v.date_added),
          dateAssessed: createDate(v.date_assessed),
          dateEvaluated: createDate(v.date_evaluated),
          dateChanged: Math.max(
            createDate(v.date_added),
            createDate(v.date_assessed),
            createDate(v.date_evaluated)
          ),
          recordingUrl: v.recording_url
        }));
        this.setState({ doctorAssessments: res });
      });
  }

  handleVideo(id) {
    axios.get(`${BASE_URL}/api/recording/${id}`, config()).then(response => {
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
    let sorts = this.state.sorts.map(v => ({
      ...v,
      selected: v.value === val
    }));
    this.setState({ sorts });
  }

  handleFilter(val) {
    let filters = this.state.filters.map(v => ({
      ...v,
      selected: v.value === val
    }));
    this.setState({ filters });
  }

  changeSortOrder() {
    this.setState({ sortOrder: this.state.sortOrder * -1 });
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
              ? {
                  ...v,
                  dateChanged: Math.max(
                    createDate(response.data.date_added),
                    createDate(response.data.date_assessed),
                    createDate(response.data.date_evaluated)
                  ),
                  dateEvaluated: createDate(response.data.date_evaluated)
                }
              : v
        );
        this.setState({ doctorAssessments: newDoctorAssessments });
      });
  }

  sortAssessments(a, b) {
    let sortField = this.state.sorts.find(v => v.selected).value;
    var res = 0;
    if (a[sortField] > b[sortField]) res = 1;
    else if (a[sortField] < b[sortField]) res = -1;
    else {
      if (a.id > b.id) res = 1;
      else if (a.id < b.id) res = -1;
    }
    return res * this.state.sortOrder;
  }

  render() {
    let assessments = this.state.doctorAssessments
      .filter(this.state.filters.find(v => v.selected).value)
      .sort(this.sortAssessments)
      .map((assessment, i) => {
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
          <table>
            <thead>
              <tr>
                <th colSpan="3">
                  <label>Sort: </label>
                  <Dropdown
                    id="Sorts"
                    title={this.state.sorts.find(v => v.selected).name}
                    content={this.state.sorts}
                    onChange={this.handleSort}
                  />
                  <button className="al-button" onClick={this.changeSortOrder}>
                    {this.state.sortOrder === -1 ? (
                      <i className="fa fa-arrow-down" aria-hidden="true" />
                    ) : (
                      <i className="fa fa-arrow-up" aria-hidden="true" />
                    )}
                  </button>
                </th>
                <th colSpan="3">
                  <label>Filter: </label>
                  <Dropdown
                    id="Filter"
                    title={this.state.filters.find(v => v.selected).name}
                    content={this.state.filters}
                    onChange={this.handleFilter}
                  />
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

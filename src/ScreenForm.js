import React, { Component } from "react";
import axios from "axios";
import { BASE_URL, config } from "./helpers.js";
import "./ScreenForm.css";
import QuestionForm from "./QuestionForm";
import VideoUploadForm from "./VideoUploadForm";
import PropTypes from "prop-types";

class ScreenForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: "",
      videos: [],
      searchtext: ""
    };
    this.handleAddChange = this.handleAddChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleFileAdd = this.handleFileAdd.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSearchChange(e) {
    this.setState({
      searchtext: e.target.value
    });
  }

  handleFileAdd(file) {
    this.props.addVideoFile(file).then(response => {
      this.getAllVideoFiles();
    });
  }

  handleAddChange(e) {
    e.preventDefault();
    this.props.addVideoFile(e.target.text);
  }

  getAllVideoFiles() {
    axios.get(`${BASE_URL}/api/videofiles`, config()).then(response => {
      this.setState({ videos: response.data });
    });
  }

  componentWillMount() {
    this.getAllVideoFiles();
  }

  render() {
    let stext = this.state.searchtext;
    let showVideos = this.state.videos.map((val, idx, arr) => {
      var showDiv =
        stext.toLowerCase() === "" ||
        val.title.toLowerCase().includes(stext.toLowerCase());
      return showDiv ? (
        <div key={idx}>
          <a className="searchinput" onClick={this.handleAddChange}>
            {val.title}
          </a>
        </div>
      ) : null;
    });

    return (
      <div>
        <div className="video-form-wrapper">
          <div className="videos-list">
            <input
              className="searchinput"
              type="text"
              onChange={this.handleSearchChange}
              name="searcher"
              placeholder="Search for a video"
              value={this.state.searchtext}
            />
            {showVideos}
          </div>
          <QuestionForm addQuestion={this.props.addQuestion} />
          <VideoUploadForm
            addVideoFile={this.handleFileAdd}
            fileName={this.state.searchtext}
          />
        </div>
      </div>
    );
  }
}

ScreenForm.propTypes = {
  addQuestion: PropTypes.func.isRequired,
  addVideoFile: PropTypes.func.isRequired
};

export default ScreenForm;

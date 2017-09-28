import React, { Component } from "react";
import axios from "axios";
import { BASE_URL, config } from "./helpers.js";
import "./ScreenForm.css";
import QuestionForm from "./QuestionForm";
import PropTypes from "prop-types";

class ScreenForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      file: null,
      videos: [],
      searchtext: ""
    };
    this.handleAddChange = this.handleAddChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handleUploadChange = this.handleUploadChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleUploadChange(e) {
    this.setState({
      [e.target.name]: e.target.files[0]
    });
  }

  handleSearchChange(e) {
    this.setState({
      searchtext: e.target.value
    });
  }

  handleUpload(e) {
    e.preventDefault();
    this.props.addFile(e.target);
    this.setState({ file: null });
  }

  handleAdd(e) {
    e.preventDefault();
    this.setState({ url: "" });
    this.props.addVideo(this.state.url);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.addDone(this.state.url);
  }

  handleAddChange(e) {
    e.preventDefault();
    this.props.addVideo(e.target.getAttribute("data"));
  }

  componentWillMount() {
    axios.get(`${BASE_URL}/api/videos`, config()).then(response => {
      this.setState({ videos: response.data });
    });
  }

  render() {
    let stext = this.state.searchtext;
    let showVideos = this.state.videos.map((val, idx, arr) => {
      var showDiv =
        stext.toLowerCase() === "" ||
        val.title.toLowerCase().includes(stext.toLowerCase());
      return showDiv ? (
        <div key={idx}>
          <a
            className="searchinput"
            onClick={this.handleAddChange}
            data={val.url}
          >
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
          <div className="videos-form">
            <form enctype="multipart/form-data" onSubmit={this.handleUpload}>
              <input type="file" name="file" onChange={this.handleChange} />
              {/*<FileInput
                name="file"
                accept=".mp4,.avi"
                placeholder="Video File"
                className="inputClass"
                onChange={this.handleUploadChange}
              />*/}
              <button type="submit" className="button" value="Add">
                +
              </button>
            </form>

            <form onSubmit={this.handleAdd}>
              <input
                type="url"
                onChange={this.handleChange}
                name="url"
                placeholder="Video Url"
                value={this.state.url}
              />
              <button type="submit" className="button" value="Add">
                +
              </button>
              <button
                className="button"
                onClick={this.handleSubmit}
                value="Submit"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

ScreenForm.propTypes = {
  addQuestion: PropTypes.func.isRequired,
  addVideo: PropTypes.func.isRequired,
  addDone: PropTypes.func.isRequired
};

export default ScreenForm;

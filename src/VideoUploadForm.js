import React, { Component } from "react";
import { BASE_URL } from "./helpers.js";
import axios from "axios";
import PropTypes from "prop-types";
import "./VideoUploadForm.css";

class VideoUploadForm extends Component {
  constructor(props) {
    super(props);
    this.handleFileSubmit = this.handleFileSubmit.bind(this);
    this.getSignedRequest = this.getSignedRequest.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      file: "",
      status: "",
      width: 0,
      showProgressBar: false,
      errors: false
    };
  }

  handleChange(e) {
    const fileName = this.fileInput.files[0].name;
    this.setState({
      file: fileName,
      status: "",
      width: 0,
      showProgressBar: false
    });
  }

  handleFileSubmit(e) {
    e.preventDefault();
    const file = this.fileInput.files[0];
    if (!file) alert("No file selected!");
    else {
      this.setState({
        width: 0,
        showProgressBar: true
      });
      this.getSignedRequest(file);
    }
  }

  getSignedRequest(file) {
    axios
      .get(`${BASE_URL}/api/s3/new`, {
        params: {
          bucket_name: "PLAYLIST_VIDEO_BUCKET",
          file_name: file.name,
          file_type: file.type
        }
      })
      .then(response => {
        this.uploadFile(file, response.data.data, response.data.url);
      })
      .catch(err => {
        this.setState({
          status: "There was an error. Please try again.",
          errors: true
        });
      });
  }

  uploadFile(file, s3Data, url) {
    const formData = new FormData();
    for (let key in s3Data.fields) {
      formData.append(key, s3Data.fields[key]);
    }
    formData.append("file", file);
    axios
      .post(s3Data.url, formData, {
        headers: {
          "x-amz-acl": "public-read"
        },
        onUploadProgress: progressEvent => {
          let percentCompleted = Math.round(
            progressEvent.loaded * 100 / progressEvent.total
          );
          this.setState({
            width: percentCompleted
          });
        }
      })
      .then(response => {
        this.props.addVideoFile(file.name);
        this.setState({
          status: "Upload Complete!",
          showProgressBar: false
        });
      })
      .catch(err => {
        this.setState({
          status: "There was an error. Please try again.",
          errors: true
        });
      });
  }

  render() {
    let progressMsg = "";
    if (this.state.errors) {
      progressMsg = this.state.status;
    } else if (this.state.width === 100) {
      progressMsg = this.state.status;
    } else if (this.state.width) {
      progressMsg = `${this.state.width}%`;
    }

    let progressBar = this.state.showProgressBar ? (
      <div className="progress-wrapper">
        <div
          className="progress-bar"
          style={{ width: `${this.state.width}%` }}
        />
      </div>
    ) : null;

    return (
      <div className="forms">
        <form onSubmit={this.handleFileSubmit}>
          <h4>Upload New Video</h4>
          <input
            onChange={this.handleChange}
            type="file"
            id="file-input"
            ref={input => (this.fileInput = input)}
          />
          <button type="submit">Upload Video</button>
        </form>
        <div>
          {progressBar}
          <p>{progressMsg}</p>
        </div>
      </div>
    );
  }
}

VideoUploadForm.propTypes = {
  addVideoFile: PropTypes.func.isRequired,
  fileName: PropTypes.string.isRequired
};

export default VideoUploadForm;

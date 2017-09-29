import React, { Component } from "react";
import { BASE_URL } from "./helpers.js";
import axios from "axios";
// import PropTypes from "prop-types";

class VideoUploadForm extends Component {
  constructor(props) {
    super(props);
    this.handleFileSubmit = this.handleFileSubmit.bind(this);
    this.getSignedRequest = this.getSignedRequest.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    this.state = {
      status: "Upload not started"
    };
  }

  handleFileSubmit(e) {
    e.preventDefault();
    const file = this.fileInput.files[0];
    if (!file) alert("No file selected!");
    this.getSignedRequest(file);
  }

  getSignedRequest(file) {
    axios
      .get(`${BASE_URL}/api/files/sign-s3`, {
        params: {
          file_name: file.name,
          file_type: file.type
        }
      })
      .then(response => {
        console.log("signd request complete!", response);
        this.setState({ status: "Starting Upload!" });
        this.uploadFile(file, response.data.data, response.data.url);
      })
      .catch(err => console.log(err));
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
          console.log(progressEvent);
        }
      })
      .then(response => {
        this.setState({ status: "Upload Complete!" });
        console.log("upload successful!", response);
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <h1>Please upload a video!</h1>
        <form onSubmit={this.handleFileSubmit}>
          <input
            type="file"
            id="file-input"
            ref={input => (this.fileInput = input)}
          />
          <input type="submit" value="Add Video" />
          <h2 id="status">{this.state.status}</h2>
        </form>
      </div>
    );
  }
}

export default VideoUploadForm;

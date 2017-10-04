import React, { Component } from "react";
import { BASE_URL, config } from "./helpers.js";
import axios from "axios";

// import PropTypes from "prop-types";
const styles = {
  progressWrapper: {
    height: "50px",
    marginTop: "10px",
    width: "250px",
    float: "left",
    overflow: "hidden",
    backgroundColor: "#f5f5f5",
    border: "1px solid black",
    borderRadius: "4px",
    WebkitBoxShadow: "inset 0 1px 2px rgba(0,0,0,.1)",
    boxShadow: "inset 0 1px 2px rgba(0,0,0,.1)"
  },
  progressBar: {
    float: "left",
    width: 0,
    height: "100%",
    fontSize: "12px",
    lineHeight: "20px",
    color: "#fff",
    textAlign: "center",
    backgroundColor: "#5cb85c",
    WebkitBoxShadow: "inset 0 -1px 0 rgba(0,0,0,.15)",
    boxShadow: "inset 0 -1px 0 rgba(0,0,0,.15)",
    WebkitTransition: "width .6s ease",
    Otransition: "width .6s ease",
    transition: "width .6s ease"
  },
  cancelButton: {
    marginTop: "5px",
    WebkitAppearance: "none",
    padding: 0,
    cursor: "pointer",
    background: "0 0",
    border: 0,
    float: "left",
    fontSize: "21px",
    fontWeight: 700,
    lineHeight: 1,
    color: "#000",
    textShadow: "0 1px 0 #fff",
    filter: "alpha(opacity=20)",
    opacity: ".2"
  }
};

class VideoUploadForm extends Component {
  constructor(props) {
    super(props);
    this.handleFileSubmit = this.handleFileSubmit.bind(this);
    this.getSignedRequest = this.getSignedRequest.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      file: "",
      status: "",
      width: 0,
      showProgressBar: false
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

  handleSubmit(e) {
    e.preventDefault();
    this.props.addDone(this.state.file || this.props.fileName);
  }

  handleFileSubmit(e) {
    e.preventDefault();
    const file = this.fileInput.files[0];
    if (!file) alert("No file selected!");
    else {
      this.setState({
        showProgressBar: true
      });
      this.getSignedRequest(file);
    }
  }

  getSignedRequest(file) {
    axios
      .get(`${BASE_URL}/api/videofiles/sign-s3`, {
        params: {
          file_name: file.name,
          file_type: file.type
        }
      })
      .then(response => {
        console.log("signd request complete!", response);
        // this.setState({ status: "Starting Upload!" });
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
          let percentCompleted = Math.round(
            progressEvent.loaded * 100 / progressEvent.total
          );
          this.setState({
            width: percentCompleted
          });
          console.log("Progress:-" + percentCompleted);
        }
      })
      .then(response => {
        console.log(file);
        this.props.addVideoFile(file.name);
        // axios.get(`${BASE_URL}/api/videofiles`, config()).then(response => {
        //   this.props.addVideoFile(response.data);
        // });

        this.setState({
          status: "Upload Complete!",
          showProgressBar: false
        });
        console.log("upload successful!", response);
      })
      .catch(err => console.log(err));
  }

  render() {
    let progressMsg =
      this.state.width === 100
        ? this.state.status
        : this.state.width ? `${this.state.width}%` : "";
    let progressBar = this.state.showProgressBar ? (
      <div style={styles.progressWrapper}>
        <div style={{ ...styles.progressBar, width: `${this.state.width}%` }}>
          {" "}
        </div>
      </div>
    ) : null;

    return (
      <div>
        <form onSubmit={this.handleFileSubmit}>
          <input
            onChange={this.handleChange}
            type="file"
            id="file-input"
            ref={input => (this.fileInput = input)}
          />
          <input type="submit" value="Add Video" />
        </form>
        {progressBar}
        <div>{progressMsg}</div>
        <button className="button" onClick={this.handleSubmit} value="Submit">
          Submit
        </button>
      </div>
    );
  }
}

export default VideoUploadForm;

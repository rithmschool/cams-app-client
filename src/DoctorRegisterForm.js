import React, { Component } from "react";
import { BASE_URL, config } from "./helpers.js";
import axios from "axios";

class DoctorRegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      confirmPassword: "",
      response: "",
      displayForm: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    var token = this.props.location.search.split("=")[1];
    axios
      .post(`${BASE_URL}/api/users/register`, {
        token: token
      })
      .then(response => {
        this.setState({
          response: response.data.message,
          displayForm: true
        });
      })
      .catch(response => {
        this.props.history.push(`/`);
      });
  }

  registerDoctor(config) {
    var token = this.props.location.search.split("=")[1];
    axios
      .patch(`${BASE_URL}/api/users/register`, {
        token: token,
        password: this.state.password,
        confirmPassword: this.state.confirmPassword
      })
      .then(response => {
        this.setState({
          response: response.data.message
        });
        setTimeout(() => {
          this.props.history.push(`/login`);
        }, 3000);
      })
      .catch(response => {
        this.setState({
          response: response.response.data.message
        });
      });
    this.setState({
      response: "Setting up your account, one moment..."
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.password || !this.state.confirmPassword) {
      this.setState({
        response: "Cannot have an empty password."
      });
      return;
    }
    this.registerDoctor(config, this);
    this.setState({
      password: "",
      confirmPassword: ""
    });
  }

  render() {
    let responseText = <p>{this.state.response}</p>;
    let passwordForm = (
      <div>
        <h1>Create New Password</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="password"
            name="password"
            placeholder="new password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="confirm new password"
            value={this.state.confirmPassword}
            onChange={this.handleChange}
          />
          <button className="button button-hover" type="submit" value="Submit">
            Submit
          </button>
        </form>
      </div>
    );
    return (
      <div>
        <div className="banner-text">
          <h1 className="banner-bold">Register</h1>
        </div>
        <div className="content">
          {this.state.displayForm ? passwordForm : null}
          {responseText}
        </div>
      </div>
    );
  }
}

export default DoctorRegisterForm;

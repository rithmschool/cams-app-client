import React, { Component } from "react";
import { BASE_URL, config } from "./helpers.js";
import axios from "axios";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  login(config) {
    axios
      .post(`${BASE_URL}/api/users/auth`, this.state, config)
      .then(response => {
        localStorage.setItem("token", response.data.token);
        this.props.history.push("/dashboard");
      })
      .catch(error => {
        this.setState({ error: true });
      });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    console.log(e);
    e.preventDefault();
    this.login(config());
  }

  render() {
    let error = this.state.error ? <p>Invalid credentials</p> : null;
    return (
      <div>
        <div className="banner-text">
          <h1 className="banner-bold">Dashboard</h1>
        </div>
        <div className="content">
          <h1>Login</h1>
          <form onSubmit={this.handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="email"
              required
              onChange={this.handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="password"
              required
              onChange={this.handleChange}
            />
            <button
              className="button button-hover"
              type="submit"
              value="Submit"
            >
              Submit
            </button>
            {error}
          </form>
        </div>
      </div>
    );
  }
}

export default LoginForm;

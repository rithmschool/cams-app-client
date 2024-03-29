import React, {Component} from 'react';
import {BASE_URL, config} from './helpers.js';
import axios from 'axios';

class InviteDoctorForm extends Component {
  constructor(props) {
    super(props)
      this.state = {
        email: '',
        response: ""
      }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  inviteDoctor(config, thisArg) {
    axios.post(`${BASE_URL}/api/users/invite`, {
      email: thisArg.state.email
    }, config() )
    .then(response => {
      this.setState({
        response: response.data.message
      });
    })
    .catch(response => {
      this.setState({
        response: response.response.data.message
      });
    })
    this.setState({
      response: "Sending your invite..."
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.email) {
      this.inviteDoctor(config, this)
        this.setState({
          email: ''
        })
    }
  }

  render () {
    let responseText = <p>{this.state.response}</p>
    return (
      <div>
        <div className="banner-text">
          <h1 className="banner-bold">Invite</h1>
        </div>
        <div className="content">
          <h1>Invite New Doctor</h1>
          <form onSubmit={this.handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="email"
              value={this.state.email}
              onChange={this.handleChange.bind(this)}
            />
            <button className="button button-hover" type="submit" value="Submit">Send Invite</button>
          </form>
          {responseText}
      </div>
    </div>
    )
  }

}

export default InviteDoctorForm;
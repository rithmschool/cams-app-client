import React, {PropTypes, Component} from 'react';
import {BASE_URL} from './helpers.js';
import axios from 'axios';

export class Dashboard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: "",
      playlist: "1"
    }
  }

  static contextTypes = {
    router: PropTypes.object
  }

  sendMail(config, thisArg) {
    axios.post(`${BASE_URL}/api/users`, {
      email: thisArg.state.email
    }, config)
      .then(response => axios.post(`${BASE_URL}/api/assessments`, {
        patient_id: response.data.id,
        playlist_id: thisArg.state.playlist
      }, config))
      .then(response => axios.post(`${BASE_URL}/api/users/mail`, {
        assessment_id: response.data.id,
        patient_id: response.data.patient_id
      }, config))
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(event) {

    let config = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + localStorage.getItem('token')
      }
    }
    event.preventDefault()
    this.sendMail(config, this)
  }

  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="email" name="email" placeholder="email" required onChange={this.handleChange.bind(this)}/>
          <button type="submit" value="Submit">Submit</button>
        </form>
      </div>
    )
  }

}

export default Dashboard;

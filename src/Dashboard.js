import React, {PropTypes, Component} from 'react';
import {BASE_URL} from './helpers.js';
import axios from 'axios';
import {Link} from 'react-router-dom'

export class Dashboard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: "",
      playlist: ""
    }
  }

  static contextTypes = {
    router: PropTypes.object
  }

  sendMail(config, thisArg) {
    axios.post(`${BASE_URL}/api/users/mail`, thisArg.state, config).then(response => {})
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
        <div className="banner-text">
          <h1 className="banner-bold">Dashboard</h1>
        </div>
        <div className="content">
          <div className="dash-nav">
              <Link to="/playlists/new"><button className="button button-hover big-nav" type="submit" value="Submit">New Playlist</button></Link>
          </div>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <input type="email" name="email" placeholder="email" required onChange={this.handleChange.bind(this)}/>
            <button className="button button-hover" type="submit" value="Submit">Submit</button>
          </form>
        </div>
      </div>
    )
  }

}

export default Dashboard;

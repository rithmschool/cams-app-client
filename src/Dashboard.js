import React, {PropTypes, Component} from 'react';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:5000'

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

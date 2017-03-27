import React, {PropTypes, Component} from 'react';
import {BASE_URL} from './helpers.js';
import axios from 'axios';

class LoginForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: ""
    }
  }

  static contextTypes = {
    router: PropTypes.object
  }

  login(config, thisArg) {
    axios.post(`${BASE_URL}/api/users/auth`, thisArg.state, config).then(response => {
      localStorage.setItem('token', response.data.token)
      thisArg.context.router.history.push('/dashboard')
    })
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
        'Content-Type': 'application/json'
      }
    }
    event.preventDefault()
    this.login(config, this)
  }

  render() {
    return (
      <div>
        <div className="banner-text">
          <h1 className="banner-bold">Dashboard</h1>
        </div>
        <div className="content">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="email" name="email" placeholder="email" required onChange={this.handleChange.bind(this)}/>
          <input type="password" name="password" placeholder="password" required onChange={this.handleChange.bind(this)}/>
          <button className="button button-hover" type="submit" value="Submit">Submit</button>
        </form>
      </div>
    </div>
    )
  }

}

export default LoginForm;

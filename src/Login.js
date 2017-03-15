import React, {Component} from 'react';
import axios from 'axios'

const BASE_URL = 'http://localhost:3001'

export class LoginForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: ""
    }
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
    event.preventDefault();
    return axios.post(`${BASE_URL}/api/users/auth`, this.state, config).then(response => {
        console.log(response.data.token)
        localStorage.setItem('token', response.data.token)
        localStorage.removeItem('token')
        var item = localStorage.getItem('token')
        console.log(item)
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <input type="email" name="email" placeholder="email" required onChange={this.handleChange.bind(this)}/>
        <input type="password" name="password" placeholder="password" required onChange={this.handleChange.bind(this)}/>
        <button type="submit" value="Submit">Submit</button>
      </form>
    )
  }

}

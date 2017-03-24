import React, {PropTypes, Component} from 'react';
import {BASE_URL} from './helpers.js';
import axios from 'axios';

class Edit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      current_password: '',
      new_password: '',
      confirm_new_password: ''
    }
  }

  static contextTypes = {
    router: PropTypes.object
  }

  editUser(config, thisArg) {
    let userId = JSON.parse(atob(localStorage.getItem('token').split('.')[1])).id;
    axios.patch(`${BASE_URL}/api/users/${userId}`, {
      email: thisArg.state.email,
      current_password: this.state.current_password,
      new_password: this.state.new_password,
      confirm_new_password: this.state.confirm_new_password
    }, config)
    .then(response => console.log(response.data))
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
    this.editUser(config, this)
    this.refs.edit.value = ''
    this.refs.current_password.value = ''
    this.refs.new_password.value = ''
    this.refs.confirm_new_password.value = ''
  }

  render () {
    return (
      <div>
      <div className="banner-text">
        <h1 className="banner-bold">Update</h1>
      </div>

      <div className="content">
        <h1>Profile</h1>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="email" name="email" ref="edit" placeholder="new email" onChange={this.handleChange.bind(this)}/>

          <input type="password" name="current_password" ref="current_password" placeholder="current password" onChange={this.handleChange.bind(this)}/>

          <input type="password" name="new_password" ref="new_password" placeholder="new password" onChange={this.handleChange.bind(this)}/>

          <input type="password" name="confirm_new_password" ref="confirm_new_password" placeholder="confirm new password" onChange={this.handleChange.bind(this)}/>

          <button className="button button-hover" type="submit" value="Submit">Update</button>
        </form>
      </div>
    </div>
    )
  }
}

export default Edit;

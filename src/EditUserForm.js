import React, {PropTypes, Component} from 'react';
import {BASE_URL, userID, config} from './helpers.js';
import axios from 'axios';

class EditUserForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      current_password: '',
      new_password: '',
      confirm_new_password: '',
      message: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  static contextTypes = {
    router: PropTypes.object
  }

  componentWillMount(){
    axios.get(`${BASE_URL}/api/users/${userID()}`, config())
    .then(response => {
      this.setState({email: response.data.email})
    })
  }

  editUser(config, thisArg) {
    axios.patch(`${BASE_URL}/api/users/${userID()}`, {
      email: thisArg.state.email,
      current_password: this.state.current_password,
      new_password: this.state.new_password,
      confirm_new_password: this.state.confirm_new_password
    }, config)
    .then(response => {
      this.setState({
        message: 'You have successfully updated your account!',
        current_password: '',
        new_password: '',
        confirm_new_password: '',
        email: response.data.email
      })
    }).catch(error => {
      this.setState({
        message: `Please re-enter the correct current password 
          and check to see if the new and confirm password fields are the same.`,
        current_password: '',
        new_password: '',
        confirm_new_password: ''
      })
    })
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault()
    this.editUser(config(), this)
  }

  render () {
    let message = this.state.message ?
      <p>{this.state.message}</p> :
      null;
    return (
      <div>
        <div className="banner-text">
          <h1 className="banner-bold">Update</h1>
        </div>
        <div className="content">
          <h1>Profile</h1>
          <form onSubmit={this.handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="new email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <input
              type="password"
              name="current_password"
              placeholder="current password"
              value={this.state.current_password}
              onChange={this.handleChange}
            />
            <input
              type="password"
              name="new_password"
              placeholder="new password"
              value={this.state.new_password}
              onChange={this.handleChange}
            />
            <input
              type="password"
              name="confirm_new_password"
              placeholder="confirm new password"
              value={this.state.confirm_new_password}
              onChange={this.handleChange}
            />
            <button className="button button-hover" type="submit" value="Submit">Update</button>
            {message}
          </form>
      </div>
    </div>
    )
  }
}

export default EditUserForm;

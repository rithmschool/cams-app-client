import React, {PropTypes, Component} from 'react';
import {BASE_URL} from './helpers.js';
import axios from 'axios';

class Edit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: ''
    }
  }

  static contextTypes = {
		router: PropTypes.object
	}

  editUser(config, thisArg) {
    let userId = JSON.parse(atob(localStorage.getItem('token').split('.')[1])).id;
    axios.patch(`${BASE_URL}/api/users/${userId}`, {
			email: thisArg.state.email
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
  }

  render () {
    return (
      <div>
        <h1>Edit</h1>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="email" name="email" ref="edit" placeholder="email" required onChange={this.handleChange.bind(this)}/>
          <button type="submit" value="Submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default Edit;

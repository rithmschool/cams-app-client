import React, {Component} from 'react';
import {BASE_URL, userID, config} from './helpers.js';
import axios from 'axios';

class InviteDoctorForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            inviteSent: false,
            error: false
        }
    }

    inviteDoctor(config, thisArg) {
        axios.post(`${BASE_URL}/api/users/invite`, {
            email: thisArg.state.email
        }, config)
        .then(response => {
            console.log("Email sent to" + response.data.email);
            console.log(response);
            this.setState({
                inviteSent: true
            });
        })
        .catch(response => {
            debugger
            this.setState({
                error: true
            });
        })
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log("Sumibtting");
        if (this.state.email) {
            this.inviteDoctor(config, this)
            this.setState({
                email: ''
            })
        }
    }

    render () {
    let inviteSent = (this.state.inviteSent) ? <p>Invite Sent!</p> : null;
    let inviteError = (this.state.error) ? <p>There was an error sending an invite to that email, please try again shortly.</p> : null;
    return (
      <div>
        <div className="banner-text">
          <h1 className="banner-bold">Invite</h1>
        </div>
        <div className="content">
          <h1>Invite New Doctor</h1>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <input
              type="email"
              name="email"
              placeholder="email"
              value={this.state.email}
              onChange={this.handleChange.bind(this)}
            />
            <button className="button button-hover" type="submit" value="Submit">Send Invite</button>
          </form>
          {inviteSent}
          {inviteError}
      </div>
    </div>
    )
  }
}

export default InviteDoctorForm;
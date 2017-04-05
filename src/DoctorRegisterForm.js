import React, {PropTypes, Component} from 'react';
import {BASE_URL, userID, config} from './helpers.js';
import axios from 'axios';

class DoctorRegisterForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            password: '',
            confirmPassword: '',
            response: '',
        }
    }

    static contextTypes = {
    router: PropTypes.object
    }

    componentWillMount(){
        var token = this.props.location.search.split("=")[1];
        axios.post(`${BASE_URL}/api/users/register`, {
            token: token
        }).then(response =>
            this.setState({
                response:response.data
            })
        ).catch(response => {
            this.context.router.history.push(`/`);
        })
    }

    registerDoctor(config) {
        var token = this.props.location.search.split("=")[1];
        axios.patch(`${BASE_URL}/api/users/register`, {
            token: token,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        })
        .then(response => {
            this.setState({
                response: response.data
            });
            setTimeout(() => {
              this.context.router.history.push(`/login`)
            }, 3000);
        })
        .catch(response => {
            this.setState({
                response: response.response.data
            })
        })
        this.setState({
                response: "One moment..."
        })
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        if (!this.state.password || !this.state.confirmPassword) {
            this.setState({
                response: 'Cannot have an empty password.'
            });
            return;
        } 
        this.registerDoctor(config, this)
        this.setState({
            password: '',
            confirmPassword: ''
        })
    }

    render () {
    let responseText = <p>{this.state.response}</p>
    let passwordForm = (
        <div className="content">
          <h1>Create New Password</h1>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <input
              type="password"
              name="password"
              placeholder="new password"
              value={this.state.password}
              onChange={this.handleChange.bind(this)}
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="confirm new password"
              value={this.state.confirmPassword}
              onChange={this.handleChange.bind(this)}
            />
            <button className="button button-hover" type="submit" value="Submit">Submit</button>
          </form>
          {responseText}
        </div>
      )
    return (
      <div>
        <div className="banner-text">
          <h1 className="banner-bold">Register</h1>
        </div>
        {this.state.response ? passwordForm : null}
      </div>
    )
  }
}

export default DoctorRegisterForm;
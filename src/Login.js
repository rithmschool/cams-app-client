import React, {Component} from 'react';

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
    console.log(this.state);
  }

  handleSubmit() {
    return null
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

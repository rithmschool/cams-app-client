import React, {Component} from 'react';
import {Link} from 'react-router-dom'

class Nav extends Component {

  handleLogOut(e) {
    localStorage.removeItem('token');
  }

  render() {
    let login = <Link to="/login">Log In</Link>
    let logout = <Link to="/login" onClick={this.handleLogOut}>Log Out</Link>
    return (
      <nav>
        <p>CAMS</p>
        {this.props.isLoggedIn ? logout : login}
      </nav>
    )
  }
}

export default Nav;

import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import logo from './logo.png';
import './App.css';

class Nav extends Component {

  handleLogOut(e) {
    localStorage.removeItem('token');
  }

  render() {
    let login =
    <Link to="/login">
      <i className="fa fa-2x nav-sign fa-sign-in" aria-hidden="true"></i>
    </Link>
    let logout =
    <Link to="/login" onClick={this.handleLogOut}>
      <i className="fa fa-2x nav-sign fa-sign-out" aria-hidden="true"></i>
    </Link>

    return (
      <div className="nav">
          <Link to="/">
            <img className="logo button-hover" src={logo}/>
          </Link>

          <button className="nav-sign button button-hover">
            <a href="https://youtu.be/MSENH3FE2As?t=33s"><i className="fa fa-2x fa-plus" aria-hidden="true"></i></a>
          </button>

          <button className="nav-sign button button-hover">{this.props.isLoggedIn ? logout : login}</button>
      </div>
    )
  }
}

export default Nav;

import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import logo from './logo.png';
import './App.css';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';


class Nav extends Component {

  handleLogOut(e) {
    localStorage.removeItem('token');
  }

  render() {
    let login =
    <Link to="/login">
      Login
    </Link>

    let logout =
    <Link to="/login" onClick={this.handleLogOut}>
      Logout
    </Link>

    let home =
    <Link to="/">
      <img className="logo button-hover" src={logo}/>
    </Link>

    let dashboard =
    <Link to="/dashboard">
      <img className="logo button-hover" src={logo}/>
    </Link>

    return (
      <div className="nav">
        <div>
          {this.props.isLoggedIn ? dashboard : home}
        </div>
        <Dropdown className="account-dropdown" ref="dropdown">
          <DropdownTrigger>
            <button data-toggle="dropdown" className=" user button button-hover">
              <i className="fa fa-2x  fa-user-circle-o" aria-hidden="true"></i>
            </button>
          </DropdownTrigger>

          <DropdownContent>
            <div>
              <button className="sign button dropdown-content button-hover">{this.props.isLoggedIn ? logout : login}</button>
            </div>
          </DropdownContent>
        </Dropdown>
      </div>
    )
  }
}

export default Nav;

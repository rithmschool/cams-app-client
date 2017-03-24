import React, {PropTypes, Component} from 'react'
import {Link} from 'react-router-dom'
import logo from './logo.png';
import './App.css';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';


class Nav extends Component {

  handleLogOut(e) {
    localStorage.removeItem('token');
  }

  static contextTypes = {
		router: PropTypes.object
	}

  edit(e) {
		let userId = JSON.parse(atob(localStorage.getItem('token').split('.')[1])).id
		this.context.router.history.push(`/users/${userId}/edit`)
	}

  render() {
    let login =
    <div>
      <button
        className="sign button dropdown-content button-hover">
        <Link to="/login">
          Login
        </Link>
      </button>
    </div>

    let logout =
    <div>
      <button className="sign button dropdown-content button-hover" onClick={this.edit.bind(this)}>
        Edit
      </button>
      <button
        className="sign button dropdown-content button-hover">
        <Link to="/logout">
          Log out
        </Link>
      </button>
    </div>

    let home =
    <Link to="/">
      <img className="logo button-hover" alt="Home" src={logo}/>
    </Link>

    let dashboard =
    <Link to="/dashboard">
      <img className="logo button-hover" alt="Dashboard" src={logo}/>
    </Link>

    return (
      <div className="nav">
        <div>
          {this.props.isLoggedIn ? dashboard : home}
        </div>
        <Dropdown className="account-dropdown" ref="dropdown">
          <DropdownTrigger>
            <button
              data-toggle="dropdown"
              className=" user button button-hover">
              <i className="fa fa-2x fa-user-circle-o"
                aria-hidden="true">
              </i>
            </button>
          </DropdownTrigger>
          <DropdownContent>
            {this.props.isLoggedIn ? logout : login}
          </DropdownContent>
        </Dropdown>
      </div>
    )
  }
}

export default Nav;

import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { userID } from "./helpers.js";
import logo from "./images/logo.png";
import "./Nav.css";
import Dropdown, {
  DropdownTrigger,
  DropdownContent
} from "react-simple-dropdown";
import PropTypes from "prop-types";

class Nav extends Component {
  constructor(props) {
    super(props);
    this.edit = this.edit.bind(this);
    this.invite = this.invite.bind(this);
  }

  handleLogOut(e) {
    localStorage.removeItem("token");
  }

  edit(e) {
    this.props.history.push(`/users/${userID()}/edit`);
  }

  invite(e) {
    this.props.history.push(`/users/${userID()}/invite`);
  }

  render() {
    let nav = (
      <div>
        <Link to="/dashboard">
          <button className="button button-hover" type="submit" value="Submit">
            <i className="fa fa-2x fa-home" aria-hidden="true" />
          </button>
        </Link>

        <Link to="/playlists/new">
          <button className="button button-hover" type="submit" value="Submit">
            <i className="fa fa-2x fa-plus" aria-hidden="true" />
          </button>
        </Link>

        <Link to="/assessments">
          <button className="button button-hover" type="submit" value="Submit">
            <i className="fa fa-2x fa-folder-open" aria-hidden="true" />
          </button>
        </Link>
      </div>
    );

    let login = (
      <div>
        <button className="sign button dropdown-content button-hover">
          <Link to="/login">Login</Link>
        </button>
      </div>
    );

    let logout = (
      <div>
        <button
          className="sign button dropdown-content button-hover"
          onClick={this.edit.bind(this)}
        >
          Edit
        </button>
        <button
          className="sign button dropdown-content button-hover"
          onClick={this.invite.bind(this)}
        >
          Invite Doctor
        </button>
        <button className="sign button dropdown-content button-hover">
          <Link to="/login" onClick={this.handleLogOut}>
            Logout
          </Link>
        </button>
      </div>
    );

    let home = (
      <Link to="/">
        <img className="logo button-hover" alt="Home" src={logo} />
      </Link>
    );

    let dashboard = (
      <Link to="/dashboard">
        <img className="logo button-hover" alt="Dashboard" src={logo} />
      </Link>
    );

    return (
      <div className="nav">
        <div>{this.props.isLoggedIn ? dashboard : home}</div>

        <div>{this.props.isLoggedIn ? nav : null}</div>

        <Dropdown className="account-dropdown" ref="dropdown">
          <DropdownTrigger>
            <button
              data-toggle="dropdown"
              className=" user button button-hover"
            >
              <i className="fa fa-2x fa-user-circle-o" aria-hidden="true" />
            </button>
          </DropdownTrigger>
          <DropdownContent>
            {this.props.isLoggedIn ? logout : login}
          </DropdownContent>
        </Dropdown>
      </div>
    );
  }
}

Nav.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

export default withRouter(Nav);

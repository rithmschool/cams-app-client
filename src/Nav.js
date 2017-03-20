import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Nav extends Component {

  handleLogOut(e) {
    localStorage.removeItem('token');
  }

  render() {
    let login = <Link to="/login">Log In</Link>
    let logout = <Link to="/login" onClick={this.handleLogOut}>Log Out</Link>
    let playlist_form_link = (this.props.isLoggedIn) ?
    <div>
      <Link to="/playlists/new">Add Playlist</Link>
    </div> :
      null;
    return (
      <nav>
        <p>CAMS</p>
        {this.props.isLoggedIn ? logout : login}
        {playlist_form_link}
      </nav>
    )
  }
}

export default Nav;

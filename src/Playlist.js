import React, { Component } from "react";
import { Link } from "react-router-dom";

class Playlist extends Component {
  handleSubmit(e) {
    e.preventDefault();
    this.props.sendMail(e.target.email.value);
  }

  render() {
    const { id, name, videos } = this.props;
    let videoList = videos.map((v, i) => (
      <li key={`Playlist:${id}_Screen${v.id}_index:${i}`} className="Videos">
        {v.title}
      </li>
    ));
    return (
      <tr className="Playlist">
        <td>
          <label htmlFor={`PlayList${id}`}>
            <h5 className="playlist-name-title">{name}</h5>
          </label>
          <Link to={`playlists/${id}/edit`}>Edit</Link>
          <input id={`PlayList${id}`} type="checkbox" className="hidden" />
          <ol className="toggle">{videoList}</ol>
        </td>
        <td>
          <form onSubmit={this.props.sendMail}>
            <input name="email" type="email" />
            <button type="submit">Send</button>
          </form>
        </td>
      </tr>
    );
  }
}
export default Playlist;

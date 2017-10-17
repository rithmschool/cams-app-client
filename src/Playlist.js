import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      showList: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({ showList: !this.state.showList });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.sendMail(this.state.email);
    this.setState({ email: "" });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    const { id, name, videos } = this.props;

    let videoList = this.state.showList
      ? videos.map((v, i) => (
          <li
            key={`Playlist:${id}_Screen${v.id}_index:${i}`}
            className="Videos"
          >
            {v.title}
          </li>
        ))
      : null;

    return (
      <tr className="Playlist">
        <td>
          <h5 className="playlist-name-title">{name}</h5>
          <button onClick={this.onClick}>
            {this.state.showList ? "Hide" : "Show"}
          </button>
          <Link to={`playlists/${id}/edit`}>Edit</Link>
          <ol>{videoList}</ol>
        </td>
        <td>
          <form onSubmit={this.handleSubmit}>
            <input
              name="email"
              type="email"
              onChange={this.handleChange}
              value={this.state.email}
            />
            <button type="submit">Send</button>
          </form>
        </td>
      </tr>
    );
  }
}

Playlist.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  videos: PropTypes.array,
  sendMail: PropTypes.func.isRequired
};

export default Playlist;

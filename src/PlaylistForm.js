import React, { Component } from "react";
import { config } from "./helpers.js";
import PropTypes from "prop-types";

class PlaylistForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.addPlaylist(config(), this.state);
    this.setState({ name: "" });
  }

  componentDidUpdate() {
    this.nameInput.focus();
  }

  render() {
    let error = this.props.error ? (
      <p>Playlist name already taken. Please choose a different one.</p>
    ) : null;
    return (
      <div>
        <h3 className="">Add Playlist</h3>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input
            ref={input => {
              this.nameInput = input;
            }}
            type="string"
            required
            onChange={this.handleChange.bind(this)}
            name="name"
            placeholder="Playlist Name"
            value={this.state.name}
          />
          <button className="button button-hover" type="submit" value="Submit">
            Submit
          </button>
          {error}
        </form>
      </div>
    );
  }
}

PlaylistForm.propTypes = {
  error: PropTypes.bool.isRequired,
  addPlaylist: PropTypes.func.isRequired
};

export default PlaylistForm;

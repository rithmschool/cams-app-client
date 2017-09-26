import React, { Component } from "react";
import PlaylistForm from "./PlaylistForm";
import ScreenWrapper from "./ScreenWrapper";
import { BASE_URL, userID } from "./helpers.js";
import axios from "axios";
import PropTypes from "prop-types";

class PlaylistWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistID: null,
      error: false,
      cleared: false
    };
    this.addPlaylist = this.addPlaylist.bind(this);
  }

  addPlaylist(config, data) {
    axios
      .post(`${BASE_URL}/api/users/${userID()}/playlists`, data, config)
      .then(response => {
        let playlistID = response.data.id;
        this.setState({ error: false, playlistID: playlistID, cleared: true });
      })
      .catch(error => {
        this.setState({ error: true });
      });
  }

  componentWillMount() {
    if (this.props.match.params.playlistID) {
      this.setState({ playlistID: this.props.match.params.playlistID });
    }
  }

  componentDidUpdate() {
    if (
      !this.props.editPlaylist &&
      this.state.playlistID !== null &&
      !this.state.cleared
    ) {
      this.setState({ playlistID: null, cleared: true });
    }
  }

  render() {
    const { editPlaylist } = this.props;
    let banner = editPlaylist === true ? "Edit" : "New";
    return (
      <div>
        <div className="banner-text">
          <h1 className="banner-bold">{banner} Playlist</h1>
        </div>
        <div className="content">
          <div>
            {this.state.playlistID ? (
              <ScreenWrapper
                playlistID={+this.state.playlistID}
                editPlaylist={editPlaylist}
              />
            ) : (
              <PlaylistForm
                addPlaylist={this.addPlaylist}
                error={this.state.error}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

PlaylistWrapper.propTypes = {
  editPlaylist: PropTypes.bool.isRequired
};

export default PlaylistWrapper;

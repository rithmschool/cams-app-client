import React, { Component } from "react";
import { BASE_URL, userID, config } from "./helpers.js";
import axios from "axios";
import "./Dashboard.css";
import Playlist from "./Playlist";

const Close = ({ handleClose }) => (
  <div onClick={handleClose}>
    <i className="fa delete fa-times-circle button-hover" aria-hidden="true" />
  </div>
);

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userPlaylists: [],
      successMessage: "",
      loading: false
    };
  }

  sendMail(playlistID, email) {
    this.setState({ loading: true });
    window.scrollTo(0, 0);
    axios
      .post(
        `${BASE_URL}/api/users`,
        {
          email: email
        },
        config()
      )
      .then(response =>
        axios.post(
          `${BASE_URL}/api/users/${userID()}/assessments`,
          {
            patient_id: response.data.id,
            playlist_id: playlistID,
            doctor_id: userID()
          },
          config()
        )
      )
      .then(response => {
        return axios.post(
          `${BASE_URL}/api/users/mail`,
          {
            assessment_id: response.data.id,
            patient_id: response.data.patient_id
          },
          config()
        );
      })
      .then(response => {
        this.setState({
          successMessage: response.data.message,
          loading: false
        });
      });
  }

  componentWillMount() {
    axios
      .get(`${BASE_URL}/api/users/${userID()}/playlists`, config())
      .then(response => {
        this.setState({ userPlaylists: response.data });
      });
  }
  render() {
    let loadingMessage = this.state.loading ? (
      <div className="loading">
        Please wait, we are sending your email now.
        <i className="fa fa-spinner fa-spin" aria-hidden="true" />
      </div>
    ) : null;

    let successMessage = this.state.successMessage ? (
      <div className="email-sent">
        {this.state.successMessage}
        <Close handleClose={this.closeSelection} />
      </div>
    ) : null;
    let playlists = this.state.userPlaylists.map((playlist, i) => {
      return (
        <Playlist
          key={playlist.id}
          id={playlist.id}
          name={playlist.name}
          videos={playlist.videos}
          sendMail={this.sendMail.bind(this, playlist.id)}
        />
      );
    });

    return (
      <div>
        <div className="banner-text">
          <h1 className="banner-bold">Dashboard</h1>
        </div>
        <div className="content">
          {loadingMessage}
          {successMessage}
          <table>
            <thead>
              <tr>
                <th id="playlist-name">Name</th>
                <th>Invite</th>
              </tr>
            </thead>
            <tbody>{playlists}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Dashboard;

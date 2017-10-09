import React, { Component } from "react";
import { BASE_URL, userID, config } from "./helpers.js";
import axios from "axios";
import { Link } from "react-router-dom";
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
      email: "",
      playlistID: null,
      playlistName: null,
      userPlaylists: [],
      successMessage: "",
      loading: false
    };
    this.closeSelection = this.closeSelection.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  sendMail(config) {
    this.setState({ loading: true });
    window.scrollTo(0, 0);
    axios
      .post(
        `${BASE_URL}/api/users`,
        {
          email: this.state.email
        },
        config
      )
      .then(response =>
        axios.post(
          `${BASE_URL}/api/users/${userID()}/assessments`,
          {
            patient_id: response.data.id,
            playlist_id: this.state.playlistID,
            doctor_id: userID()
          },
          config
        )
      )
      .then(response => {
        return axios.post(
          `${BASE_URL}/api/users/mail`,
          {
            assessment_id: response.data.id,
            patient_id: response.data.patient_id
          },
          config
        );
      })
      .then(response => {
        this.setState({
          playlistID: null,
          playlistName: null,
          email: "",
          successMessage: response.data.message,
          loading: false
        });
      });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.sendMail(config());
  }

  closeSelection() {
    this.setState({ playlistID: null, playlistName: null, successMessage: "" });
  }

  choosePlaylist(playlist_id, playlistName) {
    if (
      this.state.playlistID === null ||
      playlist_id !== this.state.playlistID
    ) {
      this.setState({ playlistID: playlist_id, playlistName: playlistName });
    }
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
      // let showForm =
      //   this.state.playlistName === playlist.name ? (
      //     <div>
      //       <form className="email" onSubmit={this.handleSubmit}>
      //         <h5>Send to:</h5>
      //         <input
      //           type="email"
      //           name="email"
      //           placeholder="email"
      //           value={this.state.email}
      //           required
      //           onChange={this.handleChange}
      //         />
      //         <button
      //           className="button button-hover"
      //           type="submit"
      //           value="Submit"
      //         >
      //           Submit
      //         </button>
      //       </form>
      //       <div className="spacearound">
      //         <Close handleClose={this.closeSelection} />
      //         <Link to={`playlists/${playlist.id}/edit`}>
      //           <i
      //             className="fa fa-pencil-square button-hover delete"
      //             aria-hidden="true"
      //           />
      //         </Link>
      //       </div>
      //     </div>
      //   ) : null;

      //let className = this.state.playlistID === playlist.id ? "selected" : null;

      // return (
      //   <div
      //     key={i}
      //     tabIndex="0"
      //     className={`${className} playlist-card button-hover playlist-card-contents`}
      //     onClick={this.choosePlaylist.bind(this, playlist.id, playlist.name)}
      //   >
      //     <h5 className="playlist-name-title">{playlist.name}</h5>
      //     {playlist.videos.map((video, idx) => {
      //       return (
      //         <p className="video-title" key={idx}>
      //           {video.title}
      //         </p>
      //       );
      //     })}
      //     {showForm}
      //   </div>
      // );
      return (
        <Playlist
          key={playlist.id}
          id={playlist.id}
          name={playlist.name}
          videos={playlist.videos}
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
                <th>Name</th>
                <th>Invite</th>
              </tr>
            </thead>
            {playlists}
          </table>
        </div>
      </div>
    );
  }
}

export default Dashboard;

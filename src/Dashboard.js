import React, {Component} from 'react';
import {BASE_URL, userID, config} from './helpers.js';
import axios from 'axios';
import {Link} from 'react-router-dom';

class Dashboard extends Component{

  constructor(props) {
    super(props)
    this.state = {
      email: "",
      playlistID: null,
      playlistName: null,
      userPlaylists: [],
    }
    this.closeSelection = this.closeSelection.bind(this)
  }

  sendMail(config, thisArg) {
    axios.post(`${BASE_URL}/api/users`, {
      email: thisArg.state.email
    }, config)
    .then(response => axios.post(`${BASE_URL}/api/users/${userID()}/assessments`, {
      patient_id: response.data.id,
      playlist_id: thisArg.state.playlistID,
      doctor_id: userID()
      }, config))
    .then(response => axios.post(`${BASE_URL}/api/users/mail`, {
      assessment_id: response.data.id,
      patient_id: response.data.patient_id
      }, config))
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault()
    this.sendMail(config(), this)
  }

  closeSelection() {
    this.setState({playlistID: null, playlistName: null})
  }

  choosePlaylist(playlist_id, playlistName){
    if (this.state.playlistID === null || playlist_id !== this.state.playlistID){
      this.setState({playlistID: playlist_id, playlistName: playlistName})
    }
  }

  componentWillMount(){
    axios.get(
      `${BASE_URL}/api/users/${userID()}/playlists`, config()
    ).then(response => {
      this.setState({userPlaylists: response.data})
    })
  }
  render() {
    let playlists = this.state.userPlaylists.map((playlist, i) => {
      let showForm = this.state.playlistName === playlist.name ?
        <div>
          <form className="email" onSubmit={this.handleSubmit.bind(this)}>
            <h5>Send to:</h5>
            <input
              type="email"
              name="email"
              placeholder="email"
              value={this.state.email}
              required onChange={this.handleChange.bind(this)}
            />
            <button
              className="button button-hover"
              type="submit"
              value="Submit">
              Submit
            </button>
          </form>
          <div className="spacearound">
            <div onClick={this.closeSelection}>
              <i className="fa delete fa-times-circle button-hover" aria-hidden="true"></i>
            </div>
            <Link to={`playlists/${playlist.id}/edit`}><i className="fa fa-pencil-square button-hover delete" aria-hidden="true"></i></Link>
          </div>
        </div> 
        :
        null

      let className =
        this.state.playlistID === playlist.id ?
          'selected' :
          'playlist-card'

      return(
        <div
          key={i}
          tabIndex="0"
          className={`${className} button-hover playlist-card-contents`}
          onClick={this.choosePlaylist.bind(this, playlist.id, playlist.name)}
        >
          <h5 className="playlist-name-title">{playlist.name}</h5>
          {playlist.videos.map((video, idx) => {
            return(
              <p className="song-title" key={idx} >
                {video.title}
              </p>
            )
          })
        }
        {showForm}
      </div>
      )
    })
    return (
      <div>
        <div className="banner-text">
          <h1 className="banner-bold">Dashboard</h1>
        </div>
        <div className="content">
          <div className="playlist-container">
            {playlists}
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard;

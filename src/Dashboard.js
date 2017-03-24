import React, {Component} from 'react';
import {BASE_URL} from './helpers.js';
import axios from 'axios';
import {Link} from 'react-router-dom'

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
		.then(response => axios.post(`${BASE_URL}/api/assessments`, {
			patient_id: response.data.id,
			playlist_id: thisArg.state.playlistID
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
		let config = {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': 'bearer ' + localStorage.getItem('token')
			}
		}
		e.preventDefault()
		this.sendMail(config, this)
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
    let userId = JSON.parse(atob(localStorage.getItem('token').split('.')[1])).id
    axios.get(
      `${BASE_URL}/api/users/${userId}/playlists`,
      {
        headers: {
        	'Accept':'application/json',
          'ContentType':'application/json',
          'Authorization':'bearer ' + localStorage.getItem('token')
        }
      }
    ).then(response => {
      this.setState({userPlaylists: response.data})
    })
  }

  render() {
    let playlists = this.state.userPlaylists.map((playlist, i) => {
			let showForm = this.state.playlistName === playlist.name ?
				<div>
					<form onSubmit={this.handleSubmit.bind(this)}>
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
					<div onClick={this.closeSelection}>
						<i className="fa delete fa-times-circle button-hover" aria-hidden="true"></i>
					</div>
				</div> :
				null
			let className =
				this.state.playlistID === playlist.id ?
					'selected' :
					'playlist-card'
			return(
				<div
					key={i}
					tabIndex="0"
					className={`${className} button-hover`}
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
          <div className="dash-nav">
            <Link to="/playlists/new">
              <button
                className="button button-hover big-nav"
                type="submit"
                value="Submit">
                  New Playlist
              </button>
            </Link>
						<Link to="/assessments">
							<button
								className="button button-hover big-nav"
								type="submit"
								value="Submit">
									Assessments
							</button>
						</Link>
          </div>
					<div className="playlist-card">
						{playlists}
					</div>
        </div>
      </div>
		)
	}
}

export default Dashboard;

import React, {PropTypes, Component} from 'react';
import {BASE_URL} from './helpers.js';
import axios from 'axios';
import {Link} from 'react-router-dom'

class Dashboard extends Component{

	constructor(props) {
		super(props)
		this.state = {
			email: "",
			playlist: null,
			playlist_name:null,
      user_playlists: [],
			active:'hidden'
		}
		this.handleBlur = this.handleBlur.bind(this)
	}

	static contextTypes = {
		router: PropTypes.object
	}

	sendMail(config, thisArg) {
		axios.post(`${BASE_URL}/api/users`, {
			email: thisArg.state.email
		}, config)
		.then(response => axios.post(`${BASE_URL}/api/assessments`, {
			patient_id: response.data.id,
			playlist_id: thisArg.state.playlist
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
	handleBlur() {
		this.setState({playlist:null})
	}

	choosePlaylist(playlist_id,playlist_name){
		if (this.state.playlist === null || playlist_id !== this.state.playlist){
			this.setState({playlist: playlist_id, active:"",playlist_name:playlist_name})
		}
		else if(this.state.playlist !== null){
			this.setState({playlist: null, active:"hidden", playlist_name:null})
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
      this.setState({user_playlists: response.data})
    })
  }

  render() {
    let playlists = this.state.user_playlists.map((playlist, i) => {
			let className =
				this.state.playlist === playlist.id ?
					'selected' :
					'playlist-card'
			let deletePlaylist =
				this.state.playlist === playlist.id ?
					'none' : 'hidden'
			return(
				<div
					key={i}
					tabIndex="0"
					className={`${className} button-hover`}
					onClick={this.choosePlaylist.bind(this, playlist.id, playlist.name)}
					onBlur={this.handleBlur}
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
				<div className={deletePlaylist}>
					<i className="fa delete fa-times-circle" aria-hidden="true"></i>
				</div>
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
						<Link to="/playlists/new">
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
						<form className={this.state.active} onSubmit={this.handleSubmit.bind(this)}>
							<h5>Send {this.state.playlist_name} to:</h5>
							<input
								type="email"
								name="email"
								placeholder="email"
								required onChange={this.handleChange.bind(this)}
							/>
							<button
								className="button button-hover"
								type="submit"
								value="Submit">
								Submit
							</button>
						</form>
        </div>
      </div>
		)
	}
}

export default Dashboard;

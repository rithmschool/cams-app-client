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
      user_playlists: []
		}
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

	choosePlaylist(playlist_id){
		this.setState({playlist: playlist_id})
		console.log(this.state.playlist)
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
			return(
				<div key={i} onClick={this.choosePlaylist.bind(this, playlist.id)}>
					{playlist.name}
					{playlist.videos.map((video, idx) => {
						return(
							<p key={idx} >
								{video.title}
							</p>
						)
					})
				}
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
          </div>
					<div>
						{playlists}
					</div>
          <form onSubmit={this.handleSubmit.bind(this)}>
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

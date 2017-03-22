import React, {PropTypes, Component} from 'react';
import {BASE_URL} from './helpers.js';
import axios from 'axios';

class Dashboard extends Component {

	constructor(props) {
		super(props)
		this.state = {
			email: "",
			playlist: "",
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

	handleSubmit(event) {
		let config = {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': 'bearer ' + localStorage.getItem('token')
			}
		}
		event.preventDefault()
		this.sendMail(config, this)
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
      console.log(response.data)
      this.setState({user_playlists: response.data})
    })
  }

  render() {
    let playlists = this.state.user_playlists.map((playlist, i) => {
			return(
				<ul key={i}>
					{playlist.name}
					{playlist.videos.map((video, idx) => {
							return(
								<li key={idx}>
									{video.title}
								</li>
							)
						})
					}
				</ul>
			)
		})
		return (
			<div>
				<h1>Dashboard</h1>
				<form onSubmit={this.handleSubmit.bind(this)}>
					<input type="email" name="email" placeholder="email" required onChange={this.handleChange.bind(this)}/>
					<button type="submit" value="Submit">Submit</button>
				</form>
				<div>
					{playlists}
				</div>
			</div>
		)
	}
}

export default Dashboard;

import React, {PropTypes, Component} from 'react';
import {BASE_URL} from './helpers.js';
import axios from 'axios';

class PlaylistForm extends Component {

  constructor(props){
    super(props)
    this.state = {
      name: "",
    }
  }

  static contextTypes = {
    router: PropTypes.object
  }

  addPlaylist(config, thisArg) {
    let userId = JSON.parse(atob(localStorage.getItem('token').split('.')[1])).id
    axios.post(`${BASE_URL}/api/users/${userId}/playlists`,
    thisArg.state, config).then(response =>{
      let playlistId = response.data.id
      thisArg.props.addPlaylistId(playlistId)
    })
  }

  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(event){
    let config = {
      headers: {
        'Accept':'application/json',
        'ContentType':'application/json',
        'Authorization': 'bearer ' + localStorage.getItem('token')
      }
    }
    event.preventDefault()
    this.addPlaylist(config, this)
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit.bind(this)}>
        <input type="string" onChange={this.handleChange.bind(this)}
          name="name" placeholder="Playlist Name"/>
        <button type="submit" value="Submit">Submit</button>
      </form>
    )
  }
}

export default PlaylistForm;

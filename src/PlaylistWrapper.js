import React, {Component} from 'react';
import PlaylistForm from './PlaylistForm';
import VideoWrapper from './VideoWrapper';
import {BASE_URL} from './helpers.js';
import axios from 'axios';

class PlaylistWrapper extends Component {

  constructor(props){
    super(props);
    this.state = {
      playlistId: null,
      error: false
    }
    this.addPlaylistId = this.addPlaylistId.bind(this)
    this.addPlaylist = this.addPlaylist.bind(this)
  }

  addPlaylistId(id){
    this.setState({playlistId: id})
  }

  addPlaylist(config, thisArg) {
    let userId = JSON.parse(atob(localStorage.getItem('token').split('.')[1])).id
    axios.post(`${BASE_URL}/api/users/${userId}/playlists`,
    thisArg.state, config)
    .then(response =>{
      let playlistId = response.data.id
      this.addPlaylistId(playlistId)
      this.setState({error: false})
    }).catch(error =>{
      this.setState({error: true})
    })
  }

  render(){
    return(
      <div>
        {
          this.state.playlistId ?
          <VideoWrapper playlistId={this.state.playlistId}/> :
          <PlaylistForm addPlaylist={this.addPlaylist} error={this.state.error}/>
        }
      </div>
    )
  }
}

export default PlaylistWrapper;

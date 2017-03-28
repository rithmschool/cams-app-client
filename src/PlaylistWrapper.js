import React, {Component} from 'react';
import PlaylistForm from './PlaylistForm';
import VideoWrapper from './VideoWrapper';
import {BASE_URL}, {getUserId} from './helpers.js';
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
    let userId = getUserId()
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
        <div className="banner-text">
          <h1 className="banner-bold">New Playlist</h1>
        </div>
        <div className="content">
      <div>
        {
          this.state.playlistId ?
          <VideoWrapper playlistId={this.state.playlistId}/> :
          <PlaylistForm addPlaylist={this.addPlaylist} error={this.state.error}/>
        }
      </div>
    </div>
  </div>
    )
  }
}

export default PlaylistWrapper;

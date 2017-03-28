import React, {Component} from 'react';
import PlaylistForm from './PlaylistForm';
import VideoWrapper from './VideoWrapper';
import {BASE_URL, userID} from './helpers.js';
import axios from 'axios';

class PlaylistWrapper extends Component {

  constructor(props){
    super(props);
    this.state = {
      playlistID: null,
      error: false
    }
    this.addPlaylistId = this.addPlaylistId.bind(this)
    this.addPlaylist = this.addPlaylist.bind(this)
  }

  addPlaylistId(id){
    this.setState({playlistID: id})
  }

  addPlaylist(config, thisArg) {
    axios.post(`${BASE_URL}/api/users/${userID}/playlists`,
    thisArg.state, config)
    .then(response =>{
      let playlistID = response.data.id
      this.addPlaylistId(playlistID)
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
          this.state.playlistID ?
          <VideoWrapper playlistID={this.state.playlistID}/> :
          <PlaylistForm addPlaylist={this.addPlaylist} error={this.state.error}/>
        }
      </div>
    </div>
  </div>
    )
  }
}

export default PlaylistWrapper;

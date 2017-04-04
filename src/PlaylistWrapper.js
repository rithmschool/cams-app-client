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
    axios.post(`${BASE_URL}/api/users/${userID()}/playlists`,
    thisArg.state, config)
    .then(response =>{
      let playlistID = response.data.id
      this.addPlaylistId(playlistID)
      this.setState({error: false})
    }).catch(error =>{
      this.setState({error: true})
    })
  }

  componentWillMount(){
    if (this.props.match.params.playlistID){
      this.setState({playlistID: this.props.match.params.playlistID} )
    }
  }

  componentDidUpdate(){
    if (this.props.editPlaylist === "false" && this.state.playlistID != null){
      this.setState({playlistID: null})
    }
  }

  render(){
    let banner = this.props.editPlaylist === "true" ? "Edit" : "New"
    return(
      <div>
        <div className="banner-text">
          <h1 className="banner-bold">{banner} Playlist</h1>
        </div>
        <div className="content">
      <div>
        {
          this.state.playlistID ?
          <VideoWrapper playlistID={parseInt(this.state.playlistID)} editPlaylist={this.props.editPlaylist}/> :
          <PlaylistForm addPlaylist={this.addPlaylist} error={this.state.error}/>
        }
      </div>
    </div>
  </div>
    )
  }
}

export default PlaylistWrapper;

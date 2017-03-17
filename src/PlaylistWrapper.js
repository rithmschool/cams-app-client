import React, {Component} from 'react';
import PlaylistForm from './PlaylistForm';
import VideoWrapper from './VideoWrapper';

class PlaylistWrapper extends Component {

  constructor(props){
    super(props);
    this.state = {
      playlistId: null
    }
  }

  addPlaylistId(id){
    this.setState({playlistId: id})
  }

  render(){
    return(
      <div>
        {
          this.state.playlistId ?
          <VideoWrapper playlistId={this.state.playlistId}/> :
          <PlaylistForm addPlaylistId={this.addPlaylistId.bind(this)}/>
        }
      </div>
    )
  }
}

export default PlaylistWrapper;

import React, {PropTypes, Component} from 'react';
import VideoForm from './VideoForm';
import {BASE_URL} from './helpers.js';
import axios from 'axios';
import getYouTubeID from 'get-youtube-id';

class VideoWrapper extends Component {

  constructor(props){
    super(props)
    this.state = {
      videoTitles: []
    }
    this.addVideo = this.addVideo.bind(this)
    this.addDone = this.addDone.bind(this)
  }

  static contextTypes = {
    router: PropTypes.object
  }

  addVideo(url) {
    let config = {
      headers: {
        'Accept':'application/json',
        'ContentType':'application/json',
        'Authorization':'bearer ' + localStorage.getItem('token')
      }
    }
    let youtube_id = getYouTubeID(url)
    return axios.post(`${BASE_URL}/api/videos`,
    {url, youtube_id}, config)
    .then(function(response) {
      axios.post(`${BASE_URL}/api/screens`, {
        video_id: response.data.id,
        playlist_id: this.props.playlistId,
        order: this.state.videoTitles.length+1
      }, config)
      this.setState({
        videoTitles: this.state.videoTitles.concat(response.data.title)
      })
    }.bind(this))
  }

  addDone(url){
    if(url){
      this.addVideo(url).then(function(response) {
        this.context.router.history.push('/dashboard')
      }.bind(this))
    }
    this.context.router.history.push('/dashboard')
  }

  render(){
    var formComponents = []
    for(var i=0; i<this.state.videoTitles.length; i++){
      formComponents.push(
        <div key={i}>
          {this.state.videoTitles[i]}
        </div>
      )
    }
    return(
      <div>
        <h3 className="">Add Videos</h3>
        {formComponents}
        <VideoForm addVideo={this.addVideo} addDone={this.addDone}/>
      </div>
    )
  }
}

export default VideoWrapper;

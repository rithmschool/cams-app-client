import React, {PropTypes, Component} from 'react';
import VideoForm from './VideoForm';
import {BASE_URL} from './helpers.js';
import axios from 'axios';
import getYouTubeID from 'get-youtube-id';

class VideoWrapper extends Component {

  constructor(props){
    super(props)
    this.state = {
      urls: []
    }
    this.addContinue = this.addContinue.bind(this)
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
      return axios.post(`${BASE_URL}/api/screens`, {
        video_id: response.data.id,
        playlist_id: this.props.playlistId,
        order: this.state.urls.length+1
      }, config)
    }.bind(this))
  }

  addContinue(url) {
    this.addVideo(url).then(function(response) {
      this.setState({urls: this.state.urls.concat(url)})
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
    for(var i=0; i<this.state.urls.length; i++){
      formComponents.push(
        <div key={i}>
          {this.state.urls[i]}
        </div>
      )
    }
    return(
      <div>
        {formComponents}
        <VideoForm addContinue={this.addContinue} addDone={this.addDone}/>
      </div>
    )
  }
}

export default VideoWrapper;

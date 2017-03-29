import React, {PropTypes, Component} from 'react';
import VideoForm from './VideoForm';
import {BASE_URL, config} from './helpers.js';
import axios from 'axios';
import getYouTubeID from 'get-youtube-id';

class VideoWrapper extends Component {

  constructor(props){
    super(props)
    this.state = {
      screenData: []
    }
    this.addVideo = this.addVideo.bind(this)
    this.addDone = this.addDone.bind(this)
    this.addQuestion = this.addQuestion.bind(this)
  }

  static contextTypes = {
    router: PropTypes.object
  }

  addVideo(url) {
    let youtubeID = getYouTubeID(url)
    return axios.post(`${BASE_URL}/api/videos`, {
      url,
      youtube_id: youtubeID
    }, config)
    .then(function(response) {
      axios.post(`${BASE_URL}/api/screens`, {
        video_id: response.data.id,
        playlist_id: this.props.playlistId,
        order: this.state.screenData.length+1
      }, config)
      debugger
      this.setState({
        screenData: this.state.screenData.concat("Video:  " + response.data.title)
      })
    }.bind(this))
  }

  addQuestion(question) {
    if(question) { 
    this.setState({
      screenData: this.state.screenData.concat("Question:  " + question)
    })
  }}

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
    for(var i=0; i<this.state.screenData.length; i++){
      formComponents.push(
        <div key={i}>
          {this.state.screenData[i]}

        </div>
      )
    }
    return(
      <div>
        <h3 className="">Add Videos</h3>
        {formComponents}
        <VideoForm addQuestion={this.addQuestion} addVideo={this.addVideo} addDone={this.addDone}/>
      </div>
    )
  }
}

export default VideoWrapper;

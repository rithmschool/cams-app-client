import React, {PropTypes, Component} from 'react';
import VideoForm from './VideoForm';
import {BASE_URL, config} from './helpers.js';
import axios from 'axios';
import getYouTubeID from 'get-youtube-id';

class VideoWrapper extends Component {

  constructor(props){
    super(props)
    this.state = {
      videoTitles: [],
      questions: []
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
        playlist_id: this.props.playlistID,
        order: this.state.videoTitles.length+1
      }, config)
      this.setState({
        videoTitles: this.state.videoTitles.concat(response.data.title)
      })
    }.bind(this))
  }

  addQuestion(question) {
    debugger
    this.setState({
      questions: this.state.questions.concat([question, this.state.videoTitles.length])
    })
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
        <VideoForm addQuestion={this.addQuestion} addVideo={this.addVideo} addDone={this.addDone}/>
      </div>
    )
  }
}

export default VideoWrapper;

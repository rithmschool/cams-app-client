import React, {PropTypes, Component} from 'react';
import VideoForm from './VideoForm';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:5000'

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
        'Authorization': 'bearer ' + localStorage.getItem('token')
      }
    }
    return axios.post(`${BASE_URL}/api/videos`,
    {url}, config)
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
    this.addVideo(url).then(function(response) {
      this.context.router.history.push('/dashboard')
    }.bind(this))
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

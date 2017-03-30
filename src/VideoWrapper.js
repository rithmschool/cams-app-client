import React, {PropTypes, Component} from 'react';
import VideoForm from './VideoForm';
import {BASE_URL, config} from './helpers.js';
import axios from 'axios';
import getYouTubeID from 'get-youtube-id';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

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
        videoTitles: this.state.videoTitles.concat([[response.data.title, response.data.id]])
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

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState({
      videoTitles: arrayMove(this.state.videoTitles, oldIndex, newIndex),
    });
    this.state.videoTitles.map((value,index) => {
      axios.patch(`${BASE_URL}/api/screens`, {
        video_id: value[1],
        playlist_id: this.props.playlistID,
        order: index+1
      }, config)
    })
  };

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
        <SortableList videoTitles={this.state.videoTitles} onSortEnd={this.onSortEnd} />
        <VideoForm addVideo={this.addVideo} addDone={this.addDone}/>
      </div>
    )
  }
}

const SortableVideo = SortableElement(({value, key}) => <li className="grabbable">{value}</li>);

const SortableList = SortableContainer(({videoTitles}) => {
  return (
    <ol>
      {videoTitles.map((value, index) => (
        <SortableVideo key={index + 1} index={index} value={value[0]} />
        ))}
    </ol>
    );
})

export default VideoWrapper;

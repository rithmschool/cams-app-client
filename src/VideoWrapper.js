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
        screen_entity_id: response.data.id,
        playlist_id: this.props.playlistID,
        order: this.state.screenData.length+1,
        screen_entity_type: 'video'
      }, config)
      this.setState({
        screenData: this.state.screenData.concat("Video:  " + response.data.title),
        order: this.state.screenData.length+1
      })
    }.bind(this))
  }

  addQuestion(question) {
    if(question){  
      return axios.post(`${BASE_URL}/api/questions`,{
        text: question
      }, config)
      .then(response => {
        axios.post(`${BASE_URL}/api/screens`, {
        screen_entity_id: response.data.id,
        playlist_id: this.props.playlistID,
        order: this.state.screenData.length+1,
        screen_entity_type: 'question'
      }, config)
        console.log(response)
        this.setState({
          screenData: this.state.screenData.concat("Question:  " + question)
        })
    })
  }
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
      screenData: arrayMove(this.state.screenData, oldIndex, newIndex),
    });
  };

  componentDidUpdate(){
    this.state.screenData.map((value,index) => {
      axios.patch(`${BASE_URL}/api/screens`, {
        video_id: value.entity_id,
        playlist_id: this.props.playlistID,
        order: index+1
      }, config)
    })
  }

  render(){

    return(
      <div>
        <h3 className="">Add Videos</h3>
        <SortableList screens={this.state.screenData} onSortEnd={this.onSortEnd} />
        <VideoForm addQuestion={this.addQuestion} addVideo={this.addVideo} addDone={this.addDone}/>
      </div>
    )
  }
}

const SortableVideo = SortableElement(({value, key}) => <li className="grabbable" key={key}>{value}</li>);

const SortableList = SortableContainer(({screens}) => {
  return (
    <ol>
      {screens.map((value, index) => (
        <SortableVideo key={index + 1} index={index} value={value.title} />
        ))}
    </ol>
    );
})

export default VideoWrapper;

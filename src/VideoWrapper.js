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
      screens: []
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
        order: this.state.screens.length+1
      }, config)
      this.setState({
        screens: this.state.screens.concat([{title: response.data.title, entity_id: response.data.id}])
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
      screens: arrayMove(this.state.screens, oldIndex, newIndex),
    });
  };

  componentDidUpdate(){
    this.state.screens.map((value,index) => {
      axios.patch(`${BASE_URL}/api/screens`, {
        video_id: value.entity_id,
        playlist_id: this.props.playlistID,
        order: index+1
      }, config)
    })
  }

  componentWillMount(){
    if(this.props.editPlaylist){
      axios.get(`${BASE_URL}/api/screens`, {
        playlist_id: this.props.playlistID
      }, config).then(response => {
      this.setState({screens: response.data})
        })
      }
    }

  render(){
    return(
      <div>
        <h3 className="">Add Videos</h3>
        <SortableList screens={this.state.screens} onSortEnd={this.onSortEnd} />
        <VideoForm addVideo={this.addVideo} addDone={this.addDone}/>
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

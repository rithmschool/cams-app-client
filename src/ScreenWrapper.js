import React, {PropTypes, Component} from 'react';
import ScreenForm from './ScreenForm';
import {BASE_URL, config, userID} from './helpers.js';
import axios from 'axios';
import getYouTubeID from 'get-youtube-id';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import RichQuestionEditor from './RichQuestionEditor.js';

class ScreenWrapper extends Component {

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
    }, config())
    .then(response => {
      axios.post(`${BASE_URL}/api/screens`, {
        entity_id: response.data.id,
        playlist_id: this.props.playlistID,
        order: this.state.screenData.length+1,
        type: 'video'
      }, config())
      this.setState({
        screenData: this.state.screenData.concat([{
          title: response.data.title,
          entity_id: response.data.id,
          type: 'video'
        }]),
      })
    })
  }

  addQuestion(html) {
    return axios.post(`${BASE_URL}/api/questions`,{
        title: html
      }, config())
      .then(response => {
        axios.post(`${BASE_URL}/api/screens`, {
        entity_id: response.data.id,
        playlist_id: this.props.playlistID,
        order: this.state.screenData.length+1,
        type: 'question'
      }, config())
      this.setState({
        screenData: this.state.screenData.concat([{
          title: response.data.title,
          entity_id: response.data.id,
          type: 'question'
        }])
      })
    })
  }

//   addQuestion(question) {
//     if(question){  
//       return axios.post(`${BASE_URL}/api/questions`,{
//         title: question
//       }, config())
//       .then(response => {
//         axios.post(`${BASE_URL}/api/screens`, {
//         entity_id: response.data.id,
//         playlist_id: this.props.playlistID,
//         order: this.state.screenData.length+1,
//         type: 'question'
//       }, config())
//       this.setState({
//         screenData: this.state.screenData.concat([{
//           title: question,
//           entity_id: response.data.id,
//           type: 'question'
//         }])
//       })
//     })
//   }
// }

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
    this.state.screenData.forEach((value,index) => {
      axios.patch(`${BASE_URL}/api/screens`, {
        entity_id: value.entity_id,
        playlist_id: this.props.playlistID,
        order: index+1,
        type: value.type
      }, config())
    })
  }

  componentWillMount(){
    if(this.props.editPlaylist){ 
      axios.get(`${BASE_URL}/api/users/${userID()}/playlists/${this.props.playlistID}`, config())
        .then(response => {this.setState({screenData: response.data})
        })
      }
    }

  render(){
    return(
      <div>
        <h3 className="">Add Videos and Questions</h3>
        <RichQuestionEditor className="question-editor" addQuestion={this.addQuestion}/>
        <SortableList screenData={this.state.screenData} onSortEnd={this.onSortEnd} />
        <ScreenForm addQuestion={this.addQuestion} addVideo={this.addVideo} addDone={this.addDone}/>
      </div>
    )
  }
}

const SortableVideo = SortableElement( ({value, key, type}) => {
  if (type === "video") {
    return <li className="grabbable" key={key}>{value}</li>
  } else {
    let html = {__html: value.slice(0,60).split('\n').join("")}
    return <li className="grabbable" key={key} dangerouslySetInnerHTML={html}></li>
  }
})

const SortableList = SortableContainer(({screenData}) => {
  return (
    <ol>
      {screenData.map((value, index) => (
        <SortableVideo key={index + 1} index={index} value={value.title} type={value.type} />
        ))}
    </ol>
    );
})

export default ScreenWrapper;

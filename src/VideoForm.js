import React, {Component} from 'react';
import axios from 'axios';
import {BASE_URL, userID, config} from './helpers.js';

class VideoForm extends Component {

  constructor(props){
    super(props)
    this.state = {
      url: "",
      videos: [],
      searchtext: ''
    }
  }

  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleChange2(e){
    this.setState({
      searchtext: e.target.value
    });
  }

  handleAdd(e){
    e.preventDefault()
    this.setState({url: ""})
    this.props.addVideo(this.state.url)
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.addDone(this.state.url)
  }

  handleAdd2(e){
    e.preventDefault()
    this.props.addVideo(e.target.getAttribute('data'))
  }

  componentWillMount(){
    axios.get(
      `${BASE_URL}/api/videos`, config
    ).then(response => {
      this.setState({videos: response.data})
    })
  }

  render(){
    let stext = this.state.searchtext
    let ha2 = this.handleAdd2.bind(this)
    let showVideos = this.state.videos.map(function(val, idx, arr){
      if(stext.toLowerCase() === ''){
        return (
          <div><a className="searchinput" onClick={ha2} data={val.url}>{val.title}</a></div>
          )
      }else{
        if(val.title.toLowerCase().includes(stext.toLowerCase())){
          return (
          <div><a className="searchinput" onClick={ha2} data={val.url}>{val.title}</a></div>
          )
        }
      }
    })
    

    return(
      <div>
        <div className="video-form-wrapper">
          <div className="videos-list">
              <input className="searchinput" type="text"
                onChange={this.handleChange2.bind(this)}
                name="searcher"
                placeholder="Search for a video"
                value={this.state.searchtext}
              />
              {showVideos}
          </div>
          <div className="videos-form">
            <form onSubmit={this.handleAdd.bind(this)}>
              <input type="url"
                onChange={this.handleChange.bind(this)}
                name="url"
                placeholder="Video Url"
                value={this.state.url}
              />
              <button type="submit" className="button" value="Add">+</button>
              <button className="button" onClick={this.handleSubmit.bind(this)} value="Submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default VideoForm;

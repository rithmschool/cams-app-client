import React, {Component} from 'react';
import axios from 'axios';
import {BASE_URL, userID, config} from './helpers.js';

class VideoForm extends Component {

  constructor(props){
    super(props)
    this.state = {
      url: "",
    }
  }

  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value
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

  componentWillMount(){
    axios.get(
      `${BASE_URL}/api/videos`, config
    ).then(response => {
      this.setState({videos: response.data})
      console.log(this.state.videos)
    })
  }

  render(){
    let videos = this.state.videos.map((val, idx, arr) => {
      console.log(val)
    })

    return(
      <div>
        <div className="video-form-wrapper">
          <div className="videos-list">
            <h2>Videos</h2>

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

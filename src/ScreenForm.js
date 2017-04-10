import React, {Component} from 'react';
import axios from 'axios';
import {BASE_URL, config} from './helpers.js';

class ScreenForm extends Component {

  constructor(props){
    super(props)
    this.state = {
      url: "",
      question: "",
      videos: [],
      searchtext: ''
    }
    this.handleAddChange = this.handleAddChange.bind(this)
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSearchChange(e){
    this.setState({
      searchtext: e.target.value
    });
  }

  handleAdd(e){
    e.preventDefault()
      this.setState({url: ""});
      this.props.addVideo(this.state.url);
  }

  handleAddChange(e){
    e.preventDefault()
    this.props.addVideo(e.target.getAttribute('data'))
  }

  componentWillMount(){
    axios.get(
      `${BASE_URL}/api/videos`, config()
    ).then(response => {
      this.setState({videos: response.data})
    })
  }



  render(){
    let stext = this.state.searchtext
    let showVideos = this.state.videos.map((val, idx, arr) => {
      var showDiv = stext.toLowerCase() === '' || val.title.toLowerCase().includes(stext.toLowerCase())
      return showDiv ? (
        <div key={idx}>
          <a className="searchitem" 
             onClick={this.handleAddChange} 
             data={val.url}>
            {val.title}
          </a>
        </div>
      ) : null
    })
    
    return(
          <div className="videos-list">
              <h4>Add Videos</h4>
              <form onSubmit={this.handleAdd}>
              <input type="url"
                onChange={this.handleChange}
                name="url"
                placeholder="Video Url"
                value={this.state.url}
              />
              <button type="submit" className="button" value="Add">+</button>
            </form>
              <input className="searchinput" type="text"
                onChange={this.handleSearchChange}
                name="searcher"
                placeholder="Search for a video"
                value={this.state.searchtext}
              />
              <div className="searchedvideos">
              {showVideos}
              </div>
          </div>
    )
  }
}

export default ScreenForm;

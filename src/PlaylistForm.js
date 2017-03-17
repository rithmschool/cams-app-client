import React, {PropTypes, Component} from 'react';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:5000'
if (localStorage.getItem('token')){
  var userId = JSON.parse(atob(localStorage.getItem('token').split('.')[1])).id
}

class PlaylistForm extends Component {

  constructor(props){
    super(props)
    this.state = {
      name: "",
    }
  }

  static contextTypes = {
    router: PropTypes.object
  }

  addPlaylist(config, thisArg) {
    axios.post(`${BASE_URL}/api/users/${userId}/playlists`, thisArg.state, config).then(response => {console.log()})
  }

  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log(this.state.name)
  }

  handleSubmit(event){
    let config = {
      headers: {
        'Accept':'application/json',
        'ContentType':'application/json',
        'Authorization': 'bearer ' + localStorage.getItem('token')
      }
    }
    event.preventDefault()
    this.addPlaylist(config, this)
    console.log(this)
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit.bind(this)}>
        <input type="string" onChange={this.handleChange.bind(this)} name="name" placeholder="Playlist Name"/>
        <button type="submit" value="Submit">Submit</button>
      </form>
    )
  }
}

export default PlaylistForm;

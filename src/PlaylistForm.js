import React, {PropTypes, Component} from 'react';
import {config} from './helpers.js';

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

  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.addPlaylist(config(), this.state)
    this.setState({name: ""})
  }

  componentDidUpdate() {
   this.nameInput.focus();
  }

  render(){
    let error = (this.props.error) ?
      <p>Playlist name already taken. Please choose a different one.</p> :
      null;
    return(
      <div>
        <h3 className="">Add Playlist</h3>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input
            ref={(input) => { this.nameInput = input; }}
            type="string" required onChange={this.handleChange.bind(this)}
            name="name" placeholder="Playlist Name" value={this.state.name}
          />
          <button className="button button-hover" type="submit" value="Submit">Submit</button>
          {error}
        </form>
      </div>
    )
  }
}

export default PlaylistForm;

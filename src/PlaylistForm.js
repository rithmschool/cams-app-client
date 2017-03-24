import React, {PropTypes, Component} from 'react';

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
    let config = {
      headers: {
        'Accept':'application/json',
        'ContentType':'application/json',
        'Authorization': 'bearer ' + localStorage.getItem('token')
      }
    }
    e.preventDefault()
    this.setState({name: ""})
    this.props.addPlaylist(config, this)
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

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

  handleSubmit(event){
    let config = {
      headers: {
        'Accept':'application/json',
        'ContentType':'application/json',
        'Authorization': 'bearer ' + localStorage.getItem('token')
      }
    }
    event.preventDefault()
    this.props.addPlaylist(config, this)
  }

  render(){
    let error = (this.props.error) ?
      <p>Playlist name already taken.</p> :
      null;
    return(
      <form onSubmit={this.handleSubmit.bind(this)}>
        <input type="string" onChange={this.handleChange.bind(this)}
          name="name" placeholder="Playlist Name"/>
        <button className="button button-hover" type="submit" value="Submit">Submit</button>
        {error}
      </form>
    )
  }
}

export default PlaylistForm;

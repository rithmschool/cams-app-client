import React, {Component} from 'react';

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

  render(){
    return(
      <div>
        <div className="content">
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
    )
  }
}

export default VideoForm;

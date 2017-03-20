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
    this.props.addContinue(this.state.url)
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.addDone(this.state.url)
  }

  render(){
    return(
      <form onSubmit={this.handleAdd.bind(this)}>
        <input type="url" onChange={this.handleChange.bind(this)}
          name="url" placeholder="Video Url" value={this.state.url}/>
        <button type="submit" value="Add">+</button>
        <button onClick={this.handleSubmit.bind(this)} value="Submit">Submit</button>
      </form>
    )
  }
}

export default VideoForm;

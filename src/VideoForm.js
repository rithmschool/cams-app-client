import React, {Component} from 'react';

class VideoForm extends Component {

  constructor(props){
    super(props)
    this.state = {
      url: "",
      question: ""
    }
  }

  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleAdd(e){
    e.preventDefault()
    if (e.target.className === "addQuestion") {
      this.setState({question: ""});
      this.props.addQuestion(this.state.question) 
    } else {
      this.setState({url: ""});
      this.props.addVideo(this.state.url);
    }
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.addDone(this.state.url)
  }

  render(){
    return(
      <div>
        <div className="content">
          <form className="addQuestion" onSubmit={this.handleAdd.bind(this)}>
            <input type="text"
              onChange={this.handleChange.bind(this)}
              name="question"
              placeholder="Add A Question"
              value={this.state.question}
            />
            <button type="submit" className="button" value="Add">+</button>
          </form>

          <form onSubmit={this.handleAdd.bind(this)}>
            <input type="url"
              onChange={this.handleChange.bind(this)}
              name="url"
              placeholder="Video URL"
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

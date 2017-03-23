import React, {Component} from 'react';

class PatientHome extends Component {

  constructor(props) {
    super(props)
    this.state = {
      idx: 0,
      videoIdx:1
    }
    this.handleSpaceBar = this.handleSpaceBar.bind(this)
  }

  handleSpaceBar(event) {
    if (event.keyCode === 32) {
      event.preventDefault()
      if(this.state.videoIdx <=  this.props.videosLength){
        if(this.state.idx === 5 && this.state.videoIdx === this.props.videosLength){
          this.setState({idx: 6})
        }else if(this.state.idx <= 4){
          this.setState({idx: ++this.state.idx})
        } else if (this.state.idx === 5 && this.state.videoIdx !== this.props.videosLength){
          this.setState({idx: 2, videoIdx: ++this.state.videoIdx})
        }
      }
    }
  }

  render() {
    document.addEventListener("keydown", this.handleSpaceBar)
    return (
      <div>
        <h1>Welcome Patient</h1>
        <div>{this.props.children[this.state.idx]}</div>
      </div>
    )
  }
}

export default PatientHome;

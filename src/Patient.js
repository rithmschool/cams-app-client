import React, {Component} from 'react';
import VideoPlayer from './VideoPlayer'

class PatientHome extends Component {

  constructor(props) {
    super(props)
    this.state = {
      idx: 0
    }
    this.handleSpaceBar = this.handleSpaceBar.bind(this)
  }

  handleSpaceBar(event) {
    if (event.keyCode === 32) {
      event.preventDefault()
      this.setState({idx: ++this.state.idx});
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

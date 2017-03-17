import React, {Component} from 'react';

class PatientHome extends Component {

  constructor(props) {
    super(props)
    this.state = {
      message: ['this is the first instructional message Press Space Bar to Continue', 'this is the second instructional message Press Space Bar to Continue'],
      messageIndex: 0
    }
    this.handleSpaceBar = this.handleSpaceBar.bind(this)
  }

  handleSpaceBar(event) {
    if (event.keyCode === 32) {
      event.preventDefault()
      if (this.state.messageIndex < 2) {
        this.setState({
          messageIndex: ++this.state.messageIndex
        })
        console.log(this.state)
      }
    }
  }

  render() {
    document.addEventListener("keydown", this.handleSpaceBar)
    return (
      <div>
        <h1>Welcome Patient</h1>
        <div>{this.state.message[this.state.messageIndex]}</div>
      </div>
    )
  }
}

export default PatientHome;
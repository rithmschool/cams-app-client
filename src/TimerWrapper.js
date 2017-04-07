import React, {Component} from 'react';
import Timer from './Timer'

class TimerWrapper extends Component {
  constructor(props){
    super(props);
    this.state = {
      counter: 0,
      timerId: null
    };
  }

  componentDidMount() {
    this.props.toggle()
    let timerId = setInterval(
      () => this.tick(),
      1000
    );
    this.setState({timerId})
  }

  tick() {
    if(this.state.counter < 30){
      this.setState({
        counter: ++this.state.counter
      });     
    } else {
      this.props.toggle()
      clearTimeout(this.state.timerId)
    }

  }
  render(){
    return (
      <Timer count={this.state.counter}></Timer>
    )
  }
}

export default TimerWrapper;


import React, {Component} from 'react';
import Timer from './Timer'

class TimerWrapper extends Component {
  constructor(props){
    super(props);
    this.state = {
      counter: 0
    };
  }

  componentDidMount() {
    this.props.toggle()
    setInterval(
      () => this.tick(),
      1000
    );
  }

  tick() {
    if(this.state.counter < 30){
      this.setState({
        counter: ++this.state.counter
      });     
    } else {
      this.props.toggle()
    }

  }
  render(){
    return (
      <Timer count={this.state.counter}></Timer>
    )
  }
}

export default TimerWrapper;


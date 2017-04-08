import React, {Component} from 'react';
import HorizontalTimeline from './HorizontalTimeline'

class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = { value: 0 };
  }

  render() {
    let VALUES = Array(this.props.valuesLength).fill(0.5); 
    return (
      <div>
        <HorizontalTimeline
          spaceBarClick={() => {
            this.setState({ value: ++this.state.value});
          }}
          keyBoardEnabled={this.props.keyBoardEnabled}
          index={this.state.value}
          values={ VALUES } 
          linePadding={ 100 }
          minEventPadding={ 20 }
          maxEventPadding={ 120 }
          containerWidth={ 800 }
          containerHeight={ 100 } />
        <div className='text-center'>
          {this.state.value}
        </div> 
      </div>
    );
  }
}

export default Timeline;


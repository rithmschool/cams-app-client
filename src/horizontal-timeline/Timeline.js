import React, {Component} from 'react';
import HorizontalTimeline from './HorizontalTimeline'

//remove first value
const VALUES = [0.5, 0.5, 2, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5];    //remove the first value and add extra value at the last

class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = { value: 0 };

  }

  render() {
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

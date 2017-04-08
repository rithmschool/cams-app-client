import React from 'react';
import {Motion, spring} from 'react-motion';
import EventLine from './EventLine';
import Events from './Events';

//implement updateSlide
class EventsBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      position: 0,
    }
  } 

  componentWillMount() {
    document.body.addEventListener('keydown', this.handleSpaceBar);
  }

  componentWillReceiveProps() {
    const selectedEvent = this.props.events[this.props.index]
    if(selectedEvent) {
      this.setState({
        position: selectedEvent.distance
      })      
    }
  }

  handleSpaceBar = (event) => {
    if(event.keyCode === 32 && this.props.keyBoardEnabled){
      this.props.spaceBarClick()
    }
  }

  render() {
    var filledValue = this.props.events[this.props.index].distance - this.props.barPaddingLeft;
    const eventLineWidth = this.props.totalWidth - this.props.barPaddingLeft - this.props.barPaddingRight;
    return(
      <div>
        <div
          className='events-wrapper'
          style={{
            position: 'relative',
            height: '100%',
            margin: '300px 200px 0px 270px',
          }}
        >
        <Motion
            style={{
              x: spring(this.state.position, this.props.slidingMotion)
            }}
          >{value =>
              <div
                className='events'
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 70,
                  height: 2,
                  width: this.props.totalWidth,
                }}
              >
                <EventLine 
                  left={this.props.barPaddingLeft}
                  width={eventLineWidth}
                  fillingMotion={this.props.fillingMotion}
                  backgroundColor={this.props.styles.outline}>
                </EventLine>
                <EventLine
                  left={this.props.barPaddingLeft}
                  width={filledValue}
                  fillingMotion={this.props.fillingMotion}
                  backgroundColor={this.props.styles.foreground}>
                </EventLine>
                <Events
                  events={this.props.events}
                  selectedIndex={this.props.index}
                  styles={this.props.styles}
                  spaceBarClick={this.props.spaceBarClick}>
                </Events>  
              </div>      
            }
          </Motion>        
        </div>
      </div>
    );
  }
}

export default EventsBar;

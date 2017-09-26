import React from "react";
import { Motion, spring } from "react-motion";
import EventLine from "./EventLine";
import Events from "./Events";
import PropTypes from "prop-types";

//implement updateSlide
class EventsBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 0
    };
    this.handleSpaceBar = this.handleSpaceBar.bind(this);
  }

  componentWillMount() {
    document.body.addEventListener("keydown", this.handleSpaceBar);
  }

  componentWillReceiveProps() {
    const selectedEvent = this.props.events[this.props.index];
    if (selectedEvent) {
      this.setState({
        position: selectedEvent.distance
      });
    }
  }

  handleSpaceBar(event) {
    if (event.keyCode === 32 && this.props.keyBoardEnabled) {
      return this.props.spaceBarClick();
    }
  }

  render() {
    const {
      events,
      index,
      totalWidth,
      barPaddingLeft,
      barPaddingRight,
      styles,
      fillingMotion,
      spaceBarClick
    } = this.props;
    const filledValue = events[index].distance - barPaddingLeft;
    const eventLineWidth = totalWidth - barPaddingLeft - barPaddingRight;
    const line1Styles = {
      left: barPaddingLeft,
      width: eventLineWidth,
      backgroundColor: styles.outline
    };
    const line2Styles = {
      left: barPaddingLeft,
      width: filledValue,
      backgroundColor: styles.foreground
    };

    return (
      <div>
        <div
          className="events-wrapper"
          style={{
            position: "fixed",
            margin: "0 auto",
            top: "5%",
            left: "15%",
            right: "15%"
          }}
        >
          <Motion
            style={{
              x: spring(this.state.position, fillingMotion)
            }}
          >
            {value => (
              <div
                className="events"
                style={{
                  position: "absolute",
                  left: "50%",
                  marginLeft: -totalWidth / 2,
                  top: 0,
                  height: 2,
                  width: totalWidth
                }}
              >
                <EventLine styles={line1Styles} fillingMotion={fillingMotion} />
                <EventLine styles={line2Styles} fillingMotion={fillingMotion} />
                <Events
                  events={events}
                  selectedIndex={index}
                  styles={styles}
                  spaceBarClick={spaceBarClick}
                />
              </div>
            )}
          </Motion>
        </div>
      </div>
    );
  }
}

EventsBar.propTypes = {
  barPaddingLeft: PropTypes.number.isRequired,
  barPaddingRight: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  totalWidth: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  keyBoardEnabled: PropTypes.bool.isRequired,
  styles: PropTypes.object.isRequired,
  spaceBarClick: PropTypes.func.isRequired,
  fillingMotion: PropTypes.shape({
    damping: PropTypes.number.isRequired,
    stiffness: PropTypes.number.isRequired
  }),
  events: PropTypes.arrayOf(
    PropTypes.shape({
      distance: PropTypes.number.isRequired,
      time: PropTypes.number.isRequired
    })
  )
};

export default EventsBar;

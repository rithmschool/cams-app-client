import React, { Component } from "react";
import EventsBar from "./EventsBar";
import PropTypes from "prop-types";

class HorizontalTimeline extends Component {
  constructor(props) {
    super(props);
    this.state = { value: 0 };
  }

  render() {
    const {
      maxEventPadding,
      linePadding,
      time,
      containerWidth,
      containerHeight,
      keyBoardEnabled,
      numScreens,
      fillingMotion,
      styles
    } = this.props;

    if (!containerWidth) {
      return false;
    }

    let distance = linePadding;

    const events = [];
    for (var i = 0; i < numScreens; i++) {
      events.push({ distance, time });
      distance += time * maxEventPadding;
    }

    const totalWidth = Math.max(
      events[events.length - 1].distance + linePadding,
      containerWidth
    );

    let barPaddingRight = 0;
    let barPaddingLeft = 0;

    return (
      <EventsBar
        width={containerWidth}
        height={containerHeight}
        events={events}
        index={this.state.value}
        spaceBarClick={() => {
          this.setState({ value: this.state.value + 1 });
        }}
        totalWidth={totalWidth}
        barPaddingLeft={barPaddingLeft}
        barPaddingRight={barPaddingRight}
        fillingMotion={fillingMotion}
        styles={styles}
        keyBoardEnabled={keyBoardEnabled}
      />
    );
  }
}

HorizontalTimeline.defaultProps = {
  styles: {
    outline: "#dfdfdf",
    background: "#dfdfdf",
    foreground: "#00c5cc"
  },

  fillingMotion: {
    stiffness: 150,
    damping: 25
  },

  time: 0.5
};

HorizontalTimeline.propTypes = {
  keyBoardEnabled: PropTypes.bool.isRequired,
  numScreens: PropTypes.number.isRequired,
  linePadding: PropTypes.number.isRequired,
  minEventPadding: PropTypes.number.isRequired,
  maxEventPadding: PropTypes.number.isRequired,
  containerWidth: PropTypes.number.isRequired,
  containerHeight: PropTypes.number.isRequired,
  time: PropTypes.number.isRequired,
  styles: PropTypes.shape({
    outline: PropTypes.string.isRequired,
    background: PropTypes.string.isRequired,
    foreground: PropTypes.string.isRequired
  }),
  fillingMotion: PropTypes.shape({
    stiffness: PropTypes.number.isRequired,
    damping: PropTypes.number.isRequired
  })
};

export default HorizontalTimeline;

import React, { Component } from "react";
import Radium from "radium"; //radium provides powerful styling capabilities without CSS
import PropTypes from "prop-types";

const dots = {
  // The base style information for the event dot that appers exactly on the timeline
  base: {
    position: "absolute",
    bottom: "-5px",
    height: "12px",
    width: "12px",
    borderRadius: "50%",
    transition: "background-color 0.3s, border-color 0.3s"
  },

  future: styles => ({
    backgroundColor: styles.background,
    border: `2px solid ${styles.outline}`
  }),

  past: styles => ({
    backgroundColor: styles.background,
    border: `2px solid ${styles.background}`
  }),

  present: styles => ({
    backgroundColor: styles.foreground,
    border: `2px solid ${styles.foreground}`
  })
};

class TimelineDot extends Component {
  __getDotStyles__ = (dotType, key) => {
    return [
      dots.base,
      { left: this.props.distanceFromOrigin },
      dots[dotType](this.props.styles)
    ];
  };

  render() {
    let dotType = "future";
    if (this.props.index < this.props.selected) {
      dotType = "past";
    } else if (this.props.index === this.props.selected) {
      dotType = "present";
    }

    return (
      <li
        key={this.props.index}
        id={`timeline-dot-${this.props.index}`}
        className={`${dotType} dot-label`}
      >
        <span
          key="dot-dot"
          style={this.__getDotStyles__(dotType, this.props.index)}
        />
      </li>
    );
  }
}

TimelineDot.propTypes = {
  distanceFromOrigin: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  spaceBarClick: PropTypes.func.isRequired,
  selected: PropTypes.number.isRequired,
  styles: PropTypes.object.isRequired
};

export default Radium(TimelineDot);

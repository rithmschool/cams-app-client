import React from "react";
import { Motion, spring } from "react-motion";
import PropTypes from "prop-types";

const EventLine = ({ styles, fillingMotion }) => (
  <Motion
    style={{
      tWidth: spring(styles.width, fillingMotion),
      tLeft: spring(styles.left, fillingMotion)
    }}
  >
    {({ tWidth, tLeft }) => (
      <span
        aria-hidden="true"
        className="timeline-eventline"
        style={{
          position: "absolute",
          left: `${tLeft}px`,
          height: "100%",
          width: `${tWidth}px`,
          transformOrigin: "left center",
          backgroundColor: styles.backgroundColor
        }}
      />
    )}
  </Motion>
);

EventLine.propTypes = {
  styles: PropTypes.object.isRequired,
  fillingMotion: PropTypes.object.isRequired
};

export default EventLine;

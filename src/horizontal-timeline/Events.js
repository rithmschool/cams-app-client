import React from "react";
import TimelineDot from "./TimelineDot";
import PropTypes from "prop-types";

const Events = ({
  events,
  selectedIndex,
  styles,
  spaceBarClick,
  labelWidth
}) => (
  <ol
    className="events-bar"
    style={{
      listStyle: "none"
    }}
  >
    {events.map((event, index) => (
      <TimelineDot
        distanceFromOrigin={event.distance}
        index={index}
        key={index}
        spaceBarClick={spaceBarClick}
        selected={selectedIndex}
        styles={styles}
      />
    ))}
  </ol>
);
Events.propTypes = {
  events: PropTypes.func.isRequired,
  selectedIndex: PropTypes.number.isRequired,
  styles: PropTypes.object.isRequired, //not sure if this is right
  spaceBarClick: PropTypes.bool.isRequired,
  labelWidth: PropTypes.number.isRequired
};

export default Events;

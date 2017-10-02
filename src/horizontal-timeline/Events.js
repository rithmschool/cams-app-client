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
  events: PropTypes.array.isRequired,
  selectedIndex: PropTypes.number.isRequired,
  styles: PropTypes.object.isRequired,
  spaceBarClick: PropTypes.func.isRequired,
  labelWidth: PropTypes.number
};

export default Events;

import React from 'react';
import TimelineDot from './TimelineDot';

const Events = ({ events, selectedIndex, styles, spaceBarClick, labelWidth }) => (
  <ol
    className='events-bar'
    style={ {
      listStyle: 'none'
    } }
  >
    {events.map((event, index) =>
      <TimelineDot
        distanceFromOrigin={event.distance}
        index={index}
        key={index}
        spaceBarClick={spaceBarClick}
        selected={selectedIndex}
        styles={styles}
      />
    )}
  </ol>
);

export default Events;

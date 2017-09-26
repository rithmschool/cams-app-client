import React, { Component } from "react";
import HorizontalTimeline from "./HorizontalTimeline";
import PropTypes from "prop-types";

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
            this.setState({ value: this.state.value + 1 });
          }}
          keyBoardEnabled={this.props.keyBoardEnabled}
          index={this.state.value}
          numScreens={this.props.numScreens}
          linePadding={100}
          minEventPadding={20}
          maxEventPadding={120}
          containerWidth={800}
          containerHeight={100}
        />
      </div>
    );
  }
}

Timeline.propTypes = {
  numScreens: PropTypes.number.isRequired,
  keyBoardEnabled: PropTypes.bool.isRequired
};

export default Timeline;

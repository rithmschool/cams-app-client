import React from "react";
import PropTypes from "prop-types";

const VideoViewer = ({ src }) => (
  <div className="lg">
    <video src={src} id="videoElement" autoPlay="true" />
    <p>
      Please take this time to look at the video viewer to make sure it is
      positioned on your face.
    </p>
    <p> Please adjust lighting so your face is clearly visible.</p>
    <p>Press the spacebar when you are ready to go forward</p>
  </div>
);

VideoViewer.propTypes = {
  src: PropTypes.string.isRequired
};

export default VideoViewer;

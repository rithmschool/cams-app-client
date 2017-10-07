import React from "react";
import PropTypes from "prop-types";

const Assessment = props => {
  let {
    recordingUrl,
    handleEvaluated,
    handleVideo,
    patientEmail,
    playlistName,
    dateAdded,
    dateAssessed,
    dateEvaluated
  } = props;

  var playVideo = recordingUrl ? (
    <button className="al-button" onClick={handleVideo}>
      {String.fromCharCode(9658)}
    </button>
  ) : null;

  return (
    <tr className={``}>
      <td className="playlist-name-title">{patientEmail}</td>
      <td>{playlistName}</td>
      <td>{dateAdded}</td>
      <td>{dateAssessed}</td>
      <td>{dateEvaluated}</td>
      <td>
        {playVideo}
        <button className="al-button" onClick={handleEvaluated}>
          {String.fromCharCode(10004)}
        </button>
      </td>
    </tr>
  );
};

Assessment.propTypes = {
  recordingUrl: PropTypes.string,
  handleEvaluated: PropTypes.func,
  handleVideo: PropTypes.func,
  patientEmail: PropTypes.string.isRequired,
  playlistName: PropTypes.string.isRequired,
  dateAdded: PropTypes.string.isRequired,
  dateAssessed: PropTypes.string,
  dateEvaluated: PropTypes.string
};

export default Assessment;

import React from "react";
import PropTypes from "prop-types";

const Assessment = props => {
  let {
    downloadUrl,
    recordingUrl,
    handlelUnselect,
    handleSelect,
    handleEvaluated,
    patientEmail,
    playlistName,
    dateAdded,
    dateAssessed,
    dateEvaluated
  } = props;
  let completed = <h6>Completed: No</h6>;
  let className = "playlist-card";

  if (downloadUrl) {
    completed = (
      <div>
        <div>
          <video
            className="playlist-video"
            src={downloadUrl}
            preload="metadata"
            controls="true"
          />
        </div>
        <button className="button button-hover" onClick={handlelUnselect}>
          Close
        </button>
        <button className="button button-hover" type="submit" value="Submit">
          <a href={downloadUrl}>Download</a>
        </button>
        <button
          className="button button-hover"
          type="submit"
          value="Submit"
          onClick={handleEvaluated}
        >
          Completed
        </button>
      </div>
    );
    className = "selected";
  } else if (recordingUrl) {
    completed = (
      <button className="button button-hover" onClick={handleSelect}>
        Get Video
      </button>
    );
  }

  return (
    <div className={`${className} button-hover playlist-card-contents`}>
      <h5 className="playlist-name-title">{patientEmail}</h5>
      <h6>{playlistName}</h6>
      <h6>Added: {dateAdded}</h6>
      <h6>Assessment: {dateAssessed}</h6>
      <h6>Evaluated: {dateEvaluated}</h6>
      {completed}
    </div>
  );
};

Assessment.propTypes = {
  downloadUrl: PropTypes.string,
  recordingUrl: PropTypes.string,
  handlelUnselect: PropTypes.func,
  handleSelect: PropTypes.func,
  handleEvaluated: PropTypes.func,
  patientEmail: PropTypes.string.isRequired,
  playlistName: PropTypes.string.isRequired,
  dateAdded: PropTypes.string.isRequired,
  dateAssessed: PropTypes.string,
  dateEvaluated: PropTypes.string
};

export default Assessment;

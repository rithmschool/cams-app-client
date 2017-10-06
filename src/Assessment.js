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
    dateEvaluated,
    handleVideo
  } = props;
  // let completed = <h6>Completed: No</h6>;
  // let className = "playlist-card";

  // if (downloadUrl) {
  //   completed = (
  //     <div>
  //       <div>
  //         <video
  //           className="playlist-video"
  //           src={downloadUrl}
  //           preload="metadata"
  //           controls="true"
  //         />
  //       </div>
  //       <button className="button button-hover" onClick={handlelUnselect}>
  //         Close
  //       </button>
  //       <button className="button button-hover" type="submit" value="Submit">
  //         <a href={downloadUrl}>Download</a>
  //       </button>
  //       <button
  //         className="button button-hover"
  //         type="submit"
  //         value="Submit"
  //         onClick={handleEvaluated}
  //       >
  //         Completed
  //       </button>
  //     </div>
  //   );
  //   className = "selected";
  // } else if (recordingUrl) {
  //   completed = (
  //     <button className="button button-hover" onClick={handleSelect}>
  //       Get Video
  //     </button>
  //   );
  // }
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

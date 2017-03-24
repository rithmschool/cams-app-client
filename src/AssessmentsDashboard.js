import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Assessment extends Component {

  render(){
    return(
      <div>
        <div className="banner-text">
          <h1 className="banner-bold">Patient Assessments</h1>
        </div>
        <div className="content">
          <div className="dash-nav">
            <Link to="/playlists/new">
              <button
                className="button button-hover big-nav"
                type="submit"
                value="Submit">
                New Playlist
              </button>
            </Link>
            <Link to="/assessments">
              <button
                className="button button-hover big-nav"
                type="submit"
                value="Submit">
                Assessments
              </button>
            </Link>
          </div>
          <div className="playlist-card">
            <button
              className="button button-hover"
              value="info">
              View Details
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Assessment;

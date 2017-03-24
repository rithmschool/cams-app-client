import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Assessment extends Component {

  constructor(props) {
    super(props)
    this.state = {
      doctorAssessments = []
    }
  }

  componentWillMount(){
    let userID = JSON.parse(atob(localStorage.getItem('token').split('.')[1])).id
    axios.get(
      `${BASE_URL}/api/assessments/users/${userID}`,
      {
        headers: {
          'Accept':'application/json',
          'ContentType':'application/json',
          'Authorization':'bearer ' + localStorage.getItem('token')
        }
      }
    ).then(reponse => {
      this.setState({doctorAssessments: response.data})
    })
  }

  // patient email | playlist name | date sent | completed

  render(){
    let assessments = this.state.doctorAssessments.map((assessment, i) => {
      return (
        <div
          key={i}
          >
          <h5>{assessment.patient.name}</h5>
        </div>
      )
    })
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

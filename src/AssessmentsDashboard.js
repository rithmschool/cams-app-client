import React, {Component} from 'react';
import {BASE_URL} from './helpers.js';
import axios from 'axios';
import {Link} from 'react-router-dom';

class AssessmentsDashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            doctorAssessments: []
        }
    }
    componentWillMount() {
        let userID = JSON.parse(atob(localStorage.getItem('token').split('.')[1])).id
        axios.get(
            `${BASE_URL}/api/assessments/users/${userID}`,
            {
                headers: {
                    'Accept': 'application/json',
                    'ContentType': 'application/json',
                    'Authorization': 'bearer ' + localStorage.getItem('token')
                }
            }
        ).then(response => {
            console.log(response.data)
            this.setState({doctorAssessments: response.data})
        })
    }

    render() {
        let assessments = this.state.doctorAssessments.map((assessment, i) => {
            let completed = assessment.recording_url ?
                <h6>Completed: Yes</h6> :
                <h6>Completed: No</h6>
            return (
                <div key={i}>
                    <h5>{assessment.patient_email.email}</h5>
                    <h6>{assessment.playlist_name.name}</h6>
                    <h6>{assessment.date_added}</h6>
                    {completed}
                </div>
            )
        })
        return (
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
                        <div>{assessments}</div>
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
export default AssessmentsDashboard;

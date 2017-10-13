import React, { Component } from 'react';
import PatientHome from './PatientHome';
import { BASE_URL, BrowserDetect, config } from './helpers.js';
import axios from 'axios';
import URLSearchParams from 'url-search-params';
import { connect } from 'react-redux';
import {
  confirmUser,
  getScreens,
  getURLsFromS3
} from './store/actions/actionCreators';

class PatientWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screens: [],
      screenCount: 0,
      assessmentId: 1
    };
  }

  //Line 51 - why is the screensPromises an empty array?
  //how to get screenCount.. do in AC line 71?
  //should the Promises not be in componentWillReceiveProps?
  componentWillReceiveProps(nextProps) {
    const query = new URLSearchParams(this.props.location.search);
    const token = query.get('token');
    if (nextProps.assessment.screens.length === 0) {
      this.props
        .getScreensAC(nextProps, token)
        //.then(resp => console.log(resp))
        //getting screenCount ... I want it in redux state
        .then(response =>
          response.assessment.screens.reduce(
            (prev, curScreen) => prev + (curScreen.type === 'video' ? 3 : 2),
            3
          )
        );
    } else {
      //get URLs from S3 using array of titles
      var videoTitles = nextProps.assessment.screens
        .filter(s => s.type === 'video')
        .map(s => decodeURIComponent(s.title));
      //actionCreator getScreens -- API calls for array of titles
      nextProps.getURLsFromS3AC(videoTitles);
    }
  }

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const token = query.get('token');
    //action creator bound as prop in dispatchToProps at bottom
    //api call to confirm user
    this.props.confirmUserAC(token);
  }

  //     //set react state with screens and screenCount, what is line 40 doing??
  //     //updating state
  //     .then(response => {
  //       this.setState({
  //         screens: response.data.screens,
  //         screenCount: response.data.screens.reduce(
  //           (prev, curScreen) => prev + (curScreen.type === 'video' ? 3 : 2),
  //           3
  //         )
  //       });
  //       return response.data.screens;
  //     })
  //     //filter by screen typs of video
  //     //then map over and decode the title
  //     //with title, API call with title ... and config??
  //     //going to S3
  //     .then(response => {
  //       let screensPromises = response
  //         .filter(s => s.type === 'video')
  //         .map(s => {
  //           let title = decodeURIComponent(s.title);
  //           //actionCreator getScreens -- API calls for each screens/title
  //           this.props.getScreensAC(title);

  //           //return axios.get(`${BASE_URL}/api/videofiles/${title}`, config());
  //         });

  //       Promise.all(screensPromises).then(response => {
  //         let screens = this.state.screens.map(s => {
  //           if (s.type === 'video') {
  //             response.forEach(v => {
  //               if (s.title === v.data.title) {
  //                 s = { ...s, url: v.data.url };
  //               }
  //             });
  //           }
  //           return s;
  //         });
  //         this.setState({ screens });
  //       });
  //     });
  // }

  render() {
    BrowserDetect.init();
    let display =
      BrowserDetect.browser === 'Chrome' ? (
        <PatientHome
          screens={this.state.screens}
          screenCount={this.state.screenCount}
          assessmentId={+this.state.assessmentId}
        />
      ) : (
        <p>
          Browser not supported. Please switch to{' '}
          <a href="https://www.google.com/chrome/browser/desktop/index.html">
            Google Chrome
          </a>{' '}
          to proceed.
        </p>
      );
    return <div>{display}</div>;
  }
}

//mapping redux state to React props
const mapStateToProps = state => {
  return {
    assessment: state.assessment,
    confirmUser: state.confirmUser,
    stopRecord: state.stopRecord,
    screenCount: state.screenCount
  };
};

//maping redux AC (dispatch) to React props
const mapDispatchToProps = dispatch => {
  return {
    confirmUserAC: token => dispatch(confirmUser(token)),
    getScreensAC: (nextProps, token) => dispatch(getScreens(nextProps, token)),
    getURLsFromS3AC: videoTitles => dispatch(getURLsFromS3(videoTitles))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientWrapper);

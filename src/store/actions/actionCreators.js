import {
  STOP_RECORD_SUCCESS,
  STOP_RECORD_FAIL,
  CONFIRM_USER_SUCCESS,
  CONFIRM_USER_FAIL,
  CONFIRM_SCREENSANDURLS_SUCCESS,
  CONFIRM_SCREENSANDURLS_FAIL
} from "./constants";

import {
  getScreensAPI,
  postToStopRecord,
  getForConfirmUser,
  getURLsFromS3API
} from "../../services/api";

export function stopRecordRequest(fd) {
  return dispatch =>
    postToStopRecord(fd)
      .then(res => dispatch(stopRecordSuccess()))
      .catch(err => dispatch(stopRecordFail(err)));
}

export function stopRecordSuccess() {
  return {
    type: STOP_RECORD_SUCCESS,
    stopRecord: true
  };
}

export function stopRecordFail(err) {
  return {
    type: STOP_RECORD_FAIL,
    err
  };
}

export function confirmUser(token) {
  return dispatch =>
    getForConfirmUser(token)
      .then(res => dispatch(confirmUserSuccess(res.data)))
      .catch(err => dispatch(confirmUserFail(err)));
}

export function confirmUserSuccess(response) {
  return {
    type: CONFIRM_USER_SUCCESS,
    confirmUser: response
  };
}

export function confirmUserFail(err) {
  return {
    type: CONFIRM_USER_FAIL,
    err
  };
}

export function getScreensAndURLs(prevProps, token) {
  return dispatch =>
    getScreensAPI(prevProps, token)
      .then(res => {
        var videoTitles = res.data.screens
          .filter(s => s.type === "video")
          .map(s => decodeURIComponent(s.title));
        return Promise.all([getURLsFromS3API(videoTitles), res.data]);
      })
      .then(res => {
        res[1].screens.forEach(screen => {
          if (screen.type === "video") {
            res[0].data.forEach(v => {
              if (screen.title === v.title) {
                screen.url = v.url;
              }
            });
          }
        });
        dispatch(getScreensAndURLsSuccess(res[1]));
      })
      .catch(err => dispatch(getScreensAndURLsFail(err)));
}

export function getScreensAndURLsSuccess(assessment) {
  return {
    type: CONFIRM_SCREENSANDURLS_SUCCESS,
    assessment
  };
}

export function getScreensAndURLsFail(err) {
  console.log(err);
  return {
    type: CONFIRM_SCREENSANDURLS_FAIL,
    err
  };
}

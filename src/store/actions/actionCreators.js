import {
  UPLOAD_RECORD_SUCCESS,
  UPLOAD_RECORD_FAIL,
  CONFIRM_USER_SUCCESS,
  CONFIRM_USER_FAIL,
  CONFIRM_SCREENSANDURLS_SUCCESS,
  CONFIRM_SCREENSANDURLS_FAIL
} from "./constants";

import { BASE_URL, config } from "../../helpers.js";

import axios from "axios";

import {
  getScreensAPI,
  uploadRecord,
  getForConfirmUser,
  getURLsFromS3API,
  postToS3,
  patchRecordAssessment
} from "../../services/api";

export function uploadRecordRequest(recordedBlob) {
  return (dispatch, getState) =>
    uploadRecord(recordedBlob)
      .then(res => {
        let fd = new FormData();
        for (let key in res.data.data.fields) {
          fd.append(key, res.data.data.fields[key]);
        }
        let url = res.data.data.url;
        console.log("first one", url);
        fd.append("file", recordedBlob);
        return postToS3(url, fd);
      })
      .then(res => {
        let state = getState();
        let recording_url = res.config.data.get("key");
        console.log("second one", state, recording_url);
        return patchRecordAssessment(recording_url, state);
      })
      .then(res => dispatch(uploadRecordSuccess()))
      .catch(err => dispatch(uploadRecordFail(err)));
}

export function uploadRecordSuccess() {
  return {
    type: UPLOAD_RECORD_SUCCESS,
    uploadRecord: true
  };
}

export function uploadRecordFail(err) {
  return {
    type: UPLOAD_RECORD_FAIL,
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
  return {
    type: CONFIRM_SCREENSANDURLS_FAIL,
    err
  };
}

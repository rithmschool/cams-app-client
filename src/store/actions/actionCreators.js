import {
  STOP_RECORD_SUCCESS,
  STOP_RECORD_FAIL,
  CONFIRM_USER_SUCCESS,
  CONFIRM_USER_FAIL,
  CONFIRM_SCREENS_SUCCESS,
  CONFIRM_SCREENS_FAIL,
  GET_URL_FROM_S3_SUCCESS,
  GET_URL_FROM_S3_FAIL
} from './constants';

import { config } from '../../helpers.js';

import {
  getScreensAPI,
  postToStopRecord,
  getForConfirmUser,
  getURLsFromS3API
} from '../../services/api';

//this is where the API calls are made and dispatches new actions (success/failure)
//after api response is received

//PatientHome
export function stopRecordRequest(fd) {
  return dispatch =>
    postToStopRecord(fd)
      .then(res => dispatch(stopRecordSuccess(res)))
      .catch(err => dispatch(stopRecordFail(err)));
}

export function stopRecordSuccess(response) {
  return {
    type: STOP_RECORD_SUCCESS,
    response
  };
}

export function stopRecordFail(err) {
  return {
    type: STOP_RECORD_FAIL,
    err
  };
}

//Patient Wrapper
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

export function getScreens(prevProps, token) {
  return dispatch =>
    getScreensAPI(prevProps, token)
      // .then(res =>
      //   res.assesment.screens.reduce(
      //     (prev, curScreen) => prev + (curScreen.type === 'video' ? 3 : 2),
      //     3
      //   )
      // )
      .then(res => dispatch(getScreensSuccess(res.data)))
      .catch(err => dispatch(getScreensFail(err)));
}

export function getScreensSuccess(response) {
  return {
    type: CONFIRM_SCREENS_SUCCESS,
    assessment: response
  };
}

export function getScreensFail(err) {
  return {
    type: CONFIRM_SCREENS_FAIL,
    err
  };
}

export function getURLsFromS3(videoTitles) {
  return dispatch =>
    getURLsFromS3API(videoTitles)
      .then(res => dispatch(getURLsFromS3Success(res.data)))
      .catch(err => dispatch(getURLsFromS3Fail(err)));
}

export function getURLsFromS3Success(response) {
  console.log('inside AC get URL success');
  return {
    type: GET_URL_FROM_S3_SUCCESS,
    url: response.url
  };
}

export function getURLsFromS3Fail(err) {
  debugger;
  return {
    type: GET_URL_FROM_S3_FAIL,
    err
  };
}

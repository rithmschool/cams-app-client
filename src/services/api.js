import axios from "axios";
import { BASE_URL, config } from "../helpers.js";

export function postToStopRecord(fd) {
  return axios.post(`${BASE_URL}/api/recording`, fd);
}

export function getForConfirmUser(token) {
  return axios.get(`${BASE_URL}/api/users/confirm/${token}`);
}

export function getScreensAPI(nextProps, token) {
  return axios.get(
    `${BASE_URL}/api/users/${nextProps.confirmUser
      .doctor_id}/assessments/${nextProps.confirmUser.assessment_id}`,
    { token: token }
  );
}

export function getURLsFromS3API(videoTitles) {
  return axios.post(
    `${BASE_URL}/api/videofiles/urls`,
    {
      titles: videoTitles
    },
    config()
  );
}

import axios from "axios";
import { BASE_URL, config } from "../helpers.js";

export function uploadRecord(fd) {
  return axios.get(`${BASE_URL}/api/s3/new`, {
    params: {
      bucket_name: "PATIENT_VIDEO_BUCKET",
      file_name: `video_${Date.now()}.mp4`,
      file_type: "file"
    }
  });
}

export function postToS3(url, fd) {
  return axios.post(url, fd, {
    headers: {
      "x-amz-acl": "public-read"
    }
  });
}

export function patchRecordAssessment(recording_url, state) {
  axios.patch(
    `${BASE_URL}/api/users/${state.confirmUser.doctor_id}/assessments/${state
      .assessment.id}`,
    { recording_url: recording_url }
  );
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
    `${BASE_URL}/api/s3`,
    {
      titles: videoTitles
    },
    config()
  );
}

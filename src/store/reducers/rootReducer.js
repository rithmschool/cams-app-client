import {
  UPLOAD_RECORD_SUCCESS,
  CONFIRM_USER_SUCCESS,
  CONFIRM_SCREENSANDURLS_SUCCESS
} from "../actions/constants";

const DEFAULT_STATE = {
  uploadRecord: false,
  confirmUser: {},
  assessment: { screens: [] },
  screenCount: null
};

const rootReducer = (state = DEFAULT_STATE, action = { type: null }) => {
  switch (action.type) {
    case UPLOAD_RECORD_SUCCESS:
      return {
        ...state,
        uploadRecord: action.uploadRecord
      };
    case CONFIRM_USER_SUCCESS:
      return {
        ...state,
        confirmUser: action.confirmUser
      };
    case CONFIRM_SCREENSANDURLS_SUCCESS:
      return {
        ...state,
        assessment: action.assessment
      };
    default:
      return state;
  }
};

export default rootReducer;

import {
  STOP_RECORD_SUCCESS,
  CONFIRM_USER_SUCCESS,
  CONFIRM_SCREENSANDURLS_SUCCESS
} from '../actions/constants';

const DEFAULT_STATE = {
  stopRecord: false,
  confirmUser: {},
  assessment: { screens: [] },
  screenCount: null
};

const rootReducer = (state = DEFAULT_STATE, action = { type: null }) => {
  switch (action.type) {
    case STOP_RECORD_SUCCESS:
      return {
        ...state,
        stopRecord: action.stopRecord
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

import {
  STOP_RECORD_SUCCESS,
  CONFIRM_USER_SUCCESS,
  CONFIRM_SCREENS_SUCCESS,
  GET_URL_FROM_S3_SUCCESS
} from '../actions/constants';

const DEFAULT_STATE = {
  stopRecord: false,
  confirmUser: {}, //assessment_id and doctor_id
  assessment: { screens: [] },
  screenCount: null
};

//no side effects here!
//must be pure

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
    case CONFIRM_SCREENS_SUCCESS:
      return {
        ...state,
        assessment: action.assessment
        //screenCount: action.assessment.screens
      };
    case GET_URL_FROM_S3_SUCCESS:
      return {
        ...state,
        url: action.url //??
      };
    default:
      return state;
  }
};

export default rootReducer;

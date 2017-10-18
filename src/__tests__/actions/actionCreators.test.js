import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from "../../store/actions/actionCreators";
//import * as types from "../../store/actions/constants";
import * as api from "../../services/api";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { BASE_URL } from "../../helpers";
import {
  STOP_RECORD_SUCCESS,
  STOP_RECORD_FAIL,
  CONFIRM_USER_SUCCESS,
  CONFIRM_USER_FAIL,
  CONFIRM_SCREENSANDURLS_SUCCESS,
  CONFIRM_SCREENSANDURLS_FAIL
} from "../../store/actions/constants";

const mock = new MockAdapter(axios);

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mockResponse = (status, statusText, response) => {
  return new window.Response(response, {
    status: status,
    statusText: statusText,
    headers: {
      "Content-type": "application/json"
    }
  });
};

describe("async actions/api calls", () => {
  afterAll(() => {
    mock.restore();
  });

  it("calls request and success action if the fetch response was successful", () => {
    mock
      .onPost(`${BASE_URL}/api/recording`)
      .reply(200, { message: "complete" });

    const expectedActions = [{ stopRecord: true, type: "STOP_RECORD_SUCCESS" }];

    const store = mockStore({ stopRecord: null });

    return store.dispatch(actions.stopRecordRequest()).then(() => {
      expect(store.getActions().length).toEqual(1);
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

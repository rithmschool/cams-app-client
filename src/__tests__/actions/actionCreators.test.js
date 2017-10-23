import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from "../../store/actions/actionCreators";
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

describe("async actions/api calls", () => {
  afterAll(() => {
    mock.restore();
  });

  it("calls request and success action for uploadRecord if the fetch response was successful", () => {
    mock
      .onGet(`${BASE_URL}/api/s3/new`)
      .reply(200, { data: { url: "http://www.stuff.com" } })
      .onPost("http://www.stuff.com")
      .reply(200, {})
      .onPatch(`${BASE_URL}/api/users/1/assessments/1`)
      .reply(200, {});

    const expectedActions = [
      { uploadRecord: true, type: "UPLOAD_RECORD_SUCCESS" }
    ];

    const store = mockStore({
      uploadRecord: null,
      confirmUser: { doctor_id: 1 },
      assessment: { id: 1 }
    });

    return store.dispatch(actions.uploadRecordRequest()).then(() => {
      expect(store.getActions().length).toEqual(1);
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("calls request and success action for getForConfirmUser if the fetch response was successful", () => {
    let token = "TEST";
    mock
      .onGet(`${BASE_URL}/api/users/confirm/${token}`, {}, token)
      .reply(200, { message: "complete" });

    const expectedActions = [
      { confirmUser: { message: "complete" }, type: "CONFIRM_USER_SUCCESS" }
    ];

    const store = mockStore({});

    return store.dispatch(actions.confirmUser(token)).then(() => {
      expect(store.getActions().length).toEqual(1);
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

import rootReducer from "../../store/reducers/rootReducer";
import * as types from "../../store/actions/constants";
//import actionCreators?

describe("root reducer", () => {
  it("should return the initial state", () => {
    expect(rootReducer(undefined, {})).toEqual({
      stopRecord: false,
      confirmUser: {},
      assessment: { screens: [] },
      screenCount: null
    });
  });

  it("should handle stop record", () => {
    expect(
      rootReducer(
        {
          stopRecord: false,
          confirmUser: {},
          assessment: { screens: [] },
          screenCount: null
        },
        {
          type: types.STOP_RECORD_SUCCESS,
          stopRecord: true
        }
      )
    ).toEqual({
      stopRecord: true,
      confirmUser: {},
      assessment: { screens: [] },
      screenCount: null
    });
  });
  it("should handle confirm user", () => {
    expect(
      rootReducer(
        {
          stopRecord: false,
          confirmUser: {},
          assessment: { screens: [] },
          screenCount: null
        },
        {
          type: types.CONFIRM_USER_SUCCESS,
          confirmUser: { 1: "Test" }
        }
      )
    ).toEqual({
      stopRecord: false,
      confirmUser: { 1: "Test" },
      assessment: { screens: [] },
      screenCount: null
    });
  });
  it("should handle confirm screens and urls success", () => {
    expect(
      rootReducer(
        {
          stopRecord: false,
          confirmUser: {},
          assessment: { screens: [] },
          screenCount: null
        },
        {
          type: types.CONFIRM_SCREENSANDURLS_SUCCESS,
          assessment: { screens: [{}, {}] }
        }
      )
    ).toEqual({
      stopRecord: false,
      confirmUser: {},
      assessment: { screens: [{}, {}] },
      screenCount: null
    });
  });
});

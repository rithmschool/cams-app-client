import rootReducer from "../../store/reducers/rootReducer";
import * as types from "../../store/actions/constants";

describe("root reducer", () => {
  it("should return the initial state", () => {
    expect(rootReducer(undefined, {})).toEqual({
      uploadRecord: false,
      confirmUser: {},
      assessment: { screens: [] },
      screenCount: null
    });
  });

  it("should handle upload record", () => {
    expect(
      rootReducer(
        {
          uploadRecord: false,
          confirmUser: {},
          assessment: { screens: [] },
          screenCount: null
        },
        {
          type: types.UPLOAD_RECORD_SUCCESS,
          uploadRecord: true
        }
      )
    ).toEqual({
      uploadRecord: true,
      confirmUser: {},
      assessment: { screens: [] },
      screenCount: null
    });
  });

  it("should handle confirm user", () => {
    expect(
      rootReducer(
        {
          uploadRecord: false,
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
      uploadRecord: false,
      confirmUser: { 1: "Test" },
      assessment: { screens: [] },
      screenCount: null
    });
  });

  it("should handle confirm screens and urls success", () => {
    expect(
      rootReducer(
        {
          uploadRecord: false,
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
      uploadRecord: false,
      confirmUser: {},
      assessment: { screens: [{}, {}] },
      screenCount: null
    });
  });
});

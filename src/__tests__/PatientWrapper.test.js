import React from "react";
import ReactDOM from "react-dom";
import { shallow, mount } from "enzyme";
import PatientWrapper from "../PatientWrapper";
import toJson from "enzyme-to-json";
import LocalStorageMock from "../setupTests/LocalStorageMock";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { BASE_URL } from "../helpers";

var mock = new MockAdapter(axios);

beforeAll(() => {
  localStorage.setItem("token", "");
  mock
    .onGet(`${BASE_URL}/api/users/confirm/test`)
    .reply(function(config) {
      return [200, { assessment_id: 1, doctor_id: 1 }];
    })
    .onGet(`${BASE_URL}/api/users/1/assessments/1`)
    .reply(200, {
      screens: [
        {
          duration: "PT4S",
          id: 4,
          timer: 30,
          title: "Short funny video",
          type: "video",
          url: "https://www.youtube.com/watch?v=B7bqAsxee4I",
          youtube_id: "B7bqAsxee4I"
        },
        {
          duration: null,
          id: 10,
          timer: 5,
          title: "how are you?",
          type: "question",
          url: null,
          youtube_id: null
        }
      ]
    });
});

test("shapshot of an invalid browser", () => {
  const patientWrapper = shallow(
    <PatientWrapper location={{ search: "?token=test" }} />
  );
  patientWrapper.setState({
    screens: [],
    assessmentId: 0,
    token: "",
    src: null,
    screenCount: 0
  });
  expect(toJson(patientWrapper)).toMatchSnapshot();
});

afterAll(() => {
  mock.restore();
});

import { PatientHome } from "../PatientHome";
import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import toJson from "enzyme-to-json";
import ReactCountdownClock from "react-countdown-clock";

test("Renders PatientHome hierarchy", () => {
  const patientHome = shallow(<PatientHome />);
  patientHome.setState({
    idx: 0,
    src: null,
    keyBoardEnabled: true,
    stream: "something",
    cameraEnabled: true,
    screens: [{ id: 4, type: "question", timer: 4, title: "test" }]
  });
  expect(toJson(patientHome)).toMatchSnapshot();
});

test("shows error component if camera is disabled", () => {
  const patientHome = shallow(<PatientHome />);
  patientHome.setState({
    idx: 2,
    src: null,
    keyBoardEnabled: true,
    stream: "something",
    cameraEnabled: false,
    screens: [{ id: 4, type: "question", timer: 4, title: "test" }]
  });
  expect(toJson(patientHome)).toMatchSnapshot();
});

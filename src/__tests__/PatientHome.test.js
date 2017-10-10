import PatientHome from "../PatientHome";
import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import toJson from "enzyme-to-json";
import ReactCountdownClock from "react-countdown-clock";

test("matches snapshot of PatientHome", () => {
  const patientHome = shallow(
    <PatientHome
      idx={0}
      src={null}
      keyBoardEnabled={true}
      stream={""}
      screens={[]}
      assessmentId={4}
      screenCount={4}
    />
  );
  expect(toJson(patientHome)).toMatchSnapshot();
});

test("Renders timer after question", () => {
  const patientHome = shallow(
    <PatientHome
      idx={2}
      src={null}
      keyBoardEnabled={true}
      stream={""}
      screens={[{ id: 4, type: "question", timer: 4, title: "test" }]}
      assessmentId={4}
      screenCount={4}
    />
  );
  patientHome.setState({
    idx: 4,
    src: null,
    keyBoardEnabled: true,
    stream: "something"
  });
  expect(toJson(patientHome)).toMatchSnapshot();
});

test("Renders instructions", () => {
  const patientHome = shallow(
    <PatientHome
      src={"something"}
      screens={[]}
      assessmentId={4}
      screenCount={4}
    />
  );
  expect(toJson(patientHome)).toMatchSnapshot();
});

test("Renders videoplayer when there's a video", () => {
  const patientHome = shallow(
    <PatientHome
      screens={[{ id: 4, type: "video", timer: 4, title: "test" }]}
      assessmentId={4}
      screenCount={4}
    />
  );
  patientHome.setState({
    idx: 2,
    src: null,
    keyBoardEnabled: true,
    stream: "something"
  });
  expect(toJson(patientHome)).toMatchSnapshot();
});

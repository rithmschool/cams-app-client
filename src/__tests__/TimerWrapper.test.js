import React from "react";
import ReactDOM from "react-dom";
import { shallow, mount } from "enzyme";
import renderer from "react-test-renderer";
import TimerWrapper from "../TimerWrapper";
import toJson from "enzyme-to-json";

test("shapshot of TimerWrapper with timer prop", () => {
  const timer = renderer
    .create(<TimerWrapper timer={45} toggle={function() {}} />)
    .toJSON();
  expect(timer).toMatchSnapshot();
});

test("shapshot of TimerWrapper without timer prop", () => {
  const timer = renderer
    .create(<TimerWrapper toggle={function() {}} />)
    .toJSON();
  expect(timer).toMatchSnapshot();
});

test("snapshot of TimerWrapper when counter > 0", () => {
  const timerWrapper = shallow(<TimerWrapper toggle={function() {}} />);
  timerWrapper.setState({
    counter: 0,
    timerId: 1
  });
  expect(toJson(timerWrapper)).toMatchSnapshot();
});

import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import TimerWrapper from "../TimerWrapper";
import toJson from "enzyme-to-json";

test("shapshot of TimerWrapper with timer prop", () => {
  const timer = shallow(<TimerWrapper timer={45} toggle={function() {}} />);
  expect(toJson(timer)).toMatchSnapshot();
});

test("shapshot of TimerWrapper without timer prop", () => {
  const timer = shallow(<TimerWrapper toggle={function() {}} />);
  expect(toJson(timer)).toMatchSnapshot();
});

test("snapshot of TimerWrapper when counter is set to zero", () => {
  const timerWrapper = shallow(<TimerWrapper toggle={function() {}} />);
  timerWrapper.setState({
    counter: 0,
    timerId: 1
  });
  expect(toJson(timerWrapper)).toMatchSnapshot();
});

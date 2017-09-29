import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Switch, MemoryRouter } from "react-router-dom";
import { shallow, mount } from "enzyme";
import ScreenWrapper from "./ScreenWrapper";
import renderer from "react-test-renderer";
import Timer from "./Timer";

class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }

  removeItem(key) {
    delete this.store[key];
  }
}

global.localStorage = new LocalStorageMock();

test("shallow Home has correct components", () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find(Switch)).toHaveLength(1);
});

test("mount Home", () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={["/"]} initialIndex={0}>
      <App />
    </MemoryRouter>
  );
  expect(wrapper.find(Switch)).toHaveLength(2);
});

test("snapshot of timer", () => {
  const timer = renderer.create(<Timer count={30} />).toJSON();
  expect(timer).toMatchSnapshot();
});

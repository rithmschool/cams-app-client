import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Switch, MemoryRouter } from "react-router-dom";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";

class LocalStorageMock {
  constructor() {
    this.store = { token: "nyc subway" };
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

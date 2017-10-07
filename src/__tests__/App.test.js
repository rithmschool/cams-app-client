import React from "react";
import ReactDOM from "react-dom";
import App from "../App";
import { Switch, MemoryRouter } from "react-router-dom";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

test("shallow Home has correct components", () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find(Switch)).toHaveLength(1);
});



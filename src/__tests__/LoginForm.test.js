import React from "react";
import ReactDOM from "react-dom";
import { shallow, mount } from "enzyme";
import renderer from "react-test-renderer";
import LoginForm from "../LoginForm";
import toJson from "enzyme-to-json";
import { Switch, MemoryRouter, Link } from "react-router-dom";
import MockAdapter from "axios-mock-adapter";
import { BASE_URL, userID, config } from "../helpers.js";
import axios from "axios";
import LocalStorageMock from "../setupTests/LocalStorageMock";

test("matches snapshot with no errors", () => {
  const login = shallow(<LoginForm />);
  expect(login.text()).not.toContain("Invalid credentials");
  expect(toJson(login)).toMatchSnapshot();
});

test("matches snapshot with errors", () => {
  const login = shallow(<LoginForm />);
  login.setState({ error: true });
  expect(login.text()).toContain("Invalid credentials");
  expect(toJson(login)).toMatchSnapshot();
});

it("should pass a selected value to the onSubmit handler", () => {
  const spy = jest.spyOn(LoginForm.prototype, "handleSubmit");
  const wrapper = shallow(<LoginForm />);
  wrapper.find("form").simulate("submit", { preventDefault() {} });
  expect(spy).toHaveBeenCalled();
});

it("responds to a change", () => {
  const spy = jest.spyOn(LoginForm.prototype, "handleChange");
  const wrapper = shallow(<LoginForm />);
  wrapper.find('input[type="email"]').simulate("change", {
    target: {
      name: "email",
      value: "s"
    }
  });
  expect(spy).toHaveBeenCalled();
});



import DoctorRegisterForm from "../DoctorRegisterForm";
import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import LocalStorageMock from "../setupTests/LocalStorageMock";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { MemoryRouter } from "react-router-dom";
import { BASE_URL } from "../helpers.js";

var mock = new MockAdapter(axios);

beforeAll(() => {
  localStorage.setItem("token", ".eyJpZCI6NH0=.");
  mock
    .onPost(`${BASE_URL}/api/users/register`)
    .reply(200, { token: "token", response: "something", displayForm: false });
});

test("DoctorRegisterForm snapshot", () => {
  const doctorRegisterForm = shallow(
    <DoctorRegisterForm
      location={{
        pathname: "/doctor/register",
        search: "?token=InNAc2FyYWguc295Ig.DL11ag.rqelLIUl2I8C33G_y7dc8ysJVsE",
        hash: "",
        state: undefined
      }}
    />
  );
  doctorRegisterForm.setState({
    password: "",
    confirmPassword: "",
    response: "",
    displayForm: false
  });
  expect(toJson(doctorRegisterForm)).toMatchSnapshot();
});

afterAll(() => {
  mock.restore();
});

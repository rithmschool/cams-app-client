import EditUserForm from "../EditUserForm";
import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import toJson from "enzyme-to-json";
import LocalStorageMock from "../setupTests/LocalStorageMock";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { userID } from "../helpers";
import { BASE_URL } from "../helpers";

var mock = new MockAdapter(axios);

beforeAll(() => {
  localStorage.setItem("token", ".eyJpZCI6NH0=.");
  mock
    .onGet(`${BASE_URL}/api/users/${userID()}`)
    .reply(200, { email: "email" });
});

test("EditUserForm snapshot", () => {
  const editUserForm = shallow(<EditUserForm />);
  editUserForm.setState({
    email: "something",
    current_password: "something",
    new_password: "somethingelse",
    confirm_new_password: "somethingelse",
    message: "nothing"
  });
  expect(toJson(editUserForm)).toMatchSnapshot();
});

afterAll(() => {
  mock.restore();
});

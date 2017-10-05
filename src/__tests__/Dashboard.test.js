import React from "react";
import ReactDOM from "react-dom";
import { shallow, mount } from "enzyme";
import renderer from "react-test-renderer";
import Dashboard from "../Dashboard";
import toJson from "enzyme-to-json";
import { Switch, MemoryRouter, Link } from "react-router-dom";
import MockAdapter from "axios-mock-adapter";
import { BASE_URL, userID, config } from "../helpers.js";
import LocalStorageMock from "../setupTests/LocalStorageMock";
import axios from "axios";

var mock = new MockAdapter(axios);

beforeAll(() => {
  localStorage.setItem("token", ".eyJpZCI6NH0=.");
  mock.onGet().reply(200, []);
});

test("dashboard matches snapshot ", () => {
  var dashboard = shallow(<Dashboard />);
  expect(toJson(dashboard)).toMatchSnapshot();
});

test("renders without crashing", () => {
  shallow(<Dashboard />);
});

test("mockAdapter works", () => {
  const dashboard = shallow(<Dashboard />);
  dashboard.setState({
    userPlaylists: [
      {
        id: 1,
        name: "playlist 1",
        videos: []
      },
      {
        id: 2,
        name: "playlist 2",
        videos: []
      }
    ]
  });
  expect(toJson(dashboard)).toMatchSnapshot();
});

afterAll(() => {
  mock.restore();
});

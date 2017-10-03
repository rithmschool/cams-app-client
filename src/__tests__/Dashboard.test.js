import React from "react";
import ReactDOM from "react-dom";
import { shallow, mount } from "enzyme";
import renderer from "react-test-renderer";
import Dashboard from "../Dashboard";
import toJson from "enzyme-to-json";
import { Switch, MemoryRouter, Link } from "react-router-dom";
import MockAdapter from "axios-mock-adapter";
import { BASE_URL, userID, config } from "../helpers.js";
import axios from "axios";
import LocalStorageMock from "../setupTests/LocalStorageMock";

beforeAll(() => {
  localStorage.setItem("token", ".eyJpZCI6NH0=.");
  //   data: [{
  //   id: 1,
  //   name: "playlist 1",
  //   videos: [],
  // }, {
  //   id: 2,
  //   name: "playlist 2",
  //   videos: []
  // }]
});

test("dashboard matches snapshot ", () => {
  var dashboard = shallow(<Dashboard />);
  expect(toJson(dashboard)).toMatchSnapshot();
});

test("renders without crashing", () => {
  shallow(<Dashboard />);
});

// test("sends email to email entered", () => {
//   const dashboard = shallow(
//     <MemoryRouter initialEntries={["/"]} initialIndex={0}>
//       <Dashboard />
//     </MemoryRouter>
//   );
//   let mockAdapter = new MockAdapter(axios);
//   mockAdapter.onPost(`${BASE_URL}/api/users/4/assessments`).reply(200, {
//     data: {
//       posts: ["Intro to git"]
//     }
//   });

//   let response = axios.post(
//     `${BASE_URL}/api/users/${userID()}/assessments`,
//     {
//       patient_id: response.data.id,
//       playlist_id: this.state.playlistID,
//       doctor_id: userID()
//     },
//     config
//   );

//   let form = dashboard.find("form").first();
//   form.simulate("submit");

//   setTimeout(() => {
//     expect(response.posts[0]).to.be.equal(
//       `${BASE_URL}/api/users/${userID()}/assessments`
//     );
//   }, 0);
// });

test("mockAdapter works", done => {
  let mockAdapter = new MockAdapter(axios);
  mockAdapter.onGet(`${BASE_URL}/api/users/${userID()}/playlists`).reply(200, {
    data: [
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
  const dashboard = mount(<Dashboard />);
  axios.get(`${BASE_URL}/api/users/${userID()}/playlists`).then(() => {
    expect(toJson(dashboard)).toMatchSnapshot();
    console.log(dashboard.debug());
    done();
  });
  // let response = axios.post(
  //   `${BASE_URL}/api/users/${userID()}/playlists`,
  //   {
  //     userPlaylists: response.data
  //   },
  //   config
  // );
});

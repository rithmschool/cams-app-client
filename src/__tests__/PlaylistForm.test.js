import PlaylistForm from "../PlaylistForm";
import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import toJson from "enzyme-to-json";

test("matches snapshot of PlaylistForm", () => {
  const playlistForm = renderer
    .create(<PlaylistForm error={false} addPlaylist={function() {}} />)
    .toJSON();
  expect(playlistForm).toMatchSnapshot();
});

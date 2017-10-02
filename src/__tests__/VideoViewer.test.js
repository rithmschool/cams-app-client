import VideoViewer from "../VideoViewer";
import React from "react";
import ReactDOM from "react-dom";
import { shallow, mount } from "enzyme";
import renderer from "react-test-renderer";
import toJson from "enzyme-to-json";

test("snapshot of VideoViewer", () => {
  const videoViewer = renderer
    .create(<VideoViewer src={"something"} />)
    .toJSON();
  expect(videoViewer).toMatchSnapshot();
});

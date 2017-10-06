import VideoPlayer from "../VideoPlayer";
import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import toJson from "enzyme-to-json";

test("matches snapshot of VideoPlayer", () => {
  const videoPlayer = renderer
    .create(<VideoPlayer toggle={function() {}} videoId={"something"} />)
    .toJSON();
  expect(videoPlayer).toMatchSnapshot();
});

test("should render with text ", () => {
  const videoPlayer = shallow(
    <VideoPlayer toggle={function() {}} videoId={"something"} />
  );
  expect(videoPlayer.find(".lg")).toHaveLength(1);
});

test("component mounts ", () => {
  const spy = jest.spyOn(VideoPlayer.prototype, "componentDidMount");
  const wrapper = shallow(
    <VideoPlayer toggle={function() {}} videoId={"something"} />
  );
  wrapper.instance().componentDidMount();
  expect(spy).toHaveBeenCalled();
});

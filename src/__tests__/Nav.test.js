import React from "react";
import ReactDOM from "react-dom";
import { shallow, mount } from "enzyme";
import renderer from "react-test-renderer";
import Nav from "../Nav";
import toJson from "enzyme-to-json";
import { Switch, MemoryRouter, Link } from "react-router-dom";
import LocalStorageMock from "../setupTests/LocalStorageMock";

test("nav bar snapshot when logged in", () => {
  const nav = renderer
    .create(
      <MemoryRouter initialEntries={["/"]} initialIndex={0}>
        <Nav isLoggedIn={true} />
      </MemoryRouter>
    )
    .toJSON();
  expect(nav).toMatchSnapshot();
});

test("nav bar snapshot when logged out", () => {
  const nav = renderer
    .create(
      <MemoryRouter initialEntries={["/"]} initialIndex={0}>
        <Nav isLoggedIn={false} />
      </MemoryRouter>
    )
    .toJSON();
  expect(nav).toMatchSnapshot();
});

test("Nav bar has links when logged in", () => {
  const nav = mount(
    <MemoryRouter initialEntries={["/"]} initialIndex={0}>
      <Nav isLoggedIn={true} />
    </MemoryRouter>
  );
  expect(nav.find(Link)).toHaveLength(5);
  expect(nav.findWhere(node => node.props().to === "/")).toHaveLength(0);
  expect(nav.findWhere(node => node.props().to === "/dashboard")).toHaveLength(
    2
  );
  expect(
    nav.findWhere(node => node.props().to === "/playlists/new")
  ).toHaveLength(1);
  expect(
    nav.findWhere(node => node.props().to === "/assessments")
  ).toHaveLength(1);
  expect(nav.findWhere(node => node.props().to === "/login")).toHaveLength(1);
});

test("Nav bar has less links when logged out", () => {
  const nav = mount(
    <MemoryRouter initialEntries={["/"]} initialIndex={0}>
      <Nav isLoggedIn={false} />
    </MemoryRouter>
  );
  expect(nav.find(Link)).toHaveLength(2);
  expect(nav.findWhere(node => node.props().to === "/")).toHaveLength(1);
  expect(nav.findWhere(node => node.props().to === "/dashboard")).toHaveLength(
    0
  );
  expect(
    nav.findWhere(node => node.props().to === "/playlists/new")
  ).toHaveLength(0);
  expect(
    nav.findWhere(node => node.props().to === "/assessments")
  ).toHaveLength(0);
  expect(nav.findWhere(node => node.props().to === "/login")).toHaveLength(1);
});

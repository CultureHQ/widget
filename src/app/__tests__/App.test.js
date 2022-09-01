import React from "react";
import { mount } from "enzyme";
import client from "@culturehq/client";

import App from "../App";
import Failure from "../Failure";
import NoStories from "../NoStories";

jest.mock("@culturehq/client", () => {
  const mockClient = {
    makePaginatedGet: jest.fn(),
    setToken: token => {
      mockClient.token = token;
    },
    token: null
  };

  return mockClient;
});

test("sets the token in the constructor", () => {
  client.makePaginatedGet.mockImplementation(() => Promise.resolve({ events: [] }));

  mount(<App token="special-token" />);

  expect(client.token).toEqual("special-token");
});

test("renders a failure message if the fetch fails", async () => {
  // eslint-disable-next-line prefer-promise-reject-errors
  client.makePaginatedGet.mockImplementation(() => Promise.reject({ status: 403 }));
  const component = mount(<App token="token" />);

  await component.instance().componentDidMount();
  component.update();

  expect(component.find(Failure)).toHaveLength(1);
});

test("renders a no events message when none are fetched", async () => {
  client.makePaginatedGet.mockImplementation(() => Promise.resolve({ events: [] }));
  const component = mount(<App token="token" />);

  await component.instance().componentDidMount();
  component.update();

  expect(component.find(NoStories)).toHaveLength(1);
});

test("unmounts gracefully", () => {
  client.makePaginatedGet.mockImplementation(() => Promise.resolve({ events: [] }));
  const component = mount(<App token="token" />);
  component.unmount();
});

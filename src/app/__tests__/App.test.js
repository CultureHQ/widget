import React from "react";
import { mount } from "enzyme";
import client from "@culturehq/client";

import App from "../App";
import EventCard from "../EventCard";
import EventPlaceholder from "../EventPlaceholder";
import Failure from "../Failure";
import NoEvents from "../NoEvents";

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

const buildUser = userId => ({
  id: userId,
  active: true,
  name: "Kevin",
  avatar: { thumbUrl: "https://example.com/avatar.png" }
});

const buildRsvp = (rsvpId, userId) => ({
  id: rsvpId,
  user: buildUser(userId)
});

const buildEvent = eventId => ({
  id: eventId,
  image: { mediumUrl: "https://example.com/event.png" },
  host: buildUser(1),
  rsvpPreview: [buildRsvp(1, 11), buildRsvp(2, 22), buildRsvp(3, 33)]
});

test("sets the token in the constructor", () => {
  client.makePaginatedGet.mockImplementation(() => (
    Promise.resolve({ events: [] })
  ));

  mount(<App token="special-token" />);

  expect(client.token).toEqual("special-token");
});

test("renders a failure message if the fetch fails", async () => {
  client.makePaginatedGet.mockImplementation(() => (
    // eslint-disable-next-line prefer-promise-reject-errors
    Promise.reject({ status: 403 })
  ));

  const component = mount(<App token="token" />);

  await component.instance().componentDidMount();
  component.update();

  expect(component.find(Failure)).toHaveLength(1);
});

test("renders placeholders when the component is fetching", () => {
  client.makePaginatedGet.mockImplementation(() => (
    Promise.resolve({ events: [] })
  ));

  const component = mount(<App token="token" />);

  expect(component.find(EventPlaceholder)).toHaveLength(3);
});

test("renders a no events message when none are fetched", async () => {
  client.makePaginatedGet.mockImplementation(() => (
    Promise.resolve({ events: [] })
  ));

  const component = mount(<App token="token" />);

  await component.instance().componentDidMount();
  component.update();

  expect(component.find(NoEvents)).toHaveLength(1);
});

test("renders a card for each event when successfully fetched", async () => {
  const events = [buildEvent(1), buildEvent(2), buildEvent(3)];

  client.makePaginatedGet.mockImplementation(() => (
    Promise.resolve({ events })
  ));

  const component = mount(<App token="token" />);

  await component.instance().componentDidMount();
  component.update();

  expect(component.find(EventCard)).toHaveLength(events.length);
});

test("unmounts gracefully", () => {
  client.makePaginatedGet.mockImplementation(() => (
    Promise.resolve({ events: [] })
  ));

  const component = mount(<App token="token" />);
  component.unmount();
});

import React from "react";
import { mount } from "enzyme";

import Rsvps from "../Rsvps";

const buildUser = userId => ({
  id: userId, active: true, avatar: { thumbUrl: "https://example.com/avatar.png" }
});

const buildRsvp = (rsvpId, userId) => ({
  id: rsvpId, user: buildUser(userId)
});

test("renders nothing if there are no RSVPs", () => {
  const event = { rsvps: [] };

  const component = mount(<Rsvps event={event} />);

  expect(component.html()).toBe(null);
});

test("renders just the list of users if under the max", () => {
  const pattern = /^.+\//;
  const extractUserId = link => (
    parseInt(link.props().href.replace(pattern, ""), 10)
  );

  const event = {
    rsvps: [buildRsvp(1, 11), buildRsvp(2, 22), buildRsvp(3, 33)],
    rsvpExtra: 0
  };

  const component = mount(<Rsvps event={event} />);

  expect(component.find("a")).toHaveLength(event.rsvps.length);
  expect(component.find("a").map(extractUserId)).toEqual([11, 22, 33]);
});

test("renders the extras as a number", () => {
  const event = { rsvps: [buildRsvp(1, 11)], rsvpExtra: 5 };

  const component = mount(<Rsvps event={event} />);

  expect(component.text()).toContain("+5");
});

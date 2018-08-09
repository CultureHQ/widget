import React from "react";
import { mount } from "enzyme";

import EventMetadata from "../src/components/EventMetadata";

const buildEvent = ({ cancelledAt, location, cap, remainingSpots }) => ({
  cancelledAt,
  location,
  cap,
  remainingSpots,
  startsAtDisplay: "today",
  endsAtDisplay: "tomorrow",
  host: { id: 1, active: true, name: "Kevin" }
});

test("renders the name of the host", () => {
  const event = buildEvent({});

  const text = mount(<EventMetadata event={event} />).text();

  expect(text).toContain("Kevin");
});

test("renders the timestamps if an event is not cancelled", () => {
  const event = buildEvent({ cancelledAt: null });

  const text = mount(<EventMetadata event={event} />).text();

  expect(text).not.toContain("Cancelled");
  expect(text).toContain("today");
  expect(text).toContain("tomorrow");
});

test("does not render the timestamps if an event is cancelled", () => {
  const event = buildEvent({ cancelledAt: "yesterday" });

  const text = mount(<EventMetadata event={event} />).text();

  expect(text).toContain("Cancelled");
  expect(text).not.toContain("today");
  expect(text).not.toContain("tomorrow");
});

test("renders the location if there is one", () => {
  const event = buildEvent({ location: "Outside" });

  const text = mount(<EventMetadata event={event} />).text();

  expect(text).toContain("Where");
  expect(text).toContain("Outside");
});

test("does not render the location if there is not one", () => {
  const event = buildEvent({ location: null });

  const text = mount(<EventMetadata event={event} />).text();

  expect(text).not.toContain("Where");
});

test("renders the cap if there is one", () => {
  const event = buildEvent({ cap: 5, remainingSpots: 2 });

  const text = mount(<EventMetadata event={event} />).text();

  expect(text).toContain("Spots");
  expect(text).toContain("2");
});

test("does not render the cap if there is not one", () => {
  const event = buildEvent({ cap: null });

  const text = mount(<EventMetadata event={event} />).text();

  expect(text).not.toContain("Spots");
});

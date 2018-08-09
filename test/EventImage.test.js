import React from "react";
import { mount } from "enzyme";

import EventImage from "../src/components/EventImage";
import SponsoredRibbon from "../src/components/SponsoredRibbon";
import LiveBanner from "../src/components/LiveBanner";

const buildEvent = ({ sponsored, isLive }) => ({
  name: "Summer BBQ",
  href: "https://platform.culturehq.com/events/5",
  imageUrl: "https://example.com/image.png",
  sponsored,
  isLive
});

test("displays the name of the event", () => {
  const event = buildEvent({});

  const component = mount(<EventImage event={event} />);

  expect(component.text()).toContain(event.name);
});

test("does not render a sponsored ribbon if the event is not sponsored", () => {
  const event = buildEvent({ sponsored: false });

  const component = mount(<EventImage event={event} />);

  expect(component.find(SponsoredRibbon)).toHaveLength(0);
});

test("renders a sponsored ribbon if the event is sponsored", () => {
  const event = buildEvent({ sponsored: true });

  const component = mount(<EventImage event={event} />);

  expect(component.find(SponsoredRibbon)).toHaveLength(1);
});

test("does not render a live banner if the event is not live", () => {
  const event = buildEvent({ isLive: false });

  const component = mount(<EventImage event={event} />);

  expect(component.find(LiveBanner)).toHaveLength(0);
});

test("renders a live banner if the event is live", () => {
  const event = buildEvent({ isLive: true });

  const component = mount(<EventImage event={event} />);

  expect(component.find(LiveBanner)).toHaveLength(1);
});

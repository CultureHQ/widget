import React from "react";
import { shallow } from "enzyme";

import EventCard from "../src/components/EventCard";

test("renders without crashing", () => {
  const event = { href: "https://platform.culturehq.com/events/5" };

  const component = shallow(<EventCard event={event} />);

  expect(component.dive().type()).toEqual("div");
});

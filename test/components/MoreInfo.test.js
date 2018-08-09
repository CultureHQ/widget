import React from "react";
import { mount } from "enzyme";

import MoreInfo from "../../src/components/MoreInfo";

test("renders without crashing", () => {
  const component = mount(<MoreInfo />);

  expect(component.find("a")).toHaveLength(1);
  expect(component.text()).toContain("More Info");
});

test("passes on props", () => {
  const href = "https://platform.culturehq.com";

  const component = mount(<MoreInfo href={href} />);

  expect(component.find("a").props().href).toEqual(href);
});

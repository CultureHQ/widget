import React from "react";
import { mount } from "enzyme";

import EventPlaceholder from "../EventPlaceholder";

test("renders without crashing", () => {
  const component = mount(<EventPlaceholder />);

  expect(component.find("div")).toBeTruthy();
});

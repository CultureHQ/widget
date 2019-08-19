import React from "react";
import { shallow } from "enzyme";

import EventPlaceholder from "../EventPlaceholder";

test("renders without crashing", () => {
  const component = shallow(<EventPlaceholder />);

  expect(component.dive().type()).toEqual("div");
});

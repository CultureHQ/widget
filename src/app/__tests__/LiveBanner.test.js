import React from "react";
import { shallow } from "enzyme";

import LiveBanner from "../LiveBanner";

test("renders without crashing", () => {
  const component = shallow(<LiveBanner />);

  expect(component.html()).toContain("LIVE");
});

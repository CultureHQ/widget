import React from "react";
import { shallow } from "enzyme";

import LiveBanner from "../src/components/LiveBanner";

test("renders without crashing", async () => {
  const component = shallow(<LiveBanner />);
  expect(component.html()).toContain("LIVE");
});

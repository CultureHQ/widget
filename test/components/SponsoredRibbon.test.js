import React from "react";
import { shallow } from "enzyme";

import SponsoredRibbon from "../src/components/SponsoredRibbon";

test("renders without crashing", () => {
  const component = shallow(<SponsoredRibbon />);

  expect(component.html()).toContain("Sponsored");
});

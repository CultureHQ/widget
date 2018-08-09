import React from "react";
import { mount } from "enzyme";

import MoreInfo from "../../src/components/MoreInfo";

test("renders without crashing", () => {
  const component = mount(<MoreInfo />);

  expect(component.find("a")).toHaveLength(1);
  expect(component.text()).toContain("More Info");
});

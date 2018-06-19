import React from "react";
import { shallow } from "enzyme";

import Failure from "../src/components/Failure";

test("renders without crashing", async () => {
  const component = shallow(<Failure />);
  expect(component.html()).toContain("failed to fetch");
});

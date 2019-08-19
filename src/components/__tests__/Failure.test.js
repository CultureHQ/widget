import React from "react";
import { shallow } from "enzyme";

import Failure from "../Failure";

test("renders without crashing", () => {
  const component = shallow(<Failure />);

  expect(component.html()).toContain("failed to fetch");
});

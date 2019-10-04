import React from "react";
import { shallow } from "enzyme";

import NoEvents from "../NoEvents";

test("renders without crashing", () => {
  const component = shallow(<NoEvents />);

  expect(component.html()).toContain("create an event");
});

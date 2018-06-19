import React from "react";
import { shallow } from "enzyme";

import NoEvents from "../src/components/NoEvents";

test("renders without crashing", async () => {
  const component = shallow(<NoEvents />);
  expect(component.html()).toContain("create an event");
});

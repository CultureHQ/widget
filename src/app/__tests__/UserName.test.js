import React from "react";
import { shallow, mount } from "enzyme";

import UserName from "../UserName";

test("renders a link if the user is active", () => {
  const user = { active: true, id: 1, name: "Kevin" };

  const component = mount(<UserName user={user} />);

  expect(component.find("a")).toHaveLength(1);
  expect(component.text()).toContain(user.name);
});

test("renders just the name if the user is inactive", () => {
  const user = { active: false, id: 1, name: "Kevin" };

  const component = shallow(<UserName user={user} />);

  expect(component.find("a")).toHaveLength(0);
  expect(component.text()).toEqual(user.name);
});

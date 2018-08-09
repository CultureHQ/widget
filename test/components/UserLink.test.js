import React from "react";
import { mount } from "enzyme";

import UserLink from "../../src/components/UserLink";

test("renders a link if the user is active", () => {
  const message = "This is a user link";
  const user = {
    active: true,
    id: 1,
    name: "Kevin",
    avatar: { thumbUrl: "https://example.com/avatar.png" }
  };

  const component = mount(<UserLink user={user}>{message}</UserLink>);

  expect(component.find("a")).toHaveLength(1);
  expect(component.text()).toEqual(message);
});

test("renders just the name if the user is inactive", () => {
  const message = "This is a user span";
  const user = {
    active: false,
    id: 1,
    name: "Kevin",
    avatar: { thumbUrl: "https://example.com/avatar.png" }
  };

  const component = mount(<UserLink user={user}>{message}</UserLink>);

  expect(component.find("span")).toHaveLength(1);
  expect(component.text()).toEqual(message);
});

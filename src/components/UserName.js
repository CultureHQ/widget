import React from "react";
import styled from "styled-components";

import { PLATFORM_ROOT } from "../config";

const Link = styled.a`
  color: #5c5f67;
  text-decoration: none;
`;

const UserName = ({ user }) => {
  if (user.active) {
    return <Link href={`${PLATFORM_ROOT}/people/${user.id}`}>{user.name}</Link>;
  }
  return user.name;
};

export default UserName;

import React from "react";
import styled, { css } from "styled-components";

import { PLATFORM_ROOT } from "../config";

const sharedStyles = css`
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 20px;
  display: inline-block;
  height: 30px;
  margin-left: -10px;
  vertical-align: middle;
  width: 30px;
`;

const Link = styled.a`
  ${sharedStyles}
  background-image: url(${({ imageUrl }) => imageUrl});
`;

const Text = styled.span`
  ${sharedStyles}
  background-image: url(${({ imageUrl }) => imageUrl});
`;

const UserLink = ({ user, children }) => {
  const imageUrl = user.avatar.thumbUrl;

  if (user.active) {
    return (
      <Link href={`${PLATFORM_ROOT}/community/${user.id}`} imageUrl={imageUrl}>
        {children}
      </Link>
    );
  }

  return <Text imageUrl={imageUrl}>{children}</Text>;
};

export default UserLink;

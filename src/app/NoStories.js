import React from "react";
import styled from "styled-components";

import { fontSize, maxWidth } from "../styles.json";

const Container = styled.div`
  background-color: #fcf8e3;
  border: #faebcc solid 1px;
  color: #8a6d3b;
  font-family: inherit;
  font-size: ${fontSize};
  max-width: ${maxWidth};
  padding: 15px;
`;

const NoStories = () => (
  <Container>
    <strong>Uh oh!</strong> No stories to show.{" "}
  </Container>
);

export default NoStories;

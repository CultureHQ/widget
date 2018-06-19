import React from "react";
import styled from "styled-components";

import { font } from "../styles.json";

const Container = styled.div`
  background-color: #fcf8e3;
  border: #faebcc solid 1px;
  color: #8a6d3b;
  font-family: ${font};
  font-size: 16px;
  padding: 15px;
`;

const Link = styled.a`
  color: #8a6d3b;
`;

const NoEvents = () => (
  <Container>
    <strong>Uh oh!</strong> No events to show.{" "}
    <Link href="https://platform.culturehq.com/events/create">Click here</Link>
    {" "}to create an event.
  </Container>
);

export default NoEvents;

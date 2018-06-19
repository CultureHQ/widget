import React from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: #ff0000;
  border-radius: 5px;
  color: white;
  font-size: 14px;
  opacity: 0.9;
  padding: 3px 9px;
  position: absolute;
  right: 8px;
  text-decoration: none;
  top: 8px;
`;

const LiveSVG = styled.svg`
  margin: -2px 1px 1px 0;
  width: 8px;
  height: 8px;
`;

const LivePath = styled.path`
  fill: white;
`;

const LiveBanner = () => (
  <Container>
    <LiveSVG viewBox="0 0 1024 1024">
      <LivePath d="M512 928c229.8 0 416-186.2 416-416s-186.2-416-416-416c-229.8 0-416 186.2-416 416s186.2 416 416 416z" />
    </LiveSVG>
    {" "}
    LIVE
  </Container>
);

export default LiveBanner;

import React from "react";
import styled from "styled-components";

const Container = styled.span`
  color: white;
  display: block;
  font-weight: 200;
  height: 88px;
  left: -3px;
  overflow: hidden;
  position: absolute;
  text-align: center;
  top: -3px;
`;

const Text = styled.span`
  background-color: #79b17d;
  box-shadow: 0 0 3px rgba(0, 0, 0, .3);
  display: block;
  font-size: 12px;
  left: -55px;
  padding: 7px 0 7px 10px;
  position: relative;
  top: 20px;
  transform: rotate(-45deg);
  width: 155px;
`;

const SponsoredRibbon = () => (
  <Container>
    <Text>Sponsored</Text>
  </Container>
);

export default SponsoredRibbon;

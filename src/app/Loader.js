import React from "react";
import styled from "styled-components";

const ChqLdr = styled.div`
  left: 0;
  padding: 70px;
  position: absolute;
  right: 0;
  top: 0;
`;

const ChqSpn = styled.div`
  height: 60px;
  margin: 0 auto;
  width: 60px;
`;

const ChqCir = styled.svg`
  animation: chqChunkRotate 4s linear infinite;
  height: 60px;
  margin: 4px 10px 0 0;
  width: 60px;

  @keyframes chqChunkRotate {
    0% {
      transform: rotate(0deg);
    }
  
    13%,
    33% {
      transform: rotate(240deg);
    }
  
    47%,
    67% {
      transform: rotate(480deg);
    }
  
    81%,
    100% {
      transform: rotate(720deg);
    }
  }
`;

const Loader = () => (
  <ChqLdr>
    <ChqSpn aria-hidden="false">
      <ChqCir viewBox="0 0 300 300">
        <circle r="72" cx="98" cy="134" fill="#76a6d6" fillOpacity="0.85" />
        <circle r="72" cx="202" cy="96" fill="#fbce49" fillOpacity="0.85" />
        <circle r="72" cx="186" cy="200" fill="#77ae7b" fillOpacity="0.85" />
      </ChqCir>
    </ChqSpn>
  </ChqLdr>
);

export default Loader;

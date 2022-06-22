import React, { useRef, useState } from "react";
import styled from "styled-components";

import { font } from "../styles.json";


const SliderContainer = styled.section`
  position: relative;

  -ms-overflow-style: none; // IE 10+
  overflow: -moz-scrollbars-none; // Firefox

  &::-webkit-scrollbar {
    display: none; // Safari and Chrome
  }
`;

const ScrollbarContainer = styled.div`
  height: 400px;
  overflow-x: scroll;
  overflow-y: hidden;
  position: relative;
  white-space: nowrap;
  width: 100%;

  -ms-overflow-style: none; // IE 10+
  overflow: -moz-scrollbars-none; // Firefox

  &::-webkit-scrollbar {
    display: none; // Safari and Chrome
  }
`;

const slider = {
  backgroundColor: "transparent",
  borderRadius: "6px",
  display: "flex",
  justifyContent: "center",
  marginBottom: "15px",
  minWidth: "100%",
  position: "absolute",
  transition: "transform 300ms cubic-bezier(.455, .03, .515, .955)",
};

const Card = styled.button`
  background-color: #f3f3f3;
  background-position: center;
  background-size: cover;
  border-radius: 6px;
  border: 0;
  cursor: pointer;
  display: inline-block;
  height: 400px;
  margin-right: 15px;
  max-width: 750px;
  overflow: hidden;
  padding: 0;
  position: relative;
  text-align: left;
  width: 300px;
`;

const UserPreview = styled.div`
  background-color: rgba(0, 0, 0, .06);
  border-radius: 30px;
  height: 45px;
  width: 45px;
`;

const TextPreview = styled.p`
  background-color: rgba(0, 0, 0, .06);
  height: 16px;
  margin-bottom: 9px;
  width: 80%;
`;

const backgroundEffect = {
  borderRadius: "6px",
  display: "flex",
  flexDirection: "column",
  height: "100%",
  padding: "15px"
};

const EmptySlider = ({ stories = [0, 1, 2, 3] }) => {
  const containerRef = useRef(null);

  const cardWidth = () => {
    if (stories.length >= 3) {
      return "300px";
    }

    if (stories.length === 2) {
      return "50%";
    }

    return "100%";
  };

  const maxCardWidth = () => {
    if (stories.length === 1) {
      return "750px";
    }

    return "100%";
  };

  return (
    <>
      <SliderContainer>
        <ScrollbarContainer ref={containerRef}>
          <div style={{ ...slider }}>
            {stories.map(index => (
              <Card
                key={index}
                style={{ width: cardWidth(), maxWidth: maxCardWidth() }}
                type="button"
              >
                <div style={{ ...backgroundEffect, height: "400px" }}>
                  <UserPreview />
                  <TextPreview />
                  <TextPreview />
                </div>
              </Card>
            ))}
          </div>
        </ScrollbarContainer>
      </SliderContainer>
    </>
  );
};

export default EmptySlider;

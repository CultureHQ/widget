import React, { useRef } from "react";
import styled from "styled-components";

import { backgroundColor, placeholderBackgroundColor } from "../styles.json";

const SliderContainer = styled.section`
  background-color: ${props => props.backgroundColor || "transparent"};
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

const Slider = styled.div`
  background-color: transparent;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
  min-width: 100%;
  position: absolute;
  transition: transform 300ms cubic-bezier(.455, .03, .515, .955);
`;

const Card = styled.button`
  background-color: ${props => props.backgroundColor || "#f3f3f3"};
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
  background-color: ${props => props.backgroundColor || "rgba(0, 0, 0, .06)"};
  border-radius: 30px;
  height: 45px;
  width: 45px;
`;

const TextPreview = styled.p`
  background-color: ${props => props.backgroundColor || "rgba(0, 0, 0, .06)"};
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
      <SliderContainer backgroundColor={backgroundColor}>
        <ScrollbarContainer ref={containerRef}>
          <Slider>
            {stories.map(index => (
              <Card
                backgroundColor={backgroundColor}
                key={index}
                style={{ width: cardWidth(), maxWidth: maxCardWidth() }}
                type="button"
              >
                <div style={{ ...backgroundEffect, height: "400px" }}>
                  <UserPreview backgroundColor={placeholderBackgroundColor} />
                  <TextPreview backgroundColor={placeholderBackgroundColor} />
                  <TextPreview backgroundColor={placeholderBackgroundColor} />
                </div>
              </Card>
            ))}
          </Slider>
        </ScrollbarContainer>
      </SliderContainer>
    </>
  );
};

export default EmptySlider;

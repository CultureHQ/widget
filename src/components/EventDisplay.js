import styled, { css } from "styled-components";

import { font, fontSize, maxWidth } from "../styles.json";

export const EventContainer = styled.div`
  background-color: white;
  border-radius: 3px;
  box-shadow: 0.5px 0.5px 3px rgba(0, 0, 0, 0.2);
  color: #5c5f67;
  font-family: ${font};
  font-size: ${fontSize};
  margin: 8px;
  max-width: ${maxWidth};
  overflow: hidden;

  & + & {
    margin-top: 16px;
  }
`;

export const EventHeader = styled.div`
  align-items: stretch;
  display: flex;
  flex-wrap: wrap;
`;

export const EventFooter = styled.div`
  border-top: 1px solid #ddd;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  background-color: #f5f5f5;
  min-height: 38px;
  padding: 10px 15px;

  &:after {
    clear: both;
    content: "";
    display: table;
  }
`;

export const EventLeft = styled.div`
  flex-grow: 1;
  flex-basis: 55%;
`;

const eventLeftStyles = css`
  border-top-left-radius: 3px;
  background-color: rgba(0, 0, 0, 0.2);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: block;
  height: 240px;
  position: relative;
  text-decoration: none;
`;

export const EventLeftPlaceholder = styled.span(eventLeftStyles);

export const EventLeftLink = styled.a`
  ${eventLeftStyles}
  background-image: url('${({ imageUrl }) => imageUrl}');
`;

export const EventRight = styled.div`
  flex-basis: 45%;
  flex-grow: 1;
  min-width: 300px;
`;

export const EventRightPlaceholder = styled.div`
  background-color: rgba(0, 0, 0, 0.15);
  height: 1.5em;
  margin: 15px;
`;

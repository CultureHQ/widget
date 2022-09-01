import React from "react";
import styled from "styled-components";

const Container = styled.a`
  background-color: #79b17d;
  border-radius: 5px;
  color: white;
  flex-grow: 1;
  float: right;
  padding: 10px 27px;
  text-align: center;
  text-decoration: none;
`;

const MoreInfo = (props) => <Container {...props}>More Info</Container>;

export default MoreInfo;

import React from "react";
import styled from "styled-components";

import { font, fontSize, maxWidth } from "../styles.json";

const Container = styled.div`
  background-color: #f2dede;
  border: ##ebccd1 solid 1px;
  color: #a94442;
  font-family: ${font};
  font-size: ${fontSize};
  max-width: ${maxWidth};
  padding: 15px;
`;

const Link = styled.a`
  color: #a94442;
`;

const Failure = () => (
  <Container>
    <strong>Oh no!</strong> We failed to fetch the stories from CultureHQ. Please
    refresh to try again. If this continues to happen, please contact{" "}
    <Link href="mailto:support@culturehq.com">support@culturehq.com</Link>.
  </Container>
);

export default Failure;

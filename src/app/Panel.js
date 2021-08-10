import React from "react";

const PanelHeading = ({
  children,
  titleId
}) => (
  <div>
    <h2 id={titleId}>{children}</h2>
    <hr />
  </div>
);

const PanelBody = ({ children, style }) => (
  <div style={style}>{children}</div>
);

const PanelFooter = ({ children }) => (
  <div>{children}</div>
);

const Panel = ({ children, ...props }) => (
  <div {...props}>
    {children}
  </div>
);

Panel.Heading = PanelHeading;
Panel.Body = PanelBody;
Panel.Footer = PanelFooter;

export default Panel;

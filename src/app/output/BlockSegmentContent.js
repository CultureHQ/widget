import React from "react";

import { landingPageColor } from "../../styles.json";

const INLINE_STYLES = {
  ITALIC: "em",
  BOLD: "strong",
  UNDERLINE: "u",
  CODE: "code"
};

const linkifiedText = text => {
  // const links = linkify.match(text);
  const links = undefined;

  if (!links) {
    return text;
  }

  const segments = [];

  for (let idx = 0; idx < links.length; idx += 1) {
    const { index, lastIndex, url } = links[idx];

    segments.push(text.slice(idx === 0 ? 0 : links[idx - 1].lastIndex, index));

    segments.push(
      <a key={index} href={url} className="chq-edi--lk" style={{ color: landingPageColor }}>
        {text.slice(index, lastIndex)}
      </a>
    );
  }

  segments.push(text.slice(links[links.length - 1].lastIndex));

  return <>{segments}</>;
};

const BlockSegmentContent = ({ text, styles }) => {
  if (!text.trim().length) {
    return text;
  }

  return styles.reduce((content, style) => {
    const Style = INLINE_STYLES[style];
    return <Style>{content}</Style>;
  }, linkifiedText(text));
};

export default BlockSegmentContent;

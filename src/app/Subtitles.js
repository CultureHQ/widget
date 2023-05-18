/* eslint-disable jsx-a11y/media-has-caption */

import React from "react";

const Track = ({ subtitle }) => {
  const { label, language, url } = subtitle;

  return (
    <track label={label} kind="subtitles" srcLang={language} src={url} default={subtitle.default} />
  );
};

const Subtitles = ({ media }) => (
  <>
    {media.subtitles?.map(subtitle => (
      <Track key={subtitle.id} subtitle={subtitle} />
    ))}
  </>
);

export default Subtitles;

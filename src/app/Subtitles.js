/* eslint-disable jsx-a11y/media-has-caption */

import React from "react";

const Track = ({ defaultLanguage, subtitle }) => {
  const { label, language, url } = subtitle;
  const isDefaultLanguage = defaultLanguage ? defaultLanguage === language : subtitle.default;

  return (
    <track label={label} kind="subtitles" srcLang={language} src={url} default={isDefaultLanguage} />
  );
};

const Subtitles = ({ language, media }) => {
  const foundDefault = media.subtitles?.find(subtitle => language === subtitle.language);

  return (
    <>
      {media.subtitles?.map(subtitle => (
        <Track defaultLanguage={foundDefault?.language} key={subtitle.id} subtitle={subtitle} />
      ))}
    </>
  );
};

export default Subtitles;

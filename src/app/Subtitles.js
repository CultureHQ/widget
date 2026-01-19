/* eslint-disable jsx-a11y/media-has-caption */

import React, { useEffect } from "react";

const Track = ({ burnedSubtitles, defaultLanguage, subtitle }) => {
  const { label, language, url } = subtitle;
  const isDefaultLanguage = () => {
    if (burnedSubtitles) {
      return false;
    }

    return defaultLanguage ? defaultLanguage === language : subtitle.default;
  };

  return (
    <track label={label} kind="subtitles" srcLang={language} src={url} default={isDefaultLanguage()} />
  );
};

const Subtitles = ({ language, videoRef, media }) => {
  const foundDefault = media.subtitles?.find(subtitle => language === subtitle.language);

  useEffect(() => {
    if (videoRef?.current) {
      const tracks = videoRef.current.textTracks;
      for (let i = 0; i < tracks.length; i++) {
        tracks[i].mode = "disabled"; // Disable all tracks
      }
      if (!media.burnSubtitles && foundDefault) {
        for (let i = 0; i < tracks.length; i++) {
          if (tracks[i].language === foundDefault.language) {
            tracks[i].mode = "showing";
            break;
          }
        }
      }
    }
  }, [videoRef, media]);

  return (
    <>
      {media.subtitles?.map(subtitle => (
        <Track
          burnedSubtitles={media.burnSubtitles}
          defaultLanguage={foundDefault?.language}
          key={subtitle.id}
          subtitle={subtitle}
        />
      ))}
    </>
  );
};

export default Subtitles;

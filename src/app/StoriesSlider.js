import React, { useRef, useState } from "react";
import styled from "styled-components";
import LazyEditorOutput from "./LazyEditorOutput";
import LightboxStories from "./LightboxStories";

const getSlideLayout = (
  index,
  containerRef,
  sliderRef,
  stories
) => {
  let percent = index * (100 / (stories.length + 1));
  const left = index !== 0;
  let right = index !== stories.length && stories.length > 4;

  const container = containerRef.current;
  const slider = sliderRef.current;

  if (!(container instanceof HTMLDivElement) || !(slider instanceof HTMLDivElement)) {
    return { percent, left, right };
  }

  const pixels = (percent * slider.clientWidth) / 100;
  const correction = pixels - (slider.clientWidth - container.clientWidth);

  if (correction > 0) {
    percent -= (correction / slider.clientWidth) * 100;
    right = false;
  }

  return { percent, left, right };
};

const LeftArrow = styled.button`
  background: #fff;
  border: 0;
  border-radius: 30px;
  box-shadow: 1px 1px 10px #1b1b1b;
  display: flex;
  height: 45px;
  left: -25px;
  padding: 11px;
  position: absolute;
  top: calc(50% - 15px);
  width: 45px;
  z-index: 10;

  @media screen and (max-width: 480px) {
    display: none;
  }
`;

const RightArrow = styled.button`
  background: #fff;
  border: 0;
  border-radius: 30px;
  box-shadow: 1px 1px 10px #1b1b1b;
  display: flex;
  height: 45px;
  padding: 11px;
  position: absolute;
  right: -25px;
  top: calc(50% - 15px);
  width: 45px;
  z-index: 10;

  @media screen and (max-width: 480px) {
    display: none;
  }
`;

const emptyContainer = {
  height: "0",
  margin: "0 auto",
  padding: "0",
  width: "100%"
};

const container = {
  height: "400px",
  overflowX: "scroll",
  overflowY: "hidden",
  position: "relative",
  whiteSpace: "nowrap",
  width: "100%"
};

const noScrollbar = {
  msOverflowStyle: "none",
  overflow: "-moz-scrollbars-none"
};

const slider = {
  backgroundColor: "transparent",
  borderRadius: "6px",
  display: "flex",
  marginBottom: "15px",
  position: "absolute",
  transition: "transform 300ms cubic-bezier(.455, .03, .515, .955)"
};

const sliderEmpty = {
  justifyContent: "center",
  left: "0",
  right: "0"
};

const card = {
  backgroundColor: "#f3f3f3",
  backgroundSize: "cover",
  borderRadius: "6px",
  border: "0",
  cursor: "pointer",
  display: "inline-block",
  height: "400px",
  marginRight: "15px",
  padding: "0",
  position: "relative",
  textAlign: "left",
  width: "300px"
};

const chqTmb = {
  backgroundPosition: "50%",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  borderRadius: "25px",
  display: "inline-block",
  height: "40px",
  marginRight: "10px",
  width: "40px"
};

const creatorName = {
  fontSize: "16px",
  marginBottom: "5px",
  overflow: "hidden",
  overflowWrap: "break-word",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  wordBreak: "break-all"
};

const creatorContainer = {
  alignItems: "center",
  color: "#fff",
  display: "flex",
  fontSize: "16px",
  fontWeight: "300"
};

const storyBadge = {
  alignItems: "center",
  backgroundColor: "hsla(0,0%,53.3%,.8)",
  borderRadius: "6px",
  bottom: "15px",
  color: "#FFFFFF",
  display: "flex",
  fontSize: "16px",
  padding: "5px 10px",
  position: "absolute",
  right: "15px"
};

const storyBadgeIcon = {
  marginRight: "5px"
};

const backgroundEffect = {
  background: "linear-gradient(0deg, rgba(0,0,0,.3), rgba(0,0,0,.7))",
  borderRadius: "6px",
  height: "100%",
  padding: "15px"
};

const cardTitle = {
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: "2",
  color: "#FFFFFF",
  display: "-webkit-box",
  fontSize: "24px",
  fontWeight: "600",
  margin: "15px 0 10px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "initial"
};

const getDuration = seconds => {
  if (seconds) {
    return new Date(1000 * seconds).toISOString().substr(14, 5);
  }

  return "0:00";
};

const StoriesSlider = ({ stories = [] }) => {
  const [index, setIndex] = useState(0);
  const [activeStory, setActiveStory] = useState(undefined);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const onNext = () => setIndex(value => value + 1);
  const onPrev = () => setIndex(value => value - 1);

  const containerRef = useRef(null);
  const sliderRef = useRef(null);
  const slideLayout = getSlideLayout(index, containerRef, sliderRef, stories);

  const handleStoryClick = goToIndex => {
    let target = goToIndex;

    if (goToIndex === -1) {
      target = stories.length - 1;
    }

    if (goToIndex > stories.length - 1) {
      target = 0;
    }

    setActiveStory(stories[target]);
    setModalIsOpen(true);
  };

  const handleThumbnailClick = goToIndex => {
    let target = goToIndex;

    if (goToIndex === -1) {
      target = stories.length - 1;
    }

    if (goToIndex > stories.length - 1) {
      target = 0;
    }

    setActiveStory(stories[target]);
    setModalIsOpen(true);
  };

  const handleClose = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      {activeStory && (
        <LightboxStories
          modalIsOpen={modalIsOpen}
          activeStory={activeStory}
          currentUserAnswered
          stories={stories}
          onClose={handleClose}
          onStoryChange={handleThumbnailClick}
          noActions
          landingPage
        />
      )}
      <div style={{ position: "relative" }}>
        <LeftArrow
          aria-label="Previous"
          type="button"
          onClick={onPrev}
          disabled={!slideLayout.left}
        >
          <svg aria-hidden="true" role="presentation" width="22px" height="22px" viewBox="0 0 1024 1024">
            <path transform="translate(0 0)" d="M427.4 512v0 0l334.4-348.2c8.4-8.6 8.2-22.8-0.4-31.6l-59.8-61.2c-8.6-8.8-22.6-9-31-0.4l-408.4 425.2c-4.4 4.4-6.4 10.4-6 16.2-0.2 6 1.8 11.8 6 16.2l408.4 425.4c8.4 8.6 22.4 8.4 31-0.4l59.8-61.2c8.6-8.8 8.8-23 0.4-31.6l-334.4-348.4z" />
          </svg>
        </LeftArrow>
        <RightArrow
          aria-label="Next"
          type="button"
          onClick={onNext}
          disabled={!slideLayout.right}
        >
          <svg aria-hidden="true" role="presentation" width="22px" height="22px" viewBox="0 0 1024 1024">
            <path transform="translate(0 0)" d="M596.6 512v0 0l-334.4-348.2c-8.4-8.6-8.2-22.8 0.4-31.6l59.8-61.2c8.6-8.8 22.6-9 31-0.4l408.4 425.4c4.4 4.4 6.4 10.4 6 16.2 0.2 6-1.8 11.8-6 16.2l-408.4 425.2c-8.4 8.6-22.4 8.4-31-0.4l-59.8-61.2c-8.6-8.8-8.8-23-0.4-31.6l334.4-348.4z" />
          </svg>
        </RightArrow>
        <div
          ref={containerRef}
          style={{ ...noScrollbar, ...stories.length === 0 ? emptyContainer : container }}
        >
          <div
            ref={sliderRef}
            style={{ ...slider, ...stories.length === 0 ? sliderEmpty : {}, transform: `translateX(-${slideLayout.percent}%)` }}
          >
            {stories.map((story, storyIndex) => (
              <button
                aria-labelledby={story.id}
                key={story.id}
                style={{ ...card, backgroundImage: `url(${story.thumbUrl})` }}
                onClick={() => handleStoryClick(storyIndex)}
                type="button"
              >
                <div id={story.id} style={{ display: "none" }}>{story.question.question}</div>
                <div style={{ ...backgroundEffect, height: "calc(100% - 30px)" }}>
                  <div style={creatorContainer}>
                    <div style={{ ...chqTmb, backgroundImage: `url(${story.creator.avatar.thumbUrl})` }} />
                    <div>
                      <p style={{ margin: "0", ...creatorName }}>{story.creator.name}</p>
                      <p style={{ margin: "0" }}>{story.creator.title}</p>
                    </div>
                  </div>
                  <p style={cardTitle}>{story.question.question}</p>
                  <LazyEditorOutput output={story.body} showDefaultTag hideBody />
                  {story.media.mediaType === "video" && (
                    <span style={storyBadge}>
                      <svg style={storyBadgeIcon} aria-hidden="true" role="presentation" width="14px" height="14px" viewBox="0 0 264 264">
                        <path transform="translate(0 0)" style={{ fill: "#FFFFFF" }} d="M238.163,115.57l-68.127-39.741c-15.201-8.899-40.064-23.393-55.296-32.256L44.115,3.831 C28.919-5.067,13.974,2.07,13.974,19.698v224c0,17.567,14.945,24.735,30.147,15.872l69.376-39.741 c15.232-8.863,40.735-23.357,55.936-32.256l68.449-39.741C253.047,138.933,253.334,124.433,238.163,115.57z" />
                      </svg>
                      {getDuration(story.media.lenght)}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default StoriesSlider;

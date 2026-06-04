import React, { useEffect, useRef, useState } from "react";
import { makePost, makeGet } from "@culturehq/client";
import styled from "styled-components";
import LightboxStories from "./LightboxStories";

import defaultStyles from "../styles.json";
import CHQStory from "../lib/CHQStory";
import isTarget from "./utils/isTarget";
import getHeightPerOrg from "./utils/getHeightPerOrg";
import displayCreatorName from "./utils/displayCreatorName";
import usesDefaultPlayButton from "./utils/usesDefaultPlayButton";
import orgVideoPlayButton from "./utils/orgVideoPlayButton";

const getSlideLayout = (index, containerRef, sliderRef, stories, displayArrows, pagination) => {
  let percent = index * (100 / (stories.length));
  const left = index !== 0 && displayArrows;
  const isDispalyingLastStory = index + 1 === stories.length && pagination.currentPage === pagination.totalPages;
  let right = !isDispalyingLastStory && displayArrows;

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

const SliderContainer = styled.section`
  position: relative;

  -ms-overflow-style: none; // IE 10+
  overflow: -moz-scrollbars-none; // Firefox

  &::-webkit-scrollbar {
    display: none; // Safari and Chrome
  }
`;

const organizationArrowHoverStyles = {
  Target: `
    fill: #cc0000;
  `
}

const ArrowIcon = styled.svg`
  display: block;
  height: 22px !important;
  width: 22px !important;
`;

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
  top: calc(50% - 22.5px);
  width: 45px;
  z-index: 10;

  &:hover {
    background-color: #fff;
    cursor: pointer;

    path {
      ${props => organizationArrowHoverStyles[props.organizationName] || `
        fill: #000000;
      `}
    }
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
  top: calc(50% - 22.5px);
  width: 45px;
  z-index: 10;

  &:hover {
    background-color: #fff;
    cursor: pointer;

    path {
      ${props => organizationArrowHoverStyles[props.organizationName] || `
        fill: #000000;
      `}
    }
  }
`;

const ScrollbarContainer = styled.div`
  ${props => `
    height: ${getHeightPerOrg(props.organizationName)};
    `}
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

const slider = {
  backgroundColor: "transparent",
  borderRadius: "6px",
  display: "flex",
  justifyContent: "center",
  marginBottom: "15px",
  minWidth: "100%",
  position: "absolute",
  transition: "transform 300ms cubic-bezier(.455, .03, .515, .955)"
};

const sliderEmpty = {
  justifyContent: "center",
  left: "0",
  right: "0"
};

const organizationCardStyles = {
  Target: `
    border-radius: 16px;
  `
};

const Card = styled.button`
  background-color: #f3f3f3;
  background-position: center;
  background-size: cover;
  border-radius: 6px;
  border: 0;
  cursor: pointer;
  display: inline-block;
  ${props => `
    height: ${getHeightPerOrg(props.organizationName)};
  `}
  margin-right: 15px;
  max-width: 750px;
  overflow: hidden;
  padding: 0;
  position: relative;
  text-align: left;
  width: 300px;

  // Custom styles based on organizationName
  ${props => organizationCardStyles[props.organizationName] || `
    border-radius: 6px;
    height: ${getHeightPerOrg(props.organizationName)};
  `}
`;

const chqTmb = {
  backgroundPosition: "50%",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  borderRadius: "25px",
  display: "inline-block",
  height: "45px",
  marginRight: "10px",
  minWidth: "45px",
  width: "45px"
};

const creatorNamePerOrg = (organizationName) => {
  if (isTarget(organizationName)) {
    return {
      fontSize: "20px",
      fontWeight: "600"
    };
  }

  return {};
};

const creatorName = {
  color: "#FFFFFF",
  fontSize: "16px",
  fontWeight: "600",
  marginBottom: "3px",
  overflow: "hidden",
  overflowWrap: "break-word",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  wordBreak: "break-all"
};

const creatorTitlePerOrg = (organizationName) => {
  if (isTarget(organizationName)) {
    return {
      fontSize: "18px"
    };
  }

  return {};
};

const creatorTitle = {
  color: "#FFFFFF",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap"
};

const creatorContainer = {
  alignItems: "center",
  background: "linear-gradient(180deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0))",
  color: "#fff",
  display: "flex",
  fontSize: "16px",
  fontWeight: "300",
  left: 0,
  padding: "15px 15px 30px",
  position: "absolute",
  right: 0,
  top: 0
};

const backgroundEffect = {
  alignItems: "center",
  borderRadius: "6px",
  display: "flex",
  flexDirection: "column",
  height: "100%",
  justifyContent: "center"
};

const cardTitleContainer = {
  background: "linear-gradient(0deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0))",
  bottom: 0,
  left: 0,
  padding: "30px 15px 15px",
  position: "absolute",
  right: 0
};

const cardTitlePerOrg = (organizationName) => {
  if (isTarget(organizationName)) {
    return { WebkitLineClamp: "3" };
  }

  return { WebkitLineClamp: "2" };
};

const cardTitle = {
  WebkitBoxOrient: "vertical",
  color: "#FFFFFF",
  display: "-webkit-box",
  fontSize: "24px",
  fontWeight: "600",
  lineHeight: "normal",
  margin: "0",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "initial"
};

const TopTextContainer = styled.div`
  width: 80%;
`;

const StoriesSlider = ({ filters = {}, organizationId, organizationName, stories = [], pagination }) => {
  const defaultHeight = getHeightPerOrg(organizationName);
  const [index, setIndex] = useState(0);
  const [appending, setAppending] = useState(false);
  const [currentStories, setCurrentStories] = useState([]);
  const [currentPagination, setCurrentPagination] = useState();
  const [activeStory, setActiveStory] = useState(undefined);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [gaClientId, setGaClientId] = useState();
  const [gaSessionId, setGaSessionId] = useState();
  const [fullWidth, setFullWidth] = useState(false);
  const [cardHeight, setCardHeight] = useState(defaultHeight);
  const [displayArrows, setDisplayArrows] = useState(false);

  const containerRef = useRef(null);
  const sliderRef = useRef(null);
  const slideLayout = getSlideLayout(index, containerRef, sliderRef, currentStories, displayArrows, currentPagination);

  useEffect(() => {
  if (containerRef.current) {
    const containerWidth = containerRef.current.getBoundingClientRect().width;
    const isFullWidth = containerWidth <= 500;
    setFullWidth(isFullWidth);
    
    if (isFullWidth) {
      const aspectRatio = 4/3;
      const newHeight = aspectRatio * containerWidth;
      setCardHeight(`${newHeight}px`);
    } else {
      setCardHeight(defaultHeight);
    }
  }
}, [containerRef]);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.getBoundingClientRect().width;
        const isFullWidth = containerWidth <= 500;
        setFullWidth(isFullWidth);
        
        if (isFullWidth) {
          const aspectRatio = 4/3;
          const newHeight = aspectRatio * containerWidth;
          setCardHeight(`${newHeight}px`);
        } else {
          setCardHeight(defaultHeight);
        }

        setDisplayArrows(containerRef.current.scrollWidth > containerRef.current.clientWidth);
      }
    };

    window.addEventListener('resize', handleResize);
    
    // Initial calculation
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Remove fullWidth dependency to avoid circular dependency

  useEffect(
    () => {
      const getGaClientCookie = () => {
        const gaClientCookie = document.cookie.match(/_ga=([^;]+)/g);
        let clientId = "";
        if (gaClientCookie?.length > 0) {
          const gaCookie = gaClientCookie[0];
          const match = gaCookie.match(/GA[1-2]\.[0-9]+\.(\d+)\.(\d+)/);
          if (match) {
            clientId = `${match[1]}.${match[2]}`;
          }
        }
        return clientId;
      };

      const getGaSessionCookie = () => {
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i += 1) {
          const cookie = cookies[i].trim();

          // Check if the cookie starts with the given cookieName
          if (cookie.startsWith("_ga_")) {
            // Extract the value from the cookie
            const cookieParts = cookie.split("=");
            const cookieValue = cookieParts[1];
            // Split the value by periods and get the desired part
            const valueParts = cookieValue.split(".");
            const desiredValue = valueParts[2];

            return desiredValue;
          }
        }

        return "";
      };

      setGaClientId(getGaClientCookie());
      setGaSessionId(getGaSessionCookie());
    }, []
  );

  useEffect(
    () => {
      setCurrentStories(stories)
    }, [stories]
  );

  useEffect(() => {
    const containerDiv = containerRef.current;
    if (containerDiv) {
      setDisplayArrows(containerDiv.scrollWidth > containerDiv.clientWidth);
    }
  }, [containerRef.current]);

  useEffect(
    () => {
      setCurrentPagination(pagination)
    }, [pagination]
  );

  useEffect(
    () => {
      if (!slideLayout.right && currentStories.length !== 0
        && currentPagination.currentPage !== currentPagination.totalPages) {
          if (!appending) {
            setAppending(true);
            makeGet("/landing_pages/stories", { ...filters, page: currentPagination.currentPage + 1, pageSize: 10 })
              .then(({ stories: newStories, pagination: newPagination }) => {
                setCurrentStories([...currentStories, ...newStories.map((story) => new CHQStory(story))]);
                setCurrentPagination(newPagination);
                setAppending(false);
              }).catch(() => {
                setAppending(false);
              });
          }
      }
    },
    [slideLayout.right, currentPagination, currentStories, appending]
  );

  const trackData = (eventAction, storyId = undefined, params = {}) => {
    const eventData = {
      storyId,
      eventAction,
      origin: "carousel",
      ...params
    };
    document.dispatchEvent(new CustomEvent(eventAction, { detail: eventData }));

    return makePost("/stories/track", {
      organizationId,
      storyId,
      eventAction,
      url: window.location.href,
      type: "carousel",
      gaClientId,
      gaSessionId,
      customSessionId: gaSessionId,
      ...params
    })
      .then(_ => {})
      .catch(_ => {});
  };

  const onNext = () => {
    setIndex((value) => value + 1);
    trackData("view_stories");
  };
  const onPrev = () => {
    setIndex((value) => value - 1);
    trackData("view_stories");
  };

  const handleThumbnailClick = (goToIndex) => {
    let target = goToIndex;

    if (goToIndex === -1) {
      target = currentStories.length - 1;
    }

    if (goToIndex > currentStories.length - 1) {
      target = 0;
    }

    trackData("open_story", currentStories[target].story.id);

    setActiveStory(currentStories[target]);
    setModalIsOpen(true);
  };

  const handleClose = () => {
    setModalIsOpen(false);
  };

  const cardWidth = () => {
    if (fullWidth && containerRef.current) {
      const containerWidth = containerRef.current.getBoundingClientRect().width;
      return `${containerWidth}px`;
    }
    if (currentStories.length >= 3) {
      return "300px";
    }

    if (currentStories.length === 2) {
      return "50%";
    }

    return "100%";
  };

  const maxCardWidth = () => {
    if (currentStories.length === 1) {
      return "750px";
    }

    return "100%";
  };

  const backgroundImage = story => {
    if (currentStories.length >= 2) {
      return story.thumbUrl;
    }

    return story.thumbFullUrl;
  };

  const storyAriaLabel = (storyIndex) => {
    const { question, media } = currentStories[storyIndex];
    const baseLabel = `${question.question}, carousel item ${storyIndex + 1} of ${currentStories.length}`;
    return media.mediaType === "video" ? `${baseLabel}. Play video. Opens in a modal` : baseLabel;
  };

  return (
    <>
      {activeStory && (
        <LightboxStories
          modalIsOpen={modalIsOpen}
          activeStory={activeStory}
          currentUserAnswered
          language={filters.language}
          stories={currentStories}
          organizationId={organizationId}
          organizationName={organizationName}
          onClose={handleClose}
          onStoryChange={handleThumbnailClick}
          noActions
        />
      )}
      <SliderContainer>
        <LeftArrow
          aria-label="Previous"
          type="button"
          onClick={onPrev}
          organizationName={organizationName}
          style={{ display: slideLayout.left ? "flex" : "none" }}
        >
          <ArrowIcon
            aria-hidden="true"
            role="presentation"
            viewBox="0 0 1024 1024"
          >
            <path
              transform="translate(0 0)"
              d="M427.4 512v0 0l334.4-348.2c8.4-8.6 8.2-22.8-0.4-31.6l-59.8-61.2c-8.6-8.8-22.6-9-31-0.4l-408.4 425.2c-4.4 4.4-6.4 10.4-6 16.2-0.2 6 1.8 11.8 6 16.2l408.4 425.4c8.4 8.6 22.4 8.4 31-0.4l59.8-61.2c8.6-8.8 8.8-23 0.4-31.6l-334.4-348.4z"
            />
          </ArrowIcon>
        </LeftArrow>
        <ScrollbarContainer ref={containerRef} organizationName={organizationName} style={{ height: cardHeight }}>
          <div
            ref={sliderRef}
            style={{
              ...slider,
              ...(currentStories.length === 0 ? sliderEmpty : {}),
              transform: `translateX(-${slideLayout.percent}%)`,
            }}
          >
            {currentStories.map((story, storyIndex) => (
              <Card
                aria-label={storyAriaLabel(storyIndex)}
                data-chq-container={story.id}
                key={story.id}
                style={{
                  backgroundImage: `url(${backgroundImage(story)})`,
                  width: cardWidth(),
                  maxWidth: maxCardWidth(),
                  height: cardHeight
                }}
                onClick={() => handleThumbnailClick(storyIndex)}
                organizationName={organizationName}
                type="button"
              >
                <div id={story.id} style={{ display: "none" }}>
                  {story.question.question}
                </div>
                <div style={{ ...backgroundEffect, height: cardHeight }}>
                  <div style={creatorContainer}>
                    <div
                      style={{
                        ...chqTmb,
                        backgroundImage: `url(${story.creator.avatar.thumbUrl})`,
                      }}
                    />
                    <TopTextContainer>
                      <p
                        style={{
                          margin: "0",
                          fontFamily: defaultStyles[organizationName]?.font || defaultStyles.default.font,
                          ...creatorName,
                          ...creatorNamePerOrg(organizationName)
                        }}
                      >
                        {displayCreatorName(story.creator, organizationName)}
                      </p>
                      <p
                        style={{
                          margin: "0",
                          fontFamily: defaultStyles[organizationName]?.font || defaultStyles.default.font,
                          ...creatorTitle,
                          ...creatorTitlePerOrg(organizationName)
                        }}
                      >
                        {story.creator.title}
                      </p>
                    </TopTextContainer>
                  </div>
                  <div style={cardTitleContainer}>
                    <p
                      style={{
                        fontFamily: defaultStyles[organizationName]?.font || defaultStyles.default.font,
                        ...cardTitle,
                        ...cardTitlePerOrg(organizationName)
                      }}
                    >
                      {story.question.question}
                    </p>
                    {story.media.mediaType === "video" && !usesDefaultPlayButton(organizationName) && orgVideoPlayButton(organizationName)}
                  </div>
                  {story.media.mediaType === "video" && usesDefaultPlayButton(organizationName) && orgVideoPlayButton(organizationName)}
                </div>
              </Card>
            ))}
          </div>
        </ScrollbarContainer>
        <RightArrow
          aria-label="Next"
          type="button"
          onClick={onNext}
          style={{ display: slideLayout.right ? "flex" : "none" }}
        >
          <ArrowIcon
            aria-hidden="true"
            role="presentation"
            viewBox="0 0 1024 1024"
          >
            <path
              transform="translate(0 0)"
              d="M596.6 512v0 0l-334.4-348.2c-8.4-8.6-8.2-22.8 0.4-31.6l59.8-61.2c8.6-8.8 22.6-9 31-0.4l408.4 425.4c4.4 4.4 6.4 10.4 6 16.2 0.2 6-1.8 11.8-6 16.2l-408.4 425.2c-8.4 8.6-22.4 8.4-31-0.4l-59.8-61.2c-8.6-8.8-8.8-23-0.4-31.6l334.4-348.4z"
            />
          </ArrowIcon>
        </RightArrow>
      </SliderContainer>
    </>
  );
};

export default StoriesSlider;

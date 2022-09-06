import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { makePost } from "@culturehq/client";
import styled from "styled-components";
import LightboxStories from "./LightboxStories";
import getImageFromStory from "./utils/getImageFromStory";
import imagesSizes from "./utils/imagesSizes";
import { backgroundColor, font } from "../styles.json";

const getSlideLayout = (
  index,
  containerRef,
  sliderRef,
  size
) => {
  const TREND_WIDTH = containerRef.current?.offsetWidth;
  const PADDING = 15;
  let percent = index * (100 / (size));
  const left = index !== 0;
  let right = index !== size && size > 1;

  const container = containerRef.current;
  const slider = sliderRef.current;
  const sliderWidth = (TREND_WIDTH * size) + (PADDING * (size));

  if (!(container instanceof HTMLDivElement) || !(slider instanceof HTMLDivElement)) {
    return { percent, left, right };
  }

  const pixels = (percent * sliderWidth) / 100;
  const correction = pixels - (slider.clientWidth - container.clientWidth);

  if ((index + 1) * (100 / (size)) >= 100) {
    right = false;
  }

  if (correction > 0) {
    percent -= (correction / sliderWidth) * 100;
  }

  return { percent, left, right };
};

const SliderContainer = styled.section`
  background-color: transparent;
  font-family: ${props => props.fontFamily || font};
  position: relative;

  -ms-overflow-style: none; // IE 10+
  overflow: -moz-scrollbars-none; // Firefox

  &::-webkit-scrollbar {
    display: none; // Safari and Chrome
  }
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
  top: calc(50% - 15px);
  width: 45px;
  z-index: 10;

  @media screen and (max-width: 480px) {
    display: none;
  }

  &:hover {
    cursor: pointer;
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

  &:hover {
    cursor: pointer;
  }
`;

const ScrollbarContainer = styled.div`
  height: 360px;
  margin: 20px 0;
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

const Card = styled.button`
  appearance: none;
  background: transparent;
  background-color: transparent;
  background-size: cover;
  border-radius: 6px;
  border: 0;
  color: #6a89af;
  cursor: pointer;
  display: flex;
  font-family: inherit;
  font-size: inherit;
  height: 350px;
  line-height: inherit;
  margin-right: 15px;
  padding: 0;
  text-align: left;
  width: 200px;
`;

const TrendSliderStories = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 34%;
`;

const TrendsSliderStoriesImage = styled.div`
  background-position: center;
  background-size: cover;
  border-bottom-right-radius: 6px;
  flex: 1 1;
  height: 50%;
  position: relative;

  &:first-child {
    border-bottom-right-radius: 0;
    border-top-right-radius: 6px;
    margin-bottom: 7px;
  }
`;

const TrendsSliderStoriesImageOverlay = styled.div`
  align-items: center;
  background-color: rgba(255, 197, 78, 0.6);
  border-bottom-right-radius: 6px;
  bottom: 0;
  color: #fff;
  display: flex;
  font-size: 18px;
  font-weight: 400;
  justify-content: center;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
`;

const trendSliderBanner = {
  backgroundPosition: "center",
  backgroundSize: "cover",
  borderRadius: "6px 0 0 6px",
  height: "100%",
  marginRight: "7px",
  position: "relative",
  width: "66%"
};

const trendSliderBannerOverlay = {
  background: "linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.2) 70%, rgba(0, 0, 0, 0.6) 100%)",
  borderRadius: "6px",
  display: "flex",
  flexDirection: "column",
  height: "350px",
  position: "absolute",
  width: "100%"
};

const sublabel = {
  alignItems: "center",
  color: "#fff",
  display: "flex",
  fontSize: "18px",
  fontWeight: ",400",
  margin: "0",
  overflow: "hidden",
  padding: "15px 10px 0 10px",
  textOverflow: "ellipsis",
  width: "calc(100% - 20px)"
};

const sublabelIcon = {
  height: "18px",
  width: "18px",
  marginRight: "5px"
};

const label = {
  color: "#fff",
  fontSize: "26px",
  fontWeight: "600",
  marginBottom: "0",
  marginTop: "5px",
  paddingLeft: "10px",
  paddingRight: "10px",
  whiteSpace: "normal",
  width: "calc(100% - 20px)"
};

const StoryTrendChildImage = ({
  childAnswer, index
}) => {
  if (index > 1) {
    return <></>;
  }

  return (
    <TrendsSliderStoriesImage style={{ backgroundImage: `url(${getImageFromStory(imagesSizes.SMALL, childAnswer)})` }}>
      {index === 1 && (
        <TrendsSliderStoriesImageOverlay>
          <p style={{ fontFamily: font }}>View stories</p>
        </TrendsSliderStoriesImageOverlay>
      )}
    </TrendsSliderStoriesImage>
  );
};

const StoryTrendSlider = ({ organizationId, storyTrends = [] }) => {
  const [index, setIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [activeStory, setActiveStory] = useState(undefined);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [stories, setStories] = useState([]);

  const containerRef = useRef(null);
  const sliderRef = useRef(null);
  const slideLayout = getSlideLayout(index, containerRef, sliderRef, storyTrends.length);

  const trackData = (eventAction, storyId = undefined) => (
    makePost("/stories/track", {
      organizationId,
      storyId,
      eventAction,
      url: window.location.href,
      type: "carousel"
    }).then((_) => {}).catch((_) => {})
  );

  useLayoutEffect(() => {
    const adjustCardSize = () => {
      setCardWidth(containerRef.current?.offsetWidth);
    };
    window.addEventListener("resize", adjustCardSize);
    return () => window.removeEventListener("resize", adjustCardSize);
  }, [containerRef]);

  useEffect(
    () => {
      setCardWidth(containerRef.current?.offsetWidth);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [containerRef.current]
  );

  const onNext = () => {
    setIndex(value => value + 1);
    trackData("Viewing stories");
  };
  const onPrev = () => {
    setIndex(value => value - 1);
    trackData("Viewing stories");
  };

  const handleThumbnailClick = goToIndex => {
    let target = goToIndex;

    if (goToIndex === -1) {
      target = stories.length - 1;
    }

    if (goToIndex > stories.length - 1) {
      target = 0;
    }

    trackData("Opening a story", stories[target].id);
    setActiveStory(stories[target]);
    setModalIsOpen(true);
  };

  const handleClose = () => {
    setModalIsOpen(false);
  };

  const handleTrendClick = trend => {
    setStories(trend.childApprovedAnswers);
    trackData("Opening a story", trend.childApprovedAnswers[0].id);
    setActiveStory(trend.childApprovedAnswers[0]);
    setModalIsOpen(true);
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
      <SliderContainer fontFamily={font}>
        <LeftArrow
          aria-label="Previous"
          type="button"
          onClick={onPrev}
          style={{ display: slideLayout.left ? "block" : "none" }}
        >
          <svg
            aria-hidden="true"
            role="presentation"
            width="22px"
            height="22px"
            viewBox="0 0 1024 1024"
          >
            <path
              transform="translate(0 0)"
              d="M427.4 512v0 0l334.4-348.2c8.4-8.6 8.2-22.8-0.4-31.6l-59.8-61.2c-8.6-8.8-22.6-9-31-0.4l-408.4 425.2c-4.4 4.4-6.4 10.4-6 16.2-0.2 6 1.8 11.8 6 16.2l408.4 425.4c8.4 8.6 22.4 8.4 31-0.4l59.8-61.2c8.6-8.8 8.8-23 0.4-31.6l-334.4-348.4z"
            />
          </svg>
        </LeftArrow>
        <RightArrow
          aria-label="Next"
          type="button"
          onClick={onNext}
          style={{ display: slideLayout.right ? "block" : "none" }}
        >
          <svg
            aria-hidden="true"
            role="presentation"
            width="22px"
            height="22px"
            viewBox="0 0 1024 1024"
          >
            <path
              transform="translate(0 0)"
              d="M596.6 512v0 0l-334.4-348.2c-8.4-8.6-8.2-22.8 0.4-31.6l59.8-61.2c8.6-8.8 22.6-9 31-0.4l408.4 425.4c4.4 4.4 6.4 10.4 6 16.2 0.2 6-1.8 11.8-6 16.2l-408.4 425.2c-8.4 8.6-22.4 8.4-31-0.4l-59.8-61.2c-8.6-8.8-8.8-23-0.4-31.6l334.4-348.4z"
            />
          </svg>
        </RightArrow>
        <ScrollbarContainer ref={containerRef}>
          <div
            ref={sliderRef}
            style={{
              ...slider,
              ...(storyTrends.length === 0 ? sliderEmpty : {}),
              transform: `translateX(-${slideLayout.percent}%)`
            }}
          >
            {storyTrends.map(trend => (
              <Card
                aria-labelledby={trend.id}
                key={trend.id}
                style={{ width: cardWidth }}
                onClick={() => handleTrendClick(trend)}
              >
                <div id={trend.id} style={{ display: "none" }}>{trend.question}</div>
                <div style={{ ...trendSliderBanner, backgroundImage: `url(${trend.imageUrl})` }}>
                  <div style={trendSliderBannerOverlay}>
                    <p style={sublabel}>
                      <svg
                        aria-hidden="true"
                        role="presentation"
                        width="22px"
                        height="22px"
                        style={sublabelIcon}
                        viewBox="0 0 512 512"
                      >
                        <path
                          style={{ fill: "#FFFFFF" }}
                          transform="translate(0 0)"
                          d="M408.623,149.217c-1.7-3.584-5.304-5.857-9.257-5.857H284.473l42.68-129.925c1.044-3.113,0.512-6.533-1.413-9.195 C323.794,1.577,320.722,0,317.446,0h-122.88c-4.403,0-8.315,2.826-9.728,7.004l-81.92,245.76 c-1.044,3.113-0.512,6.554,1.434,9.216c1.905,2.683,4.997,4.26,8.294,4.26h67.707l-77.435,232.284 c-1.556,4.669,0.451,9.81,4.772,12.186c1.556,0.86,3.256,1.29,4.956,1.29c2.97,0,5.898-1.311,7.905-3.748l286.72-348.16 C409.79,157.061,410.322,152.822,408.623,149.217z"
                        />
                      </svg>
                      Story Trend
                    </p>
                    <p style={label}>{trend.question}</p>
                  </div>
                </div>
                <TrendSliderStories>
                  {trend.childApprovedAnswers.map((childAnswer, index) => (
                    <StoryTrendChildImage childAnswer={childAnswer} index={index} />
                  ))}
                </TrendSliderStories>
              </Card>
            ))}
          </div>
        </ScrollbarContainer>
      </SliderContainer>
    </>
  );
};

export default StoryTrendSlider;

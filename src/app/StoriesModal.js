import React, { useEffect, useState } from "react";
import { makePost } from "@culturehq/client";
import LightboxStories from "./LightboxStories";

const StoriesModal = ({ organizationId, stories = [], triggerHref }) => {
  const [activeStory, setActiveStory] = useState(undefined);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(
    () => {
      const openStory = () => {
        handleThumbnailClick(0);
      }

      // Find element
      const trigger = document.querySelector(`a[href="${triggerHref}"]`);
      trigger?.removeEventListener('click', openStory);
      // Add event listener
      trigger?.addEventListener('click', openStory);
    }, []
  );

  const trackData = (eventAction, storyId = undefined) =>
    makePost("/stories/track", {
      organizationId,
      storyId,
      eventAction,
      url: window.location.href,
      type: "story_modal",
    })
      .then((_) => {})
      .catch((_) => {});

  const handleThumbnailClick = (goToIndex) => {
    let target = goToIndex;

    if (goToIndex === -1) {
      target = stories.length - 1;
    }

    if (goToIndex > stories.length - 1) {
      target = 0;
    }

    trackData("Opening a story", stories[target].story.id);

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
    </>
  );
};

export default StoriesModal;

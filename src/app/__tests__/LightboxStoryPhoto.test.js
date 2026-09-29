import React from "react";
import { mount } from "enzyme";
import { makePost } from "@culturehq/client";

import LightboxStoryPhoto from "../LightboxStoryPhoto";

jest.mock("@culturehq/client", () => ({
  makePost: jest.fn(() => Promise.resolve())
}));

const buildVideoStory = storyId => ({
  id: storyId,
  body: null,
  commentCount: 0,
  creator: null,
  question: { question: `Question ${storyId}` },
  media: {
    mediaType: "video",
    thumbnail: `https://example.com/${storyId}.png`,
    url: `https://example.com/${storyId}.mp4`
  }
});

const mountLightbox = activeStory => mount(
  <LightboxStoryPhoto
    activeStory={activeStory}
    containerRef={React.createRef()}
    onChangedFinished={() => {}}
    organizationId={42}
  />
);

const durationEvents = () => (
  makePost.mock.calls
    .map(([, params]) => params)
    .filter(params => params.eventAction === "play_duration_story_video")
);

describe("closing the lightbox while a video is playing", () => {
  let dispatched;
  const listener = event => dispatched.push(event.detail);

  beforeEach(() => {
    makePost.mockClear();
    dispatched = [];
    document.cookie = "_ga=GA1.1.123456789.987654321";
    document.cookie = "_ga_TEST=GS1.1.1700000000.1.1.1700000000.0.0.0";
    document.addEventListener("play_duration_story_video", listener);
  });

  afterEach(() => {
    document.removeEventListener("play_duration_story_video", listener);
  });

  test("reports the watch duration for the story that is playing", () => {
    const component = mountLightbox(buildVideoStory(1));

    component.setProps({ activeStory: buildVideoStory(2) });
    component.update();
    component.find("video").simulate("play");

    component.unmount();

    expect(dispatched).toHaveLength(1);
    expect(dispatched[0].storyId).toEqual(2);
    expect(durationEvents()).toHaveLength(1);
    expect(durationEvents()[0].storyId).toEqual(2);
  });

  test("sends the Google Analytics ids read from the cookies", () => {
    const component = mountLightbox(buildVideoStory(1));

    component.find("video").simulate("play");
    component.unmount();

    expect(durationEvents()).toHaveLength(1);
    expect(durationEvents()[0]).toMatchObject({
      organizationId: 42,
      storyId: 1,
      gaClientId: "123456789.987654321",
      gaSessionId: "1700000000",
      customSessionId: "1700000000"
    });
  });

  test("does not report a duration when nothing was playing", () => {
    const component = mountLightbox(buildVideoStory(1));

    component.setProps({ activeStory: buildVideoStory(2) });
    component.unmount();

    expect(dispatched).toHaveLength(0);
    expect(durationEvents()).toHaveLength(0);
  });
});

test("reports the previous story's duration when switching stories mid-play", () => {
  makePost.mockClear();
  const component = mountLightbox(buildVideoStory(1));

  component.find("video").simulate("play");
  component.setProps({ activeStory: buildVideoStory(2) });

  expect(durationEvents()).toHaveLength(1);
  expect(durationEvents()[0].storyId).toEqual(1);

  component.unmount();
  expect(durationEvents()).toHaveLength(1);
});

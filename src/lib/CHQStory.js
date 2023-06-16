import { PLATFORM_ROOT } from "../config";

class CHQStory {
  constructor(story) {
    this.story = story;
  }

  get id() {
    return this.story.id;
  }

  get body() {
    return this.story.body;
  }

  get creator() {
    return this.story.creator;
  }

  get media() {
    return this.story.media;
  }

  get visuals() {
    return this.story.visuals;
  }

  get question() {
    return this.story.question;
  }

  get thumbUrl() {
    if (this.story.media.mediaType === "video") {
      return this.story.media.thumbnail;
    }

    return this.story.media.url
  }

  get thumbFullUrl() {
    return (
      this.story.media.fullUrl ||
      this.story.media.thumbnail ||
      this.story.media.url
    );
  }

  get createdAt() {
    return this.story.createdAt;
  }

  get href() {
    return `${PLATFORM_ROOT}/stories/${this.story.question.id}`;
  }
}

export default CHQStory;

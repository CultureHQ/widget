import { PLATFORM_ROOT, PREVIEW_LIMIT } from "../config";

import formatTimestamp from "./format-timestamp";

const DAY_IN_MILLISECONDS = 86400000;

class CHQEvent {
  constructor(event) {
    this.event = event;
  }

  get id() {
    return this.event.id;
  }

  get name() {
    return this.event.name;
  }

  get sponsored() {
    return this.event.sponsored;
  }

  get location() {
    return this.event.location;
  }

  get cap() {
    return this.event.cap;
  }

  get cancelledAt() {
    return this.event.cancelledAt;
  }

  get host() {
    return this.event.host;
  }

  get image() {
    return this.event.image;
  }

  get imageUrl() {
    return this.image.mediumUrl;
  }

  get href() {
    return `${PLATFORM_ROOT}/events/${this.event.id}`;
  }

  get isLive() {
    const currentDate = new Date();
    if (currentDate < new Date(this.event.startsAt)) {
      return false;
    }

    const firstDayEnd =
      new Date(this.event.startsAt).getTime() + DAY_IN_MILLISECONDS;
    return currentDate < new Date(firstDayEnd);
  }

  get startsAtDisplay() {
    return formatTimestamp(this.event.startsAt);
  }

  get endsAtDisplay() {
    return formatTimestamp(this.event.endsAt);
  }

  get remainingSpots() {
    const remaining = this.event.cap - this.event.acceptedCount;

    if (remaining < 1) {
      return "No spots remaining";
    }
    return `${remaining} spot${remaining === 1 ? "" : "s"} remaining`;
  }

  get rsvps() {
    return this.event.rsvpPreview.slice(0, PREVIEW_LIMIT);
  }

  get rsvpExtra() {
    const displayedRsvps = Math.min(
      PREVIEW_LIMIT,
      this.event.rsvpPreview.length
    );
    return this.event.acceptedCount - displayedRsvps;
  }
}

export default CHQEvent;

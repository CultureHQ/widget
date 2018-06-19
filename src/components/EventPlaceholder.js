import React from "react";

import {
  EventContainer,
  EventHeader,
  EventLeft,
  EventLeftPlaceholder,
  EventRight,
  EventRightPlaceholder,
  EventFooter
} from "./EventDisplay";

const EventPlaceholder = () => (
  <EventContainer>
    <EventHeader>
      <EventLeft>
        <EventLeftPlaceholder />
      </EventLeft>
      <EventRight>
        <EventRightPlaceholder />
        <EventRightPlaceholder />
        <EventRightPlaceholder />
      </EventRight>
    </EventHeader>
    <EventFooter />
  </EventContainer>
);

export default EventPlaceholder;

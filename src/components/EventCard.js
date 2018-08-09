import React from "react";

import EventImage from "./EventImage";
import EventMetadata from "./EventMetadata";
import Rsvps from "./Rsvps";
import { EventContainer, EventHeader, EventFooter } from "./EventDisplay";
import MoreInfo from "./MoreInfo";

const EventCard = ({ event }) => (
  <EventContainer>
    <EventHeader>
      <EventImage event={event} />
      <EventMetadata event={event} />
    </EventHeader>
    <EventFooter>
      <Rsvps event={event} />
      <MoreInfo href={event.href}>More Info</MoreInfo>
    </EventFooter>
  </EventContainer>
);

export default EventCard;

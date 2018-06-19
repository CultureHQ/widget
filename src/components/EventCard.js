import React from "react";
import styled from "styled-components";

import EventImage from "./EventImage";
import EventMetadata from "./EventMetadata";
import Rsvps from "./Rsvps";
import { EventContainer, EventHeader, EventFooter } from "./EventDisplay";

const MoreInfo = styled.a`
  background-color: #79b17d;
  border-radius: 5px;
  color: white;
  flex-grow: 1;
  float: right;
  padding: 10px 27px;
  text-align: center;
  text-decoration: none;
`;

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

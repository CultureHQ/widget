import React from "react";
import styled from "styled-components";

import LiveBanner from "./LiveBanner";
import SponsoredRibbon from "./SponsoredRibbon";
import { EventLeft, EventLeftLink } from "./EventDisplay";

const EventName = styled.span`
  background-color: rgba(0, 0, 0, 0.75);
  bottom: 15px;
  color: white;
  font-weight: 200;
  left: 0;
  padding: 10px 0;
  position: absolute;
  text-align: center;
  width: 100%;
`;

const EventImage = ({ event }) => (
  <EventLeft>
    <EventLeftLink imageUrl={event.imageUrl} href={event.href}>
      {event.sponsored && <SponsoredRibbon />}
      {event.isLive && <LiveBanner />}
      <EventName>{event.name}</EventName>
    </EventLeftLink>
  </EventLeft>
);

export default EventImage;

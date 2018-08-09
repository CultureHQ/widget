import React from "react";
import styled from "styled-components";

import { EventRight } from "./EventDisplay";
import UserName from "./UserName";

const EventCancelledContainer = EventRight.extend`
  opacity: 0.55;
`;

const EventValues = styled.dl`
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 15px;
  width: 100%;
`;

const EventLabel = styled.dt`
  flex-basis: 25%;
`;

const EventValue = styled.dd`
  flex-basis: 75%;
  font-weight: 200;
  margin: 0 0 20px 0;
`;

const EventTimestamps = ({ startsAt, endsAt }) => [
  <EventLabel key="start-key">Starts:</EventLabel>,
  <EventValue key="start-val">{startsAt}</EventValue>,
  <EventLabel key="end-key">Ends:</EventLabel>,
  <EventValue key="end-val">{endsAt}</EventValue>
];

const EventCancelled = () => [
  <EventLabel key="stat-key">Status:</EventLabel>,
  <EventValue key="stat-val">Cancelled</EventValue>
];

const EventCap = ({ remainingSpots }) => [
  <EventLabel key="spots-key">Spots:</EventLabel>,
  <EventValue key="spots-val">{remainingSpots}</EventValue>
];

const EventLocation = ({ location }) => [
  <EventLabel key="where-key">Where:</EventLabel>,
  <EventValue key="where-val">{location}</EventValue>
];

const EventMetadata = ({ event }) => {
  const Container = event.cancelledAt ? EventCancelledContainer : EventRight;

  return (
    <Container>
      <EventValues>
        {event.cancelledAt ? (
          <EventCancelled />
        ) : (
          <EventTimestamps
            startsAt={event.startsAtDisplay}
            endsAt={event.endsAtDisplay}
          />
        )}

        {event.location && <EventLocation location={event.location} />}

        <EventLabel>Host:</EventLabel>
        <EventValue>
          <UserName user={event.host} />
        </EventValue>

        {event.cap && <EventCap remainingSpots={event.remainingSpots} />}
      </EventValues>
    </Container>
  );
};

export default EventMetadata;

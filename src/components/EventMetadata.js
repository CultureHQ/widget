import React from "react";
import styled from "styled-components";

import { EventRight } from "./EventDisplay";
import UserName from "./UserName";

const EventCancelledContainer = EventRight.extend`
  opacity: 0.55;
`;

const EventValues = styled.dl`
  margin: 0;
  padding: 15px;
`;

const EventLabel = styled.dt`
  float: left;
  width: 70px;
`;

const EventValue = styled.dd`
  font-weight: 200;
  margin-bottom: 20px;
`;

const EventTimestamps = ({ startsAt, endsAt }) => (
  <section>
    <EventLabel>Starts:</EventLabel>
    <EventValue>{startsAt}</EventValue>
    <EventLabel>Ends:</EventLabel>
    <EventValue>{endsAt}</EventValue>
  </section>
);

const EventCancelled = () => (
  <section>
    <EventLabel>Status:</EventLabel>
    <EventValue>Cancelled</EventValue>
  </section>
);

const EventCap = ({ remainingSpots }) => (
  <section>
    <EventLabel>Spots:</EventLabel>
    <EventValue>{remainingSpots}</EventValue>
  </section>
);

const EventLocation = ({ location }) => (
  <section>
    <EventLabel>Where:</EventLabel>
    <EventValue>{location}</EventValue>
  </section>
);

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

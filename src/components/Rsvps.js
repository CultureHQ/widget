import React from "react";
import styled from "styled-components";

import UserLink from "./UserLink";

const RsvpPreview = styled.span`
  color: #888;
  line-height: 38px;
`;

const RsvpPrefix = styled.span`
  display: inline-block;
  margin-right: 20px;
`;

const RsvpExtra = styled.span`
  margin-left: 5px;
`;

const Rsvps = ({ event }) => {
  if (event.rsvps.length < 1) {
    return null;
  }

  return (
    <RsvpPreview>
      <RsvpPrefix>Who&#39;s coming: </RsvpPrefix>
      <>
        {event.rsvps.map(rsvp => (
          <UserLink user={rsvp.user} key={rsvp.id} />
        ))}
      </>
      {event.rsvpExtra > 0 && <RsvpExtra>+{event.rsvpExtra}</RsvpExtra>}
    </RsvpPreview>
  );
};

export default Rsvps;

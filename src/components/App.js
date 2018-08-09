import React, { Component } from "react";
import client from "@culturehq/client";
import styled from "styled-components";

import { LIST_OPTIONS } from "../config";
import CHQEvent from "../lib/chq-event";

import EventCard from "./EventCard";
import EventPlaceholder from "./EventPlaceholder";
import Failure from "./Failure";
import NoEvents from "./NoEvents";

const Container = styled.section`
  overflow: auto;
`;

class App extends Component {
  constructor(props) {
    super(props);

    client.setToken(props.token);

    this.state = { events: null, failure: false };
  }

  componentDidMount() {
    this.componentIsMounted = true;

    client
      .autoPaginate("events")
      .listEvents(LIST_OPTIONS)
      .then(({ events }) => {
        this.mountedSetState({
          events: events.map(event => new CHQEvent(event)),
          failure: false
        });
      })
      .catch(() => {
        this.mountedSetState({ events: null, failure: true });
      });
  }

  componentWillUnmount() {
    this.componentIsMounted = false;
  }

  componentDidCatch() {
    this.mountedSetState({ events: null, failure: true });
  }

  mountedSetState(newState) {
    if (this.componentIsMounted) {
      this.setState(newState);
    }
  }

  render() {
    const { events, failure } = this.state;

    if (failure) {
      return <Failure />;
    }

    if (events === null) {
      return (
        <section>
          <EventPlaceholder />
          <EventPlaceholder />
          <EventPlaceholder />
        </section>
      );
    }

    if (events.length === 0) {
      return <NoEvents />;
    }

    return (
      <Container>
        {events.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </Container>
    );
  }
}

export default App;

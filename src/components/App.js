import React, { Component } from "react";
import CultureHQ from "culturehq-client";

import { API_ROOT, LIST_OPTIONS } from "../config";
import CHQEvent from "../lib/chq-event";

import EventCard from "./EventCard";
import EventPlaceholder from "./EventPlaceholder";
import Failure from "./Failure";
import NoEvents from "./NoEvents";

class App extends Component {
  constructor(props) {
    super(props);

    this.client = new CultureHQ({ apiHost: API_ROOT });
    this.client.setToken(props.token);

    this.state = { events: null, failure: false };
  }

  componentDidMount() {
    this.componentIsMounted = true;

    this.client
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

  componentDidCatch() {
    this.mountedSetState({ events: null, failure: true });
  }

  componentWillUnmount() {
    this.componentIsMounted = false;
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
      <section>
        {events.map(event => <EventCard key={event.id} event={event} />)}
      </section>
    );
  }
}

export default App;

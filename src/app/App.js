import React, { Component } from "react";
import { makePaginatedGet, setToken, configure, skipPreflightChecks } from "@culturehq/client";
import styled from "styled-components";

import { LIST_OPTIONS } from "../config";
import CHQEvent from "../lib/CHQEvent";

import EventCard from "./EventCard";
import EventPlaceholder from "./EventPlaceholder";
import Failure from "./Failure";
import NoEvents from "./NoEvents";
import CHQStory from "../lib/CHQStory";
import StoriesSlider from "./StoriesSlider";

const Container = styled.section`
  overflow: visible;
`;

const queryToOptions = queryString => {
  const { i, d, l, s, co, cy, m, r, v } = queryString;

  return {
    interestIds: i || null,
    departmentIds: d || null,
    locationIds: l || null,
    skillIds: s || null,
    courseIds: co || null,
    classYearIds: cy || null,
    majorIds: m || null,
    residentIds: r || null,
    organizationValueIds: v || null
  };
};

switch (process.env.NODE_ENV) { // eslint-disable-line default-case
  case "development":
    configure({
      apiHost: "http://localhost:3000",
      awsAccessKeyId: "access-key-id",
      signerURL: "http://localhost:3001",
      uploadBucket: "http://localhost:3001"
    });

    break;
  case "test":
    configure({
      apiHost: "http://localhost:8080",
      awsAccessKeyId: "access-key-id",
      signerURL: "http://localhost:8081",
      uploadBucket: "http://localhost:8082"
    });

    break;
  case "production":
    skipPreflightChecks();
    break;
}

class App extends Component {
  constructor(props) {
    super(props);

    setToken(props.token);

    this.state = {
      events: null,
      failure: false,
      getStories: props.stories,
      stories: null
    };
  }

  componentDidMount() {
    this.componentIsMounted = true;
    const { getStories } = this.state;
    const { filters } = this.props;

    if (getStories) {
      return makePaginatedGet("stories", "/landing_pages/stories", queryToOptions(filters))
        .then(({ stories }) => {
          this.mountedSetState({
            stories: stories.map(story => new CHQStory(story)),
            failure: false
          });
        })
        .catch(() => {
          this.mountedSetState({ stories: null, failure: true });
        });
    }

    return makePaginatedGet("events", "/events", LIST_OPTIONS)
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
    this.mountedSetState({ stories: null, failure: true });
  }

  mountedSetState(newState) {
    if (this.componentIsMounted) {
      this.setState(newState);
    }
  }

  render() {
    const { getStories, events, failure, stories } = this.state;

    if (failure) {
      return <Failure />;
    }

    if (getStories) {
      if (stories === null) {
        return (
          <section>
            <EventPlaceholder />
            <EventPlaceholder />
            <EventPlaceholder />
          </section>
        );
      }

      if (stories.length === 0) {
        return <NoEvents />;
      }

      return (
        <Container>
          <StoriesSlider stories={stories} />
        </Container>
      );
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

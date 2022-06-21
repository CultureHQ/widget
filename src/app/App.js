import React, { Component } from "react";
import { makePaginatedGet, setToken } from "@culturehq/client";
import styled from "styled-components";

import Failure from "./Failure";
import CHQStory from "../lib/CHQStory";
import StoriesModal from "./StoriesModal";

/*
import { configure, skipPreflightChecks } from "@culturehq/client";

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
*/

const Container = styled.section`
  overflow: visible;
  letter-spacing: normal;
  line-height: normal;

  -ms-overflow-style: none; // IE 10+
  overflow: -moz-scrollbars-none; // Firefox

  &::-webkit-scrollbar {
    display: none; // Safari and Chrome
  }
`;

const queryToOptions = (queryString) => {
  const { i, d, l, s, co, cy, m, r, v, sp, u, org } = queryString;

  return {
    interestIds: i || null,
    departmentIds: d || null,
    locationIds: l || null,
    skillIds: s || null,
    courseIds: co || null,
    classYearIds: cy || null,
    majorIds: m || null,
    residentIds: r || null,
    organizationValueIds: v || null,
    storyPromptIds: sp || null,
    userIds: u || null,
    orgId: org || null,
  };
};

class App extends Component {
  constructor(props) {
    super(props);

    setToken(props.token);

    this.state = {
      failure: false,
      stories: null,
    };
  }

  componentDidMount() {
    this.componentIsMounted = true;
    const { filters } = this.props;

    return makePaginatedGet(
      "stories",
      "/landing_pages/stories",
      queryToOptions(filters)
    ).then(({ stories }) => {
      this.mountedSetState({
        stories: stories.map((story) => new CHQStory(story)),
        failure: false,
      });
    })
    .catch(() => {
      this.mountedSetState({ stories: null, failure: true });
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
    const { failure, stories } = this.state;
    const { filters, triggerHref } = this.props;

    if (failure) {
      return <Failure />;
    }

    if (stories === null || stories.length === 0) {
      return <></>;
    }

    return (
      <Container>
        <StoriesModal stories={stories} organizationId={filters.org} triggerHref={triggerHref} />
      </Container>
    );
  }
}

export default App;

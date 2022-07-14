import React, { Component } from "react";
import { makePaginatedGet, setToken } from "@culturehq/client";
import styled from "styled-components";
import NoTrends from "./NoTrends";

import Failure from "./Failure";
import StoryTrendSlider from "./StoryTrendSlider";
import EmptySlider from "./EmptySlider";

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
      "trends",
      "/landing_pages/story_trends",
      queryToOptions(filters)
    ).then(({ storyTrends }) => {
      this.mountedSetState({
        storyTrends,
        failure: false,
      });
    })
    .catch(() => {
      this.mountedSetState({ storyTrends: null, failure: true });
    });
  }

  componentWillUnmount() {
    this.componentIsMounted = false;
  }

  componentDidCatch() {
    this.mountedSetState({ storyTrends: null, failure: true });
  }

  mountedSetState(newState) {
    if (this.componentIsMounted) {
      this.setState(newState);
    }
  }

  render() {
    const { failure, storyTrends } = this.state;
    const { filters } = this.props;

    if (failure) {
      return <Failure />;
    }

    if (!storyTrends) {
      return (
        <EmptySlider />
      );
    }

    if (storyTrends.length === 0) {
      return <NoTrends />;
    }

    return (
      <Container>
        <StoryTrendSlider storyTrends={storyTrends} organizationId={filters.org} />
      </Container>
    );
  }
}

export default App;

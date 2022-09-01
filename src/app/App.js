import React, { Component } from "react";
import { makePaginatedGet, setToken } from "@culturehq/client";
import styled from "styled-components";
import GlobalFonts from "../fonts/fonts";
import NoStories from "./NoStories";

import Failure from "./Failure";
import CHQStory from "../lib/CHQStory";
import StoriesSlider from "./StoriesSlider";
import EmptySlider from "./EmptySlider";

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

const queryToOptions = queryString => {
  const { i, d, l, s, co, cy, m, r, v, sp, t, u, org } = queryString;

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
    trendIds: t || null,
    userIds: u || null,
    orgId: org || null
  };
};

class App extends Component {
  constructor(props) {
    super(props);

    setToken(props.token);

    this.state = {
      failure: false,
      organization: null,
      stories: null
    };
  }

  componentDidMount() {
    this.componentIsMounted = true;
    const { filters } = this.props;

    return makePaginatedGet(
      "stories",
      "/landing_pages/stories",
      queryToOptions(filters)
    ).then(({ organization, stories }) => {
      this.mountedSetState({
        organization,
        stories: stories.map(story => new CHQStory(story)),
        failure: false
      });
    }).catch(() => {
      this.mountedSetState({ organization: null, stories: null, failure: true });
    });
  }

  componentWillUnmount() {
    this.componentIsMounted = false;
  }

  componentDidCatch() {
    this.mountedSetState({ organization: null, stories: null, failure: true });
  }

  mountedSetState(newState) {
    if (this.componentIsMounted) {
      this.setState(newState);
    }
  }

  render() {
    const { failure, organization, stories } = this.state;
    const { filters } = this.props;

    if (failure) {
      return <Failure />;
    }

    if (stories === null) {
      return (
        <EmptySlider
          orgName={
            organization?.name
              ?.replace(/\s+/g, "-")
              ?.replaceAll("'", "")
              ?.replaceAll("-+-", "and")
              ?.replaceAll("Activision-Blizzard", "activisionblizzard")
              ?.toLowerCase()
          }
        />
      );
    }

    if (stories.length === 0) {
      return <NoStories />;
    }

    return (
      <Container>
        <GlobalFonts />
        <StoriesSlider
          orgName={
            organization.name
              .replace(/\s+/g, "-")
              .replaceAll("'", "")
              .replaceAll("-+-", "and")
              .replaceAll("Activision-Blizzard", "activisionblizzard")
              .toLowerCase()
          }
          stories={stories}
          organizationId={filters.org}
        />
      </Container>
    );
  }
}

export default App;

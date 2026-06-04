import React, { Component } from "react";
import { makeGet, setToken } from "@culturehq/client";
import styled from "styled-components";

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
  const { i, d, l, s, co, cy, p, de, v, sp, t, u, lang, org } = queryString;

  return {
    interestIds: i || null,
    departmentIds: d || null,
    locationIds: l || null,
    skillIds: s || null,
    companyIds: co || null,
    classYearIds: cy || null,
    programIds: p || null,
    degreeIds: de || null,
    organizationValueIds: v || null,
    storyPromptIds: sp || null,
    trendIds: t || null,
    userIds: u || null,
    language: lang || null,
    orgId: org || null
  };
};

class App extends Component {
  constructor(props) {
    super(props);

    setToken(props.token);

    this.state = {
      failure: false,
      stories: null,
      pagination: undefined
    };
  }

  componentDidMount() {
    this.componentIsMounted = true;
    const { filters } = this.props;

    return makeGet(
      "/landing_pages/stories",
      { ...queryToOptions(filters), pageSize: 10 }
    ).then(({ stories, organization, pagination }) => {
      this.mountedSetState({
        stories: stories.map(story => new CHQStory(story)),
        failure: false,
        organizationName: organization,
        pagination
      });
      if (organization === "Target") {
        this.loadTargetFonts();
      }

      if (organization === "RTX") this.loadRtxFonts();


    }).catch(() => {
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

  loadTargetFonts() {
    // Create a <style> tag dynamically
    const styleTag = document.createElement("style");
    styleTag.innerHTML = `
    @font-face {
      font-family: "HelveticaForTarget";
      src: url("https://assets.culturehq.com/fonts/target/HelveticaforTarget.otf") format("opentype");
      font-weight: 400;
      font-style: normal;
    }

    @font-face {
      font-family: "HelveticaForTarget";
      src: url("https://assets.culturehq.com/fonts/target/HelveticaforTarget-Bold.otf") format("opentype");
      font-weight: 700;
      font-style: normal;
    }

    @font-face {
      font-family: "HelveticaForTarget";
      src: url("https://assets.culturehq.com/fonts/target/HelveticaforTarget-BoldItalic.otf") format("opentype");
      font-weight: 700;
      font-style: italic;
    }

    @font-face {
      font-family: "HelveticaForTarget";
      src: url("https://assets.culturehq.com/fonts/target/HelveticaforTarget-Heavy.otf") format("opentype");
      font-weight: 800;
      font-style: normal;
    }

    @font-face {
      font-family: "HelveticaForTarget";
      src: url("https://assets.culturehq.com/fonts/target/HelveticaforTarget-HeavyItalic.otf") format("opentype");
      font-weight: 800;
      font-style: italic;
    }

    @font-face {
      font-family: "HelveticaForTarget";
      src: url("https://assets.culturehq.com/fonts/target/HelveticaforTarget-Italic.otf") format("opentype");
      font-weight: 400;
      font-style: italic;
    }

    @font-face {
      font-family: "HelveticaForTarget";
      src: url("https://assets.culturehq.com/fonts/target/HelveticaforTarget-Light.otf") format("opentype");
      font-weight: 300;
      font-style: normal;
    }

    @font-face {
      font-family: "HelveticaForTarget";
      src: url("https://assets.culturehq.com/fonts/target/HelveticaforTarget-LightItalic.otf") format("opentype");
      font-weight: 300;
      font-style: italic;
    }

    @font-face {
      font-family: "HelveticaForTarget";
      src: url("https://assets.culturehq.com/fonts/target/HelveticaforTarget-Medium.otf") format("opentype");
      font-weight: 500;
      font-style: normal;
    }

    @font-face {
      font-family: "HelveticaForTarget";
      src: url("https://assets.culturehq.com/fonts/target/HelveticaforTarget-MediumItalic.otf") format("opentype");
      font-weight: 500;
      font-style: italic;
    }

    @font-face {
      font-family: "HelveticaForTarget";
      src: url("https://assets.culturehq.com/fonts/target/HelveticaforTarget-RmPl.otf") format("opentype");
      font-weight: 600;
      font-style: normal;
    }

    @font-face {
      font-family: "HelveticaForTarget";
      src: url("https://assets.culturehq.com/fonts/target/HelveticaforTarget-RmPlIt.otf") format("opentype");
      font-weight: 600;
      font-style: italic;
    }

    @font-face {
      font-family: "HelveticaForTarget";
      src: url("https://assets.culturehq.com/fonts/target/HelveticaforTarget-Thin.otf") format("opentype");
      font-weight: 200;
      font-style: normal;
    }

    @font-face {
      font-family: "HelveticaForTarget";
      src: url("https://assets.culturehq.com/fonts/target/HelveticaforTarget-ThinItalic.otf") format("opentype");
      font-weight: 200;
      font-style: italic;
    }
    `;

    // Append the <style> tag to the <head>
    document.head.appendChild(styleTag);
  }

  loadRtxFonts() {
    // Create a <style> tag dynamically
    const styleTag = document.createElement("style");
    styleTag.innerHTML = `
    @font-face {
      font-family: "Objektiv Mk2";
      src: url("https://culturehq-assets.s3.us-west-2.amazonaws.com/fonts/rtx/objektiv-mk2-light.otf") format("opentype");
      font-weight: 300;
      font-style: normal;
    }

    @font-face {
      font-family: "Objektiv Mk2";
      src: url("https://culturehq-assets.s3.us-west-2.amazonaws.com/fonts/rtx/objektiv-mk2.otf") format("opentype");
      font-weight: 400;
      font-style: normal;
    }

    @font-face {
      font-family: "Objektiv Mk2";
      src: url("https://culturehq-assets.s3.us-west-2.amazonaws.com/fonts/rtx/objektiv-mk2-medium.otf") format("opentype");
      font-weight: 500;
      font-style: normal;
    }

    @font-face {
      font-family: "Objektiv Mk2";
      src: url("https://culturehq-assets.s3.us-west-2.amazonaws.com/fonts/rtx/objektiv-mk2-bold.otf") format("opentype");
      font-weight: 700;
      font-style: normal;
    }
    `;

    // Append the <style> tag to the <head>
    document.head.appendChild(styleTag);
  }

  render() {
    const { organizationName, failure, pagination, stories } = this.state;
    const { filters } = this.props;

    if (failure) {
      return <Failure />;
    }

    if (stories === null) {
      return (
        <EmptySlider />
      );
    }

    if (stories.length === 0) {
      return <></>;
    }

    return (
      <Container>
        <StoriesSlider
          stories={stories}
          organizationId={filters.org}
          organizationName={organizationName}
          pagination={pagination}
          filters={queryToOptions(filters)}
        />
      </Container>
    );
  }
}

export default App;

import React, { Fragment } from "react";

import BlockSegmentContent from "./BlockSegmentContent";

import { font } from "../../styles.json";

const PLATFORM_BASE = "https://platform.culturehq.com";
const PLATFORM_NO_PREFIX = "platform.culturehq.com";
const HTTPS_PREFIX = "https://";
const HTTP_PREFIX = "http://";

const BlockSegment = ({ block, offset, length }) => {
  const characters = block.text.slice(offset, offset + length).split("");
  const contents = [];

  let currentStyles = null;

  characters.forEach((character, innerIndex) => {
    const index = innerIndex + offset;
    let styles = [];

    block.inlineStyleRanges.forEach(styleRange => {
      if (index >= styleRange.offset && index < styleRange.offset + styleRange.length) {
        styles = [...styles, styleRange.style].sort();
      }
    });

    if (styles.toString() === currentStyles) {
      contents[contents.length - 1].text += character;
    } else {
      contents.push({ offset, text: character, styles });
      currentStyles = styles.toString();
    }
  });

  return (
    <Fragment key={block.key}>
      {contents.map(({ text, styles }, index) => (
        <BlockSegmentContent
          key={index} // eslint-disable-line react/no-array-index-key
          text={text}
          styles={styles}
        />
      ))}
    </Fragment>
  );
};

const LinkEntity = ({ entity: { data: { url } }, tabIndex, children }) => {
  const internalLink = base => {
    const to = url.replace(base, "");
    // return <Link to={to} className="chq-edi--lk" tabIndex={tabIndex || 0}>{children}</Link>;
    return <a href={to} className="chq-edi--lk" tabIndex={tabIndex || 0} target="_blank" rel="noopener noreferrer">{children}</a>;
  };

  const externalLink = prefix => {
    const to = prefix.concat("", url);
    return <a href={to} className="chq-edi--lk" tabIndex={tabIndex || 0} target="_blank" rel="noopener noreferrer">{children}</a>;
  };

  if (url.startsWith(PLATFORM_BASE)) {
    return internalLink(PLATFORM_BASE);
  }

  if (url.startsWith(PLATFORM_NO_PREFIX)) {
    return internalLink(PLATFORM_NO_PREFIX);
  }

  if (!url.startsWith(HTTPS_PREFIX) && !url.startsWith(HTTP_PREFIX)) {
    return externalLink(HTTPS_PREFIX);
  }

  return <a href={url} className="chq-edi--lk" tabIndex={tabIndex || 0} target="_blank" rel="noopener noreferrer">{children}</a>;
};

const BlockEntity = ({ entity, children, tabIndex }) => {
  switch (entity.type) {
    case "LINK":
      return <LinkEntity entity={entity} tabIndex={tabIndex}>{children}</LinkEntity>;
    case "MENTION":
      return <></>;
    default:
      return <>{children}</>;
  }
};

const AtomicBlock = ({ block, _entityMap }) => {
  if (!block.entityRanges[0]) {
    // A weird case that can occur when the image gets deleted but the block
    // hasn't been deleted.
    return null;
  }

  // const { originalSrc, src, alt } = entityMap[block.entityRanges[0].key].data;

  return <></>;
  /*
  return (
    <ImageLightbox image={{ largeUrl: originalSrc || src }}>
      {onTrigger => (
        <PlainButton onClick={onTrigger} className="chq-edi--img--wrap">
          <img className="chq-edi--img" src={src} alt={alt} />
        </PlainButton>
      )}
    </ImageLightbox>
  );
  */
};

const Block = ({ block, Element, entityMap, tabIndex }) => {
  if (block.type === "atomic") {
    return (
      <Element style={{ fontFamily: font }}>
        <AtomicBlock block={block} entityMap={entityMap} />
      </Element>
    );
  }

  if (block.text === "") {
    return <Element style={{ fontFamily: font }}>&nbsp;</Element>;
  }

  if (block.entityRanges.length === 0) {
    return (
      <Element style={{ fontFamily: font }}>
        <BlockSegment block={block} offset={0} length={block.text.length} />
      </Element>
    );
  }

  let cursor = 0;
  const segments = [];

  block.entityRanges.forEach(({ offset, length, key }) => {
    if (offset > cursor) {
      segments.push({ offset: cursor, length: offset - cursor });
    }
    segments.push({ offset, length, entity: entityMap[key] });
    cursor = offset + length;
  });

  if (cursor !== block.text.length) {
    segments.push({ offset: cursor, length: block.text.length - cursor });
  }

  return (
    <Element style={{ fontFamily: font }}>
      {segments.map(({ offset, length, entity }) => {
        const segment = (
          <BlockSegment key={offset} block={block} offset={offset} length={length} />
        );

        if (entity) {
          return (
            <BlockEntity key={offset} entity={entity} tabIndex={tabIndex}>
              {segment}
            </BlockEntity>
          );
        }
        return segment;
      })}
    </Element>
  );
};

export default Block;

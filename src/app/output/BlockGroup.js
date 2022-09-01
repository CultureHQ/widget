import React, { Fragment } from "react";

import Block from "./Block";

const BLOCK_TYPES = {
  atomic: { element: "section", wrapper: null },
  unstyled: { element: "section", wrapper: null },
  html_text: { element: "section", wrapper: null },
  section: { element: "section", wrapper: null },
  "unordered-list-item": { element: "li", wrapper: "ul" },
  "ordered-list-item": { element: "li", wrapper: "ol" }
};

const BlockGroupWrapper = ({ blockGroup, children, Wrapper }) => {
  if (!Wrapper) {
    return <>{children}</>;
  }

  const classList = `chq-edi--lt chq-edi--lt-${blockGroup.blocks[0].depth}`;
  return <Wrapper className={classList}>{children}</Wrapper>;
};

const BlockGroup = ({ blockGroup, entityMap, orgName, tabIndex }) => {
  if (!Object.prototype.hasOwnProperty.call(BLOCK_TYPES, blockGroup.type)) {
    // In certain circumstances with pasted code we can get some really
    // confusing stuff here, so just ignoring it for now.
    return null;
  }

  const { element: Element, wrapper: Wrapper } = BLOCK_TYPES[blockGroup.type];

  return (
    <BlockGroupWrapper blockGroup={blockGroup} Wrapper={Wrapper}>
      {blockGroup.blocks.map(block => (
        <Fragment key={block.key}>
          <Block
            block={block}
            Element={Element}
            entityMap={entityMap}
            orgName={orgName}
            tabIndex={tabIndex}
          />
          {block.childGroups && block.childGroups.map(childBlockGroup => (
            <BlockGroup
              key={childBlockGroup.key}
              blockGroup={childBlockGroup}
              entityMap={entityMap}
              orgName={orgName}
            />
          ))}
        </Fragment>
      ))}
    </BlockGroupWrapper>
  );
};

export default BlockGroup;

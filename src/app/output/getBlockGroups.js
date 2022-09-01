const getBlockGroups = blocks => {
  let currentType = null;

  const currentDepth = blocks[0] ? blocks[0].depth : 0;
  const groups = [];

  for (let idx = 0; idx < blocks.length; idx += 1) {
    const block = blocks[idx];
    const prevGroup = groups[groups.length - 1];

    // This is just for display purposes, strip out the very last block if it's
    // blank. This is likely there because it was inserted after an image.
    if (idx === blocks.length - 1 && block.type === "unstyled" && block.text === "") {
      break;
    }

    if (block.depth > currentDepth) {
      let lastIndex = blocks.findIndex(
        ({ depth }, index) => index > idx && depth === currentDepth
      );
      lastIndex = lastIndex === -1 ? blocks.length : lastIndex;

      prevGroup.blocks[prevGroup.blocks.length - 1].childGroups = getBlockGroups(
        blocks.slice(idx, lastIndex)
      );

      idx = lastIndex - 1;
    } else if (block.type === currentType) {
      prevGroup.key += block.key;
      prevGroup.blocks.push(block);
    } else {
      groups.push({
        type: block.type,
        key: block.key,
        blocks: [block]
      });

      currentType = block.type;
    }
  }

  return groups;
};

export default getBlockGroups;

import React, { Suspense, lazy } from "react";

const EditorOutput = lazy(() => import("./EditorOutput"));

const LazyEditorOutput = props => (
  <Suspense fallback={<div />}>
    <EditorOutput {...props} />
  </Suspense>
);

export default LazyEditorOutput;

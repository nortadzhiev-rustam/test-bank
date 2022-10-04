import { NodeViewWrapper } from "@tiptap/react";
import katex from "katex";


export default (props) => {
  const content = props.node.attrs.content;

  const options = {
    throwOnError: false,
    strict: false,
    displayMode: true
  };

  const preview = katex.renderToString(content, options);

  return (
    <NodeViewWrapper className="math-block-preview">
      <div dangerouslySetInnerHTML={{ __html: preview }} />
    </NodeViewWrapper>
  );
};
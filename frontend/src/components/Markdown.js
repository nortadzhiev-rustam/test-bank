import React from "react";
import ReactMarkdown from "react-markdown";
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";
import remarkMath from "remark-math";

import rehypeKatex from "rehype-katex";

const Markdown = (props) => (
  <ReactMarkdown
    children={`${props.source}`}
    rehypePlugins={[rehypeKatex]}
    remarkPlugins={[remarkMath]}
  />
);

export default Markdown;

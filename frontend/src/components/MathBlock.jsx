import { NodeViewWrapper } from "@tiptap/react";
import React from 'react';
import { BlockMath } from "react-katex";
import { IconButton } from '@mui/material';
export default (props) => {
  const content = props.node.attrs.content;
const [isHover, setHover] = React.useState(false)
  return (
    <NodeViewWrapper onMouseEnter={()=>setHover(true) } className='math-block-preview'>
      <BlockMath math={content} />
    </NodeViewWrapper>
  );
};

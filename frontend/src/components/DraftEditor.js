import React, { useState, useEffect, useRef } from "react";
import { ContentState, EditorState, Modifier } from "draft-js";
import Editor from "draft-js-plugins-editor";
import { convertFromHTML } from "draft-convert";
import katex from "katex";
import createKatexPlugin from "draft-js-katex-plugin";
import { BlockMath } from "react-katex";
import { Close } from "@mui/icons-material";
import "./DraftEditor.css";
import "katex/dist/katex.min.css";
import { Badge } from "@mui/material";

export default function MyEditor({ setOpen, latex }) {
  const [isMathHover, setIsMathHover] = useState(false);
  const contentState = ContentState.createFromText("");
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(contentState)
  );
  const kaTeXPlugin = createKatexPlugin({ katex });
  const { InsertButton } = kaTeXPlugin;
  const plugins = [kaTeXPlugin];
  const editor = useRef(null);

  const handleClickMath = () => {
    setOpen(true);
  };

  function focusEditor() {
    editor.current.focus();
  }

  useEffect(() => {
    setEditorState(latex, contentState);
  }, [latex]);

  useEffect(() => {
    focusEditor();
  }, []);

  const handleEditorState = (editorState) => {
    setEditorState(editorState);
  };

  return (
    <div onClick={focusEditor}>
      <div
        className='DraftEditor-root'
        data-placeholder='Please write your question here'
        contentEditable
        ref={editor}
      >
        {latex === "" ? null : isMathHover ? (
          <Badge
            component='span'
            sx={{ cursor: "pointer" }}
            onMouseEnter={() => setIsMathHover(true)}
            onMouseLeave={() => setIsMathHover(false)}
            badgeContent='X'
            color='error'
            contentEditable={false}
          >
            <span
              contentEditable={false}
              onClick={handleClickMath}
              className={isMathHover ? "math" : null}
            >
              <BlockMath math={latex} />
            </span>
          </Badge>
        ) : (
          <span
            contentEditable={false}
            onClick={handleClickMath}
            className={isMathHover ? "math" : null}
            onMouseEnter={() => setIsMathHover(true)}
            onMouseLeave={() => setIsMathHover(false)}
          >
            <BlockMath math={latex} />
          </span>
        )}
      </div>
    </div>
  );
}

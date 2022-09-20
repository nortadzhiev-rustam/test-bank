import React, { useState } from "react";
import { Editor, EditorState, Modifier } from "draft-js";
import { convertFromHTML } from 'draft-convert';
import katex from "katex";
import createKatexPlugin from "draft-js-katex-plugin";

import "./DraftEditor.css";

const contentState = convertFromHTML({
    htmlToStyle: (nodeName, node, currentStyle) => {
      if (nodeName === "span" && node.style.color === "blue") {
        return currentStyle.add("BLUE");
      } else {
        return currentStyle;
      }
    },
    htmlToEntity: (nodeName, node, createEntity) => {
      // console.log("htmlToEntity");
      // console.log(nodeName);
      // console.log(node);
      // console.log("----");
      if (nodeName === "a") {
        return createEntity("LINK", "MUTABLE", { url: node.href });
      }
    },
    textToEntity: (text, createEntity) => {
      // console.log("textToEntity");
      // console.log(text);
      const result = [];
      text.replace(/\@(\w+)/g, (match, name, offset) => {
        console.log("@");
        const entityKey = createEntity("AT-MENTION", "IMMUTABLE", { name });
        result.push({
          entity: entityKey,
          offset,
          length: match.length,
          result: match
        });
      });
      text.replace(/\$(.*?)\$/g, (match, name, offset) => {
        console.log("Tex regex");
        console.log(text);
        console.log(name);
        console.log(match);
        console.log(offset);
        const entityKey = createEntity("INLINETEX", "IMMUTABLE", {
          teX: name,
          displaystyle: true
        });
        result.push({
          entity: entityKey,
          offset,
          length: match.length,
          result: match
        });
      });
      console.log(result);
      return result;
    },
    htmlToBlock: (nodeName, node) => {
      if (nodeName === "blockquote") {
        return {
          type: "blockquote",
          data: {}
        };
      }
    }
  })(
    `<p>$\\int_a^bf(x)dx$  @huuhung $\\sqrt(2) $ <b>xin</b> chao cac $\\int_a^bf(x)dx$ ban</p><p>Khs Huuwu Hung hien hoa</p><p></p><p></p>`
  );

export default function MyEditor({ latex }) {
  const [editorState, setEditorState] = React.useState(
    EditorState.createWithContent(contentState)
  );
  const kaTeXPlugin = createKatexPlugin({ katex });
  const { InsertButton } = kaTeXPlugin;
  const plugins = [kaTeXPlugin];
  const editor = React.useRef(null);

  function focusEditor() {
    editor.current.focus();
  }

  React.useEffect(() => {
    const selection = editorState.getSelection();
    let contentState = editorState.getCurrentContent();
    contentState = contentState.createEntity("INLINETEX", "IMMUTABLE", {
      teX: latex,
      displaystyle: true,
    });
    const entityKey = contentState.getLastCreatedEntityKey();
    console.log(entityKey);
    contentState = Modifier.insertText(
      contentState,
      selection,
      "\t\t",
      undefined,
      entityKey
    );
    const es = EditorState.push(editorState, contentState, "apply-entity");
    setEditorState(es)
  }, [latex]);

  React.useEffect(() => {
    focusEditor();
  }, []);

  return (
    <div onClick={focusEditor}>
      <InsertButton />
      <Editor
        ref={editor}
        editorState={editorState}
        onChange={(editorState) => setEditorState(editorState)}
        placeholder='Please insert your question here!'
        plugins={plugins}
      />
    </div>
  );
}

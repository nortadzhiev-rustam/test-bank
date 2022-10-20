import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect } from "react";
import Placeholder from '@tiptap/extension-placeholder'
import ReactComponent from "./Extension.js";
import './Tiptap.css'
const Tiptap = ({ equation, placeholder }) => {
  const editor = useEditor({
    extensions: [StarterKit, ReactComponent.configure(), Placeholder.configure({
      placeholder: placeholder
    })],
    content: ``,
  });

  useEffect(() => {
    if (equation !== "") {
      editor
        .chain()
        .focus()
        .insertContent(
          `<react-component content="${equation}"></react-component>`
        )
        .run();
    }
  }, [equation]);

  return (
    <>
      
      <EditorContent editor={editor} />
    </>
  );
};

export default Tiptap;

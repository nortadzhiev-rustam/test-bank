import Placeholder from "@tiptap/extension-placeholder";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useState, useRef, useEffect } from "react";
import "./Tiptap.css";
const Tiptap = () => {
  const editorRef = useRef(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Please insert your question here...",
      }),
    ],
    autofocus: true
  });
  useEffect(() => {
    editorRef.current.focus();
  }, []);
  return (
    <div ref={editorRef}>
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;

import Placeholder from "@tiptap/extension-placeholder";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useState, useRef, useEffect } from "react";
import MathExtension from "./MathExtension";
import InlineMath from "./InlineMath";
import "./Tiptap.css";

const Tiptap = ({ equation }) => {
  const editorRef = useRef(null);
  const [content, setContent] = useState("");
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Please insert your question here...",
      }),
      MathExtension.configure(),
      InlineMath.configure(),
    ],
    content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setContent(html);
    },
  });
  useEffect(() => {
    editorRef.current.focus();
  }, []);

  useEffect(() => {
    if (equation !== "") {
      setContent((prevState) => prevState + `<math-block content=${equation}></math-block>`);
    }
  }, [equation]);

  return (
    <div ref={editorRef}>
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;

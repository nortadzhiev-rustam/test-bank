import Placeholder from "@tiptap/extension-placeholder";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useState, useRef, useEffect } from "react";
import MathExtension from "./MathExtension";
import InlineMath from "./InlineMath";
import "./Tiptap.css";


const Tiptap = ({ equation }) => {
  const [content, setContent] = useState(`<math-block content="\\sqrt{a^2+b^2}"></math-block`);
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

  return <EditorContent editor={editor} />;
};

export default Tiptap;

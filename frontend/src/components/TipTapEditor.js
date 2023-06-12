import "./tiptap.scss";

import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import InlineMath from "./InlineMath";
import Underline from "@tiptap/extension-underline";
import React, { useEffect } from "react";
import { Button, Divider } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRotateLeft,
  faArrowRotateRight,
  faBold,
  faCode,
  faItalic,
  faListOl,
  faListUl,
  faParagraph,
  faQuoteRight,
  faRulerHorizontal,
  faSquareRootVariable,
  faStrikethrough,
  faUnderline,
} from "@fortawesome/free-solid-svg-icons";

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <>
      <Button
        variant='outlined'
        size='medium'
        sx={{ minWidth: 15, maxWidth: 20, mr: 0.1 }}
        color='inherit'
        type='Button'
        onClick={() => editor?.chain().focus().addInlineMath().run()}
      >
        <FontAwesomeIcon icon={faSquareRootVariable} />
      </Button>
      <Button
        variant='outlined'
        size='medium'
        sx={{ minWidth: 15, maxWidth: 20, mr: 0.1 }}
        color='inherit'
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        <FontAwesomeIcon icon={faBold} />
      </Button>
      <Button
        color='inherit'
        variant='outlined'
        size='medium'
        sx={{ minWidth: 15, maxWidth: 20, mr: 0.1 }}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      >
        <FontAwesomeIcon icon={faItalic} />
      </Button>
      <Button
        color='inherit'
        variant='outlined'
        size='medium'
        sx={{ minWidth: 15, maxWidth: 20, mr: 0.1 }}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        className={editor.isActive("underline") ? "is-active" : ""}
      >
        <FontAwesomeIcon icon={faUnderline} />
      </Button>
      <Button
        color='inherit'
        variant='outlined'
        size='medium'
        sx={{ minWidth: 15, maxWidth: 20, mr: 0.1 }}
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "is-active" : ""}
      >
        <FontAwesomeIcon icon={faStrikethrough} />
      </Button>

      <Button
        variant='outlined'
        size='medium'
        sx={{ minWidth: 15, maxWidth: 20, mr: 0.1 }}
        color='inherit'
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive("paragraph") ? "is-active" : ""}
      >
        <FontAwesomeIcon icon={faParagraph} />
      </Button>

      <Button
        color='inherit'
        variant='outlined'
        size='medium'
        sx={{ minWidth: 15, maxWidth: 20, mr: 0.1 }}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "is-active" : ""}
      >
        <FontAwesomeIcon icon={faListUl} />
      </Button>
      <Button
        variant='outlined'
        size='medium'
        sx={{ minWidth: 15, maxWidth: 20, mr: 0.1 }}
        color='inherit'
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "is-active" : ""}
      >
        <FontAwesomeIcon icon={faListOl} />
      </Button>
      <Button
        variant='outlined'
        size='medium'
        sx={{ minWidth: 15, maxWidth: 20, mr: 0.1 }}
        color='inherit'
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive("codeBlock") ? "is-active" : ""}
      >
        <FontAwesomeIcon icon={faCode} />
      </Button>
      <Button
        variant='outlined'
        size='medium'
        sx={{ minWidth: 15, maxWidth: 20, mr: 0.1 }}
        color='inherit'
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive("blockquote") ? "is-active" : ""}
      >
        <FontAwesomeIcon icon={faQuoteRight} />
      </Button>
      <Button
        variant='outlined'
        size='medium'
        sx={{ minWidth: 15, maxWidth: 20, mr: 0.1 }}
        color='inherit'
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        <FontAwesomeIcon icon={faRulerHorizontal} />
      </Button>

      <Button
        color='inherit'
        variant='outlined'
        size='medium'
        sx={{ minWidth: 15, maxWidth: 20, mr: 0.1 }}
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        <FontAwesomeIcon icon={faArrowRotateLeft} />
      </Button>
      <Button
        color='inherit'
        variant='outlined'
        size='medium'
        sx={{ minWidth: 15, maxWidth: 20, mr: 0.1 }}
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        <FontAwesomeIcon icon={faArrowRotateRight} />
      </Button>
    </>
  );
};

const TipTapEditor = ({ contentText, handleChangeModel, math, setShowNav }) => {
  useEffect(() => {
    setShowNav(false);
  }, [setShowNav]);

  const editor = useEditor({
    content: "",
    extensions: [
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle.configure({ types: [ListItem.name] }),
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
      }),
      InlineMath.configure({ content: math }),
      Underline,
    ],
    onUpdate: (editor) => {
      handleChangeModel(editor.editor.getHTML());
    },
  });

  React.useEffect(() => {
    console.log(contentText);
    if (editor !== null) {
      editor.commands.setContent(contentText);
    }
    //eslint-disable-next-line
  }, [editor, contentText]);

  return (
    <div>
      <MenuBar editor={editor} />
      <Divider sx={{ bgcolor: "#FFF", my: 1 }} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default TipTapEditor;

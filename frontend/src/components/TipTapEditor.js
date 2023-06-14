import "./tiptap.scss";

import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import {
  EditorContent,
  useEditor,
  BubbleMenu,
  FloatingMenu,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import InlineMath from "./InlineMath";
import Underline from "@tiptap/extension-underline";
import React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRotateLeft,
  faArrowRotateRight,
  faBold,
  faItalic,
  faListOl,
  faListUl,
  faQuoteRight,
  faStrikethrough,
  faUnderline,
} from "@fortawesome/free-solid-svg-icons";
import LatexEditor from "./TestLatexFormula";
import Placeholder from "@tiptap/extension-placeholder";

const FloatingMenuContent = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <FloatingMenu editor={editor} tippyOptions={{ duration: 100 }}>
      <Box ml={1} p={1} width='100%'>
        <Button
          variant='outlined'
          size='medium'
          sx={{ minWidth: 15, maxWidth: 20, mr: 0.5, mb: 0.5 }}
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
          sx={{ minWidth: 15, maxWidth: 20, mr: 0.5, mb: 0.5 }}
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
          sx={{ minWidth: 15, maxWidth: 20, mr: 0.5, mb: 0.5 }}
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
          sx={{ minWidth: 15, maxWidth: 20, mr: 0.5, mb: 0.5 }}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "is-active" : ""}
        >
          <FontAwesomeIcon icon={faStrikethrough} />
        </Button>

        <Button
          color='inherit'
          variant='outlined'
          size='medium'
          sx={{ minWidth: 15, maxWidth: 20, mr: 0.5, mb: 0.5 }}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is-active" : ""}
        >
          <FontAwesomeIcon icon={faListUl} />
        </Button>
        <Button
          variant='outlined'
          size='medium'
          sx={{ minWidth: 15, maxWidth: 20, mr: 0.5, mb: 0.5 }}
          color='inherit'
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is-active" : ""}
        >
          <FontAwesomeIcon icon={faListOl} />
        </Button>

        <Button
          variant='outlined'
          size='medium'
          sx={{ minWidth: 15, maxWidth: 20, mr: 0.5, mb: 0.5 }}
          color='inherit'
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "is-active" : ""}
        >
          <FontAwesomeIcon icon={faQuoteRight} />
        </Button>

        <Button
          color='inherit'
          variant='outlined'
          size='medium'
          sx={{ minWidth: 15, maxWidth: 20, mr: 0.5, mb: 0.5 }}
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          <FontAwesomeIcon icon={faArrowRotateLeft} />
        </Button>
        {editor.can().chain().focus().redo().run() && (
          <Button
            color='inherit'
            variant='outlined'
            size='medium'
            sx={{ minWidth: 15, maxWidth: 20, mr: 0.5, mb: 0.5 }}
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
          >
            <FontAwesomeIcon icon={faArrowRotateRight} />
          </Button>
        )}
      </Box>
    </FloatingMenu>
  );
};

const BubbleMenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
      <Box ml={10} p={1} width='90%' bgcolor='#e5e5e5' borderRadius={2}>
        <Button
          variant='outlined'
          size='medium'
          sx={{ minWidth: 15, maxWidth: 20, mr: 0.5, mb: 0.5 }}
          color='primary'
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
        >
          <FontAwesomeIcon icon={faBold} />
        </Button>
        <Button
          color='primary'
          variant='outlined'
          size='medium'
          sx={{ minWidth: 15, maxWidth: 20, mr: 0.5, mb: 0.5 }}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is-active" : ""}
        >
          <FontAwesomeIcon icon={faItalic} />
        </Button>
        <Button
          color='primary'
          variant='outlined'
          size='medium'
          sx={{ minWidth: 15, maxWidth: 20, mr: 0.5, mb: 0.5 }}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={!editor.can().chain().focus().toggleUnderline().run()}
          className={editor.isActive("underline") ? "is-active" : ""}
        >
          <FontAwesomeIcon icon={faUnderline} />
        </Button>
        <Button
          color='primary'
          variant='outlined'
          size='medium'
          sx={{ minWidth: 15, maxWidth: 20, mr: 0.5, mb: 0.5 }}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "is-active" : ""}
        >
          <FontAwesomeIcon icon={faStrikethrough} />
        </Button>

        <Button
          color='primary'
          variant='outlined'
          size='medium'
          sx={{ minWidth: 15, maxWidth: 20, mr: 0.5, mb: 0.5 }}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is-active" : ""}
        >
          <FontAwesomeIcon icon={faListUl} />
        </Button>
        <Button
          variant='outlined'
          size='medium'
          sx={{ minWidth: 15, maxWidth: 20, mr: 0.5, mb: 0.5 }}
          color='primary'
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is-active" : ""}
        >
          <FontAwesomeIcon icon={faListOl} />
        </Button>

        <Button
          variant='outlined'
          size='medium'
          sx={{ minWidth: 15, maxWidth: 20, mr: 0.5, mb: 0.5 }}
          color='primary'
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "is-active" : ""}
        >
          <FontAwesomeIcon icon={faQuoteRight} />
        </Button>

        <Button
          color='primary'
          variant='outlined'
          size='medium'
          sx={{ minWidth: 15, maxWidth: 20, mr: 0.5, mb: 0.5 }}
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          <FontAwesomeIcon icon={faArrowRotateLeft} />
        </Button>
        {editor.can().chain().focus().redo().run() && (
          <Button
            color='primary'
            variant='outlined'
            size='medium'
            sx={{ minWidth: 15, maxWidth: 20, mr: 0.5, mb: 0.5 }}
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
          >
            <FontAwesomeIcon icon={faArrowRotateRight} />
          </Button>
        )}
      </Box>
    </BubbleMenu>
  );
};

const TipTapEditor = ({
  contentText,
  handleChangeModel,
  isOpen,
  setIsOpen,
}) => {
  const [latexCode, setLatexCode] = React.useState("");

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
      Placeholder.configure({
        placeholder: "Start typing here...",
      }),
      InlineMath.configure(),
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

  const insertInlineMath = () => {
    editor?.chain().focus().addInlineMath({ content: latexCode }).run();
    setLatexCode("");
    setIsOpen(false);
  };

  return (
    <div>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogTitle>Math Editor</DialogTitle>
        <DialogContent>
          <LatexEditor setLatexCode={setLatexCode} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsOpen(false)} color={"error"}>
            Cancel
          </Button>
          <Button onClick={insertInlineMath}>Save</Button>
        </DialogActions>
      </Dialog>
      <BubbleMenuBar editor={editor} setIsOpen={setIsOpen} />
      <FloatingMenuContent editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default TipTapEditor;

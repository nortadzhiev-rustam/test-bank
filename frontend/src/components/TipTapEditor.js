import "./tiptap.scss";
import { EditorContent, useEditor } from "@tiptap/react";
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
  Typography,
  Stack,
  IconButton,
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
  faSquareRootVariable,
  faStrikethrough,
  faTimes,
  faUnderline,
} from "@fortawesome/free-solid-svg-icons";
import LatexEditor from "./TestLatexFormula";
import Placeholder from "@tiptap/extension-placeholder";

const BubbleMenuBar = ({ editor, setFocused }) => {
  if (!editor) {
    return null;
  }

  return (
    <Box
      width='100%'
      borderRadius={2}
      display='flex'
      justifyContent='flex-start'
      alignItems='center'
      sx={{ overflowX: "auto" }}
    >
      <Button
        size='medium'
        sx={{ minWidth: 15, maxWidth: 20, mr: 0.5, mb: 0.5 }}
        color='inherit'
        variant={editor.isActive("bold") ? "outlined" : "text"}
        onClick={() => {
          setFocused(true);
          editor.chain().focus().toggleBold().run();
        }}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        <FontAwesomeIcon icon={faBold} />
      </Button>
      <Button
        color='inherit'
        variant={editor.isActive("italic") ? "outlined" : "text"}
        size='medium'
        sx={{ minWidth: 15, maxWidth: 20, mr: 0.5, mb: 0.5 }}
        onClick={() => {
          setFocused(true);
          editor.chain().focus().toggleItalic().run();
        }}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      >
        <FontAwesomeIcon icon={faItalic} />
      </Button>
      <Button
        color='inherit'
        variant={editor.isActive("underline") ? "outlined" : "text"}
        size='medium'
        sx={{ minWidth: 15, maxWidth: 20, mr: 0.5, mb: 0.5 }}
        onClick={() => {
          setFocused(true);
          editor.chain().focus().toggleUnderline().run();
        }}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        className={editor.isActive("underline") ? "is-active" : ""}
      >
        <FontAwesomeIcon icon={faUnderline} />
      </Button>
      <Button
        color='inherit'
        variant={editor.isActive("strike") ? "outlined" : "text"}
        size='medium'
        sx={{ minWidth: 15, maxWidth: 20, mr: 0.5, mb: 0.5 }}
        onClick={() => {
          setFocused(true);
          editor.chain().focus().toggleStrike().run();
        }}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "is-active" : ""}
      >
        <FontAwesomeIcon icon={faStrikethrough} />
      </Button>

      <Button
        color='inherit'
        variant={editor.isActive("bulletList") ? "outlined" : "text"}
        size='medium'
        sx={{ minWidth: 15, maxWidth: 20, mr: 0.5, mb: 0.5 }}
        onClick={() => {
          setFocused(true);
          editor.chain().focus().toggleBulletList().run();
        }}
        className={editor.isActive("bulletList") ? "is-active" : ""}
      >
        <FontAwesomeIcon icon={faListUl} />
      </Button>
      <Button
        size='medium'
        sx={{ minWidth: 15, maxWidth: 20, mr: 0.5, mb: 0.5 }}
        color='inherit'
        variant={editor.isActive("orderedList") ? "outlined" : "text"}
        onClick={() => {
          setFocused(true);
          editor.chain().focus().toggleOrderedList().run();
        }}
        className={editor.isActive("orderedList") ? "is-active" : ""}
      >
        <FontAwesomeIcon icon={faListOl} />
      </Button>

      <Button
        size='medium'
        sx={{ minWidth: 15, maxWidth: 20, mr: 0.5, mb: 0.5 }}
        color='inherit'
        variant={editor.isActive("blockquote") ? "outlined" : "text"}
        onClick={() => {
          setFocused(true);
          editor.chain().focus().toggleBlockquote().run();
        }}
        className={editor.isActive("blockquote") ? "is-active" : ""}
      >
        <FontAwesomeIcon icon={faQuoteRight} />
      </Button>

      <Button
        color='inherit'
        size='medium'
        sx={{ minWidth: 15, maxWidth: 20, mr: 0.5, mb: 0.5 }}
        onClick={() => {
          setFocused(true);
          editor.chain().focus().undo().run();
        }}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        <FontAwesomeIcon icon={faArrowRotateLeft} />
      </Button>
      {editor.can().chain().focus().redo().run() && (
        <Button
          color='inherit'
          size='medium'
          sx={{ minWidth: 15, maxWidth: 20, mr: 0.5, mb: 0.5 }}
          onClick={() => {
            setFocused(true);
            editor.chain().focus().redo().run();
          }}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          <FontAwesomeIcon icon={faArrowRotateRight} />
        </Button>
      )}
    </Box>
  );
};

const TipTapEditor = ({
  contentText,
  handleChangeModel,
  isOpen,
  setIsOpen,
  editing,
}) => {
  const [latexCode, setLatexCode] = React.useState("");
  const [focused, setFocused] = React.useState(false);
  const editor = useEditor({
    content: "",
    extensions: [
      StarterKit,

      Placeholder.configure({
        placeholder: "Start typing here...",
      }),
      InlineMath.configure(),
      Underline,
    ],
    parseOptions: {
      preserveWhitespace: false,
    },
    onUpdate: (editor) => {
      handleChangeModel(editor.editor.getHTML());
    },
  });
  React.useEffect(() => {
    console.log(contentText);

    if (editing) {
      if (editor !== null) {
        setTimeout(() => {
          editor.commands.setContent(contentText);
        });
      }
    }
    //eslint-disable-next-line
  }, [editing, editor, contentText]);
  const insertInlineMath = () => {
    editor?.chain().focus().addInlineMath({ content: latexCode }).run();
    setLatexCode("");
    setIsOpen(false);
  };

  return (
    <div
      style={{ width: "100%" }}
      onMouseEnter={() => setFocused(true)}
      onMouseLeave={() => setFocused(false)}
    >
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogTitle
          display='flex'
          flexDirection='row'
          justifyContent='space-between'
        >
          <Stack direction='row' alignItems='center' spacing={1}>
            <FontAwesomeIcon icon={faSquareRootVariable} color='#398' />
            <Typography>Math Editor</Typography>
          </Stack>
          <IconButton onClick={() => setIsOpen(false)}>
            <FontAwesomeIcon icon={faTimes} size='xs' />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <LatexEditor setLatexCode={setLatexCode} latexCode={latexCode} />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setIsOpen(false);
              setLatexCode("");
            }}
            color={"error"}
          >
            Cancel
          </Button>
          <Button onClick={insertInlineMath}>Save</Button>
        </DialogActions>
      </Dialog>
      {focused && (
        <BubbleMenuBar
          editor={editor}
          setIsOpen={setIsOpen}
          setFocused={setFocused}
        />
      )}
      <EditorContent editor={editor} onFocus={() => setFocused(true)} />
    </div>
  );
};

export default TipTapEditor;

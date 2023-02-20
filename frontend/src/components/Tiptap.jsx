import "./styles.scss";
import { useEditor, EditorContent, FloatingMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBold,
  faCode,
  faItalic,
  faListDots,
  faListNumeric,
  faParagraph,
  faStrikethrough,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@mui/material";

const Tiptap = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: `<p>${content.text}</p>`,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
  });

  return (
    <>
      {editor && (
        <FloatingMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <Button
            variant='outlined'
            color='inherit'
            size='small'
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "is-active" : ""}
          >
            <FontAwesomeIcon icon={faBold} />
          </Button>
          <Button
            variant='outlined'
            color='inherit'
            size='small'
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "is-active" : ""}
          >
            <FontAwesomeIcon icon={faItalic} />
          </Button>
          <Button
            variant='outlined'
            color='inherit'
            size='small'
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            className={editor.isActive("strike") ? "is-active" : ""}
          >
            <FontAwesomeIcon icon={faStrikethrough} />
          </Button>
          <Button
            variant='outlined'
            color='inherit'
            size='small'
            onClick={() => editor.chain().focus().toggleCode().run()}
            disabled={!editor.can().chain().focus().toggleCode().run()}
            className={editor.isActive("code") ? "is-active" : ""}
          >
            {"< >"}
          </Button>
          <Button
            variant='outlined'
            color='inherit'
            size='small'
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={
              editor.isActive("heading", { level: 1 }) ? "is-active" : ""
            }
          >
            H1
          </Button>
          <Button
            variant='outlined'
            color='inherit'
            size='small'
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={
              editor.isActive("heading", { level: 2 }) ? "is-active" : ""
            }
          >
            H2
          </Button>
          <Button
            variant='outlined'
            color='inherit'
            size='small'
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={editor.isActive("paragraph") ? "is-active" : ""}
          >
            <FontAwesomeIcon icon={faParagraph} />
          </Button>
          <Button
            variant='outlined'
            color='inherit'
            size='small'
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "is-active" : ""}
          >
            <FontAwesomeIcon icon={faListDots} />
          </Button>
          <Button
            variant='outlined'
            color='inherit'
            size='small'
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive("orderedList") ? "is-active" : ""}
          >
            <FontAwesomeIcon icon={faListNumeric} />
          </Button>
          <Button
            variant='outlined'
            color='inherit'
            size='small'
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={editor.isActive("codeBlock") ? "is-active" : ""}
          >
            <FontAwesomeIcon icon={faCode} />
          </Button>
        </FloatingMenu>
      )}
      <EditorContent editor={editor} />
    </>
  );
};

export default Tiptap;

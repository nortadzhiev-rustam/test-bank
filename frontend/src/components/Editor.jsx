import React from "react";
import { EditorState, convertToRaw, convertFromRaw, Editor } from "draft-js";
import { Box, styled } from "@mui/material";
import "./Editor.css";

export default function InputEditor({ onChange, placeholder }) {
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

  const editor = React.useRef(null);

  function focusEditor() {
    editor.current.focus();
  }

  React.useEffect(() => {
    focusEditor();
  }, []);

  const EditorContainer = styled(Box)({
    height: "80%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    color: "#fff",
    borderRadius: 10,
    textAlign: "center",
    "&:hover": { border: "2px solid #370617" },
    "&:focus-within": { backgroundColor: "rgba(0,0,0,0.3)" },
  });
  React.useEffect(() => {
    onChange(convertToRaw(editorState.getCurrentContent()));
    //eslint-disable-next-line
  }, [editorState]);

  


  return (
    <EditorContainer onClick={focusEditor}>
      <Editor
        ref={editor}
        editorState={editorState}
        onChange={setEditorState}
        placeholder={placeholder}
       
      />
    </EditorContainer>
  );
}

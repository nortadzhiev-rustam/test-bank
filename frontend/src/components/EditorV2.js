import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-classic-with-mathtype";

function EditorV2(props) {
  const [model, setMoodel] = React.useState("");

  return (
    <div style={{ marginTop: 40 }}>
      <CKEditor
        editor={ClassicEditor}
        config={{
          toolbar: {
            items: [
              "heading",
              "MathType",
              "ChemType",
              "|",
              "bold",
              "italic",
              "link",
              "bulletedList",
              "numberedList",
              "imageUpload",
              "mediaEmbed",
              "insertTable",
              "blockQuote",
              "undo",
              "redo",
            ],
          },
        }}
        data='<p>Hello from CKEditor 5!</p>'
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          console.log("Editor is ready to use!", editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          console.log({ event, editor, data });
        }}
        onBlur={(event, editor) => {
          console.log("Blur.", editor);
        }}
        onFocus={(event, editor) => {
          console.log("Focus.", editor);
        }}
      />
    </div>
  );
}

export default EditorV2;

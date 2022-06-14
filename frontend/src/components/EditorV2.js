import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-classic-with-mathtype";

function EditorV2(props) {
  const [model, setMoodel] = React.useState("");

  return (
    <div style={{ width: "100%", marginInline: 5 }}>
      <CKEditor
      
        editor={ClassicEditor}
        config={{
          toolbar: {
            items: [
              "imageUpload",
              "MathType",
              "ChemType",
              "|", 
              "heading",
              "bold",
              "italic",
              "bulletedList",
              "numberedList",
              "insertTable",
              "undo",
              "redo",
            ],
            
          },
          ckfinder: {
            uploadUrl: "http://localhost:3000/upload",
            // uploadUrl: "http://localhost:5000/api/v1/upload",
            // uploadUrl: "http://localhost:5000/api/v1/upload",
            // uploadUrl: "http://localhost:5000/api/v1/upload",
            // uploadUrl: "http://localhost:5000/api/v1/upload",
            // uploadUrl: "http://localhost:5000/api/v1/upload",
          },
          placeholder: `${props.placeholder}`,
          language: "en-us",
          toolbarStartupExpanded: true,
        }}
        data={model}
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          console.log("Editor is ready to use!", editor);
          editor.editing.view.change((writer) => {
            writer.setStyle(
              "height",
              ` ${props.height}`,
              editor.editing.view.document.getRoot()
            );
          });
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          setMoodel(data);
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

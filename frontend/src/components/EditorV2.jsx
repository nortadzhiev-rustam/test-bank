import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-classic-with-mathtype";


function EditorV2(props) {
  const [model, setMoodel] = React.useState("");

  return (
    <div style={{ width: "100%" }}>
      <CKEditor
        editor={ClassicEditor}
        config={{
          toolbar: {
            items: [
              "ImageUpload",
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
          // extraPlugins: [MathType],
          // image: {
          //   toolbar: ["imageTextAlternative", "|", "imageStyle", 'imageResize'],
          // },
          // ckfinder: {
          //   //ckfinder options
          //   uploadUrl: "http://localhost:5000/api/v1/upload", //define the url of the upload script
          // },
          placeholder: `${props.placeholder || "Digite aqui..."}`,
          language: "en-gb",
         
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

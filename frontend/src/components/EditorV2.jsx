import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  Essentials,
  Paragraph,
  Heading,
  Bold,
  Italic,
  List,
  Table,
  TableToolbar,
  Undo,
} from "ckeditor5";
// Import WIRIS from its built dist (not the default src entry): the dist build
// imports CKEditor from `@ckeditor/*/dist/index.js`, matching the `ckeditor5`
// umbrella above. Mixing with the src entry loads CKEditor twice
// (ckeditor-duplicated-modules).
import MathType from "@wiris/mathtype-ckeditor5/dist/index.js";
import "ckeditor5/ckeditor5.css";
import "@wiris/mathtype-ckeditor5/dist/index.css";

function EditorV2({ placeholder, height, data, onChange }) {
  return (
    <div style={{ width: "100%" }}>
      <CKEditor
        editor={ClassicEditor}
        config={{
          // Open-source (GPL) license key — required by CKEditor 5 v44+.
          licenseKey: "GPL",
          plugins: [
            Essentials,
            Paragraph,
            Heading,
            Bold,
            Italic,
            List,
            Table,
            TableToolbar,
            Undo,
            MathType,
          ],
          toolbar: {
            items: [
              "MathType",
              "ChemType",
              "|",
              "heading",
              "bold",
              "italic",
              "bulletedList",
              "numberedList",
              "insertTable",
              "|",
              "undo",
              "redo",
            ],
          },
          table: {
            contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
          },
          placeholder: placeholder || "Digite aqui...",
          language: "en-gb",
        }}
        data={data || ""}
        onReady={(editor) => {
          if (height) {
            editor.editing.view.change((writer) => {
              writer.setStyle(
                "height",
                height,
                editor.editing.view.document.getRoot()
              );
            });
          }
        }}
        onChange={(event, editor) => {
          onChange?.(editor.getData());
        }}
      />
    </div>
  );
}

export default EditorV2;

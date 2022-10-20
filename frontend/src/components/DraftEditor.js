import React, { useState, useEffect, useRef } from "react";
import { BlockMath } from "react-katex";
import { Cancel } from "@mui/icons-material";
import "./DraftEditor.css";
import "katex/dist/katex.min.css";
import { IconButton } from "@mui/material";

export default function MyEditor({
  latex,
  setLatex,
  setEditing,
  isEditing,
  edited,
  setEquation,
  placeholder,
  className,
  handleOpen,
  editorId,
  setContent,
}) {
  const [isMathHover, setIsMathHover] = useState(false);
 
  const [equationarray, setEquationarray] = useState([]);

  const editor = useRef(null);

  const handleClickMath = (eq) => {
    setEditing(true);
    handleOpen();
    setLatex(eq);
  };

  function focusEditor() {
    editor.current.focus();
  }
  //focuses the editor when mounted
  useEffect(() => {
    focusEditor();
  }, []);
  // watches for changes in latex prop, and updates equation array when latex changes
  useEffect(() => {
    if (
      latex.equation !== "" &&
      latex.equation !== undefined &&
      latex.equation !== null
    ) {
      setEquationarray((prevState) => [...prevState, latex]);
      setEquation("");
    }
  }, [latex]);
  //watches for the editing if the equation is edited updates the equation array
  useEffect(() => {
    if (isEditing) {
      const newArr = equationarray
        .filter((item) => item.id !== edited.id)
        .map((item) => item);

      setEquationarray(newArr);
      setEditing(false);
    }
  }, [isEditing]);

  const handleDeleteMath = (id) => {
    const newArray = equationarray.filter((eq) => eq.id !== id);
    setEquationarray(newArray);
  };

  const handleInput = () => {
    const editor = document.querySelector(`#${editorId}`);
    setContent(editor.innerHTML);
  };

  return (
    <div
      style={{ width: "100%" }}
      className={className || ""}
      onClick={focusEditor}
    >
      <div
        className='DraftEditor-root'
        id={editorId}
        data-placeholder={placeholder}
        contentEditable
        ref={editor}
        onInput={handleInput}
        suppressContentEditableWarning={true}
      >
        {equationarray.length !== 0 && (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {equationarray.map((equation) => (
              <span
                key={equation.id}
                style={{
                  position: "relative",
                  display: "flex",
                  marginInline: 5,
                  marginBlock: 5,
                }}
                contentEditable={false}
                onMouseEnter={() => setIsMathHover(true)}
                onMouseLeave={() => setIsMathHover(false)}
              >
                {isMathHover && (
                  <IconButton
                    sx={{
                      position: "absolute",
                      top: "-20px",
                      right: "-20px",
                      color: "rgb(255, 255, 255)",
                    }}
                    onClick={() => handleDeleteMath(equation.id)}
                  >
                    <Cancel fontSize='medium' color='default' />
                  </IconButton>
                )}
                <span
                  className={isMathHover ? "math" : null}
                  onClick={() => handleClickMath(equation)}
                >
                  <BlockMath math={equation.equation} />
                </span>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

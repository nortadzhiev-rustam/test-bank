import React, { useState, useEffect, useRef } from "react";

import { BlockMath } from "react-katex";
import { Cancel } from "@mui/icons-material";
import "./DraftEditor.css";
import "katex/dist/katex.min.css";
import { IconButton } from "@mui/material";

export default function MyEditor({
  setOpen,
  latex,
  setLatex,
  setEditing,
  isEditing,
  edited,
  setEquation,
  placeholder,
  className,
  handleOpen,
  isFlip,
  setFlip,
}) {
  const [isMathHover, setIsMathHover] = useState(false);

  const [equationarray, setEquationarray] = useState([]);

  const editor = useRef(null);

  const handleClickMath = (eq) => {
    setEditing(true);
    if (setFlip) {
      setFlip();
    }
    if (handleOpen) {
      handleOpen();
    } else {
      setOpen(true);
    }
    setLatex(eq);
  };

  function focusEditor() {
    editor.current.focus();
  }

  useEffect(() => {
    focusEditor();
  }, []);

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
    const editor = document.querySelector("#editor");
    console.log(editor.innerHTML);
  };

  return (
    <div
      style={{ width: "100%" }}
      className={className || ""}
      onClick={focusEditor}
    >
      <div
        className='DraftEditor-root'
        id='editor'
        data-placeholder={placeholder}
        contentEditable
        ref={editor}
        onInput={handleInput}
      >
        {equationarray.length === 0 ? null : isMathHover ? (
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
                <span
                  className={isMathHover ? "math" : null}
                  onClick={() => handleClickMath(equation)}
                >
                  <BlockMath math={equation.equation} />
                </span>
              </span>
            ))}
          </div>
        ) : (
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
                style={{ display: "flex", margin: 10 }}
                contentEditable={false}
                onClick={() => handleClickMath(equation)}
                className={isMathHover ? "math" : null}
                onMouseEnter={() => setIsMathHover(true)}
                onMouseLeave={() => setIsMathHover(false)}
              >
                <BlockMath math={equation.equation} />
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

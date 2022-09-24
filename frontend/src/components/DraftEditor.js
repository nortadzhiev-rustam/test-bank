import React, { useState, useEffect, useRef } from "react";

import { BlockMath } from "react-katex";
import { Cancel } from "@mui/icons-material";
import "./DraftEditor.css";
import "katex/dist/katex.min.css";
import { IconButton } from "@mui/material";

export default function MyEditor({ setOpen, latex, setLatex }) {
  const [isMathHover, setIsMathHover] = useState(false);

  const [equationarray, setEquationarray] = useState([]);

  const editor = useRef(null);

  const handleClickMath = () => {
    setOpen(true);
  };

  function focusEditor() {
    editor.current.focus();
  }

  useEffect(() => {
    if (latex !== "")
      setEquationarray((prevState) => [
        ...prevState,
        { id: Date.now(), equation: latex },
      ]);
  }, [latex]);

  useEffect(() => {
    focusEditor();
  }, []);

  const handleDeleteMath = (id) => {
    const newArray = equationarray.filter((eq) => eq.id !== id);
    setEquationarray(newArray);
  };

  return (
    <div onClick={focusEditor}>
      <div
        className='DraftEditor-root'
        data-placeholder='Please write your question here'
        contentEditable
        ref={editor}
      >
        {latex === "" ? null : isMathHover ? (
          equationarray.map((equation) => (
            <span
              style={{ position: "relative", display: "flex", marginInline: 5 }}
              contentEditable={false}
              onMouseEnter={() => setIsMathHover(true)}
              onMouseLeave={() => setIsMathHover(false)}
            >
              <IconButton
                sx={{
                  position: "absolute",

                  top: "-20px",
                  right: "-20px",
                  color: "rgb(117, 112, 112)",
                }}
                onClick={() => handleDeleteMath(equation.id)}
              >
                <Cancel fontSize='medium' color='default' />
              </IconButton>
              <span
                className={isMathHover ? "math" : null}
                onClick={handleClickMath}
              >
                <BlockMath math={equation.equation} />
              </span>
            </span>
          ))
        ) : (
          <span
            contentEditable={false}
            onClick={handleClickMath}
            className={isMathHover ? "math" : null}
            onMouseEnter={() => setIsMathHover(true)}
            onMouseLeave={() => setIsMathHover(false)}
          >
            <BlockMath math={latex} />
          </span>
        )}
      </div>
    </div>
  );
}

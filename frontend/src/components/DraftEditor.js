import React, { useState, useEffect, useRef } from "react";

import { BlockMath } from "react-katex";
import { Cancel } from "@mui/icons-material";
import "./DraftEditor.css";
import "katex/dist/katex.min.css";
import { IconButton } from "@mui/material";
import renderMathInElement from "katex/contrib/auto-render";

export default function MyEditor({ setOpen, latex, setLatex }) {
  const [isMathHover, setIsMathHover] = useState(false);

  const [equationarray, setEquationarray] = useState([]);

  const editor = useRef(null);

  const handleClickMath = (eq) => {
    setOpen(true);
    setLatex(eq.equation);
    const newEq = equationarray.filter((equation) => eq.id !== equation.id);
    setEquationarray(newEq);
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
    <div style={{ width: "100%" }} onClick={focusEditor}>
      <div
        className='DraftEditor-root'
        id='editor'
        data-placeholder='Please write your question here'
        contentEditable
        ref={editor}
        onChange={(e) => console.log(e.currentTarget.textContent)}
      >
        {latex === "" ? null : isMathHover ? (
          <div style={{ display: "flex", flexDirection: "row" }}>
            {equationarray.map((equation) => (
              <span
                key={equation.id}
                style={{
                  position: "relative",
                  display: "flex",
                  marginInline: 5,
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
                    color: "rgb(117, 112, 112)",
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
          <div style={{ display: "flex", flexDirection: "row" }}>
            {equationarray.map((equation) => (
              <span
                key={equation.id}
                style={{ display: "flex", margin: 10 }}
                contentEditable={false}
                onClick={handleClickMath}
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

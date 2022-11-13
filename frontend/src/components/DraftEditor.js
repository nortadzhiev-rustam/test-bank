import React, { useState, useEffect, useRef } from "react";
import { BlockMath } from "react-katex";
import { Cancel } from "@mui/icons-material";
import "./DraftEditor.css";
import "katex/dist/katex.min.css";
import { IconButton, InputBase } from "@mui/material";


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
  const [questionText, setQuestionText] = useState("");
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
      setContent((prevState) => ({ ...prevState, equation: latex.equation }));
      setEquation("");
    }
  }, [latex, setEquation, setContent]);
  //watches for the editing if the equation is edited updates the equation array
  useEffect(() => {
    if (isEditing) {
      const newArr = equationarray
        .filter((item) => item.id !== edited.id)
        .map((item) => item);

      setEquationarray(newArr);
      setEditing(false);
    }
  }, [isEditing, edited.id, equationarray, setEditing]);

  const handleDeleteMath = (id) => {
    const newArray = equationarray.filter((eq) => eq.id !== id);
    setEquationarray(newArray);
  };

  const handleInput = (e) => {
    setQuestionText(e.target.value);
    setContent((prevState) => ({ ...prevState, text: e.target.value }));
  };

  return (
    <div
      style={{ width: "100%" }}
      className={className || ""}
      onClick={focusEditor}
    >
      <div className='DraftEditor-root' id={editorId} ref={editor}>
        <InputBase
          style={{ color: "white", fontStyle: "italic" }}
          variant='filled'
          multiline
          placeholder={equationarray.length === 0 ? placeholder : null}
          value={questionText}
          onChange={handleInput}
        />
        {equationarray.length !== 0 && (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p>
              <br />
            </p>
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

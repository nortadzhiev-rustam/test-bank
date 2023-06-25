import React, { useState, useEffect, useRef } from "react";
import { BlockMath } from "react-katex";
import { Cancel } from "@mui/icons-material";
import "./DraftEditor.css";
import "katex/dist/katex.min.css";
import { Box, IconButton } from "@mui/material";
import TipTapEditor from "./TipTapEditor";

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
  correctAnswer,
  editing,
  content,
  isOpen,
  setIsOpen,
  type,
}) {
  const [isMathHover, setIsMathHover] = useState(false);
  const [questionText, setQuestionText] = useState("");
  const [equationarray, setEquationarray] = useState([]);

  useEffect(() => {
    if (editing) {
      if (content?.text) setQuestionText(content.text);
      if (content?.equation)
        setEquationarray([{ id: 1, equation: content.equation }]);
    }
  }, [editing, content]);

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
    setContent((prevState) => ({ ...prevState, equation: "" }));
  };

  const handleChangeModel = (e) => {
    setQuestionText(e);
    setContent((prevState) => ({ ...prevState, text: e }));
  };

  return (
    <div
      style={{ width: "100%" }}
      className={className || ""}
      onClick={focusEditor}
    >
      <Box
        className='DraftEditor-root'
        id={editorId}
        ref={editor}
       
        
      >
        <TipTapEditor
          contentText={questionText}
          handleChangeModel={handleChangeModel}
          math={equationarray[0]}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          editing={editing}
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
      </Box>
    </div>
  );
}

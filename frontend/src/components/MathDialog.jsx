import React, { useRef, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";
import { convertLatexToMarkup } from "mathlive";
import "mathlive/fonts.css";
import "mathlive/static.css";
import { formulas } from "../constants/formulas";
import { IconButton, Typography } from "@mui/material";
import { CancelRounded } from "@mui/icons-material";

function PaperComponent(props) {
  return (
    <Draggable
      handle='#draggable-dialog-title'
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function MathDialog({ open, setOpen, latex, setLatex }) {
  const mathfieldRef = useRef(null);
  const [value, setValue] = useState(latex || "");

  // Wire the mathlive <math-field> web component: seed it with the incoming
  // latex, focus it, and mirror edits back into React state.
  useEffect(() => {
    const mf = mathfieldRef.current;
    if (!mf) return;
    mf.value = latex || "";
    setValue(latex || "");
    const handleInput = (e) => setValue(e.target.value);
    mf.addEventListener("input", handleInput);
    mf.focus();
    return () => mf.removeEventListener("input", handleInput);
  }, [latex]);

  const handleClose = () => {
    setOpen?.(false);
  };

  const handleSubmit = () => {
    setLatex?.(value);
    setOpen?.(false);
  };

  // Insert a formula snippet from the palette at the cursor.
  const handleInsert = (snippet) => {
    const mf = mathfieldRef.current;
    if (!mf) return;
    mf.insert(snippet);
    setValue(mf.value);
    mf.focus();
  };

  return (
    <div>
      <Dialog
        className='animate__animated animate__fadeIn'
        open={true}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby='draggable-dialog-title'
      >
        <DialogTitle
          style={{
            cursor: "move",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
          id='draggable-dialog-title'
        >
          <Typography
            variant='body1'
            sx={{ fontSize: "30px", fontWeight: "bold" }}
          >
            Formula
          </Typography>{" "}
          <IconButton onClick={handleClose}>
            <CancelRounded color='error' />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <math-field
            ref={mathfieldRef}
            style={{
              width: "98%",
              minWidth: "320px",
              fontSize: "24px",
              padding: "8px",
              borderRadius: "10px",
              border: "1px solid #ccc",
            }}
          ></math-field>
          <Paper
            style={{
              marginBlock: 20,
              display: "flex",
              alignItems: "end",
              flexWrap: "wrap",
            }}
          >
            {formulas.map((formula) => (
              <Button
                key={formula.id}
                variant='contained'
                style={{
                  height: 40,
                  width: 40,
                  textTransform: "lowercase",
                  fontSize: formula.fontSize,
                  marginInline: 2,
                  borderRadius: 5,
                  marginBlock: 5,
                  display: "flex",
                  alignItems: "center",
                  padding: 0,
                  cursor: "pointer",
                }}
                size='large'
                onClick={() => handleInsert(formula.latex)}
              >
                <span
                  style={{ pointerEvents: "none" }}
                  dangerouslySetInnerHTML={{
                    __html: convertLatexToMarkup(formula.formula),
                  }}
                />
              </Button>
            ))}
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

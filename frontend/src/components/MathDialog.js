import React, { useRef } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";
import { addStyles, EditableMathField, StaticMathField } from "react-mathquill";
import { formulas } from "../constants/formulas";
import { IconButton, Typography, Box, TextField } from "@mui/material";
import { CancelRounded } from "@mui/icons-material";
import PropTypes from "prop-types";
import { MathJax, MathJaxContext } from "better-react-mathjax";

addStyles();
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
  const [formule, setFormule] = React.useState("");
  const [formuleLatex, setFormuleLatex] = React.useState("");
  const [ltx, setLtx] = React.useState("");
  const inputRef = useRef(null);
  React.useEffect(() => {
    if (latex) {
      setFormule(latex);
    } else setFormule("");
  }, [latex]);

  const handleClose = () => {
    setFormule("");
    setOpen(false);
  };

  const handleSubmit = () => {
    setLatex(formule);
    setFormule("");
    setOpen(false);
  };

  const handleChange = (value) => {
    setFormule(value);
  };

  const handleMathType = (type) => {
    if (formuleLatex === "") {
      setFormuleLatex(type);
      document.querySelector("#math-field").focus();
    } else {
      const el = document.querySelector("#math-field");
      console.log(el);
    }
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
          <IconButton onClick={() => setOpen(false)}>
            <CancelRounded color='error' />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <EditableMathField
            mathquillDidMount={(mathField) => {
              mathField.focus();
              
            }}
            id='math-field'
            style={{
              width: "98%",
              height: "60px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 5,
              borderRadius: 10,
            }}
            latex={formuleLatex}
            onChange={(mathField) => {
              setFormuleLatex(mathField.write(ltx));
            }}
          />
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
                  textTransform: "lowerCase",
                  fontSize: formula.fontSize,
                  marginInline: 2,
                  borderRadius: 5,
                  marginBlock: 5,
                  dispaly: "flex",
                  alignItems: "center",
                  padding: 0,
                  cursor: "pointer",
                }}
                size='large'
                onClick={() => {
                  setLtx(formula.latex);
                }}
              >
                <StaticMathField style={{ cursor: "pointer" }}>
                  {formula.formula}
                </StaticMathField>
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

MathDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  latex: PropTypes.string.isRequired,
  setLatex: PropTypes.func.isRequired,
};

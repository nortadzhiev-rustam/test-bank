import React from "react";
import { Paper, Box, Typography, Button } from "@mui/material";
import { MathfieldElement } from "mathlive";

import("mathlive/dist/mathlive-static.css");
const styles = `
:host(:focus), :host(:focus-within) {
  outline: none !important;
  border-color: rgba(73, 79, 117, 0.5) !important;
  box-shadow: 0 0 0 2px rgba(73, 79, 117, 0.3);
}
:host {
  border: 1px solid #eee !important;
  border-radius: 4px;
  cursor: text;
  height: 100%;
  justify-content: center;
  align-items: center;
  padding: 30px 0;
  font-size: 32px;
}
.ML__virtual-keyboard-toggle.is-visible {
  color: rgba(73, 79, 117, 1) !important;
}
.ML__virtual-keyboard-toggle.is-visible:hover{
  background: rgba(73, 79, 117, 0.3) !important;
}
.ML__mathlive {
  padding-left: 10px;

}

`;
export default function MathInput({ isOpen, setIsOpen }) {
  const [latex, setLatex] = React.useState("f(x) = x^2");
  const mfe = React.useMemo(() => {
    const mfe = new MathfieldElement();
    const style = document.createElement("style");
    style.innerHTML = styles;
    style.setAttribute("data-id", "custom");
    style.setAttribute("data-refcount", "custom");

    mfe.setOptions({
      virtualKeyboardMode: "manual",
      virtualKeyboards: "numeric functions symbols greek",
    });
    mfe.value = latex;
    mfe.setAttribute("id", "MathID-1");
    mfe.shadowRoot.appendChild(style);
    return mfe;
  }, [latex]);

  React.useEffect(() => {
    const mathfield = document.querySelector("#mathfield");
    if (mathfield) {
      if (mathfield.hasChildNodes()) {
        const prev = document.querySelector("#MathID-1");
        if (prev) {
          mathfield.replaceChild(mfe, prev);
        }
      } else {
        mathfield.appendChild(mfe);
      }
    } //eslint-disable-next-line
  }, [isOpen]);

  React.useEffect(() => {
    mfe.addEventListener("input", (event) => {
      setLatex(event.target.value);
    });
  }, [mfe]);
  return (
    <Paper elevation={5} sx={{ padding: 2 }}>
      <Typography variant='button' fontFamily='roboto'>
        Formula
      </Typography>
      <Box
        
        id='mathfield'
      ></Box>
      <Box mt={2} display='flex' justifyContent='flex-end'>
        <Button variant='contained' color='primary'>
          Submit
        </Button>
        <Button
          variant='contained'
          color='error'
          sx={{ marginLeft: 2 }}
          onClick={() => setIsOpen(!isOpen)}
        >
          Cancel
        </Button>
      </Box>
    </Paper>
  );
}

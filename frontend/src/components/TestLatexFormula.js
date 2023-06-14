import React, { useRef } from "react";
import "mathquill/build/mathquill.css";
import { addStyles, EditableMathField } from "react-mathquill";
import { formulas } from "../constants/formulas";
import { Button, Stack } from "@mui/material";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
addStyles();

const LatexEditor = ({ setLatexCode }) => {
  const mathFieldRef = useRef(null);

  const handleButtonClick = (value) => {
    mathFieldRef.current.focus();
    mathFieldRef.current.write(value);
  };

  const handleClearClick = () => {
    mathFieldRef.current.focus();
    mathFieldRef.current.clear();
  };

  const handleChange = (latex) => {
    setLatexCode(latex);
  };

  return (
    <Stack spacing={2} width='100%'>
      <Stack width='100%'>
        <EditableMathField
          style={{
            width: "100%",
            minHeight: 80,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            pl: '50px',
            
          }}
          latex=''
          config={{
            autoCommands: "frac sqrt pi sum int infty alpha beta gamma",
          }}
          onChange={(mathField) => {
            const latex = mathField.latex();
            // Use the `latex` value as needed
            handleChange(latex);
          }}
          mathquillDidMount={(mathField) => {
            mathFieldRef.current = mathField;
          }}
        />
      </Stack>
      <Stack
        direction='row'
        useFlexGap
        flexWrap='wrap'
        spacing={1}
        alignItems='flex-start'
        justifyContent='flex-start'
      >
        {formulas.map((formula) => (
          <Button
            color='secondary'
            variant='contained'
            sx={{
              textTransform: "lowercase",
              fontSize: formula.fontSize,
              minWidth: 30,
              maxWidth: 40,
              minHeight: 30,
              maxHeight: 40,
              mb: 1,
            }}
            key={formula.id}
            onClick={() => handleButtonClick(formula.latex)}
          >
            <BlockMath math={formula.formula} />
          </Button>
        ))}
      </Stack>
    </Stack>
  );
};

export default LatexEditor;

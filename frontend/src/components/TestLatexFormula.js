import React, { useRef } from "react";
import "mathquill/build/mathquill.css";
import { addStyles, EditableMathField } from "react-mathquill";
import { formulas } from "../constants/formulas";
import { Button, Stack, Box } from "@mui/material";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
addStyles();

const LatexEditor = ({ setLatexCode }) => {
  const mathFieldRef = useRef(null);

  const handleButtonClick = (value) => {
    mathFieldRef.current.focus();
    mathFieldRef.current.write(value);
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
            alignItems: "center",
            pl: "50px",
            borderRadius: 10,
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
        flexWrap='wrap'
        spacing={2}
        alignItems='flex-end'
        justifyContent='flex-start'
        width='95%'
        p={1}
      >
        {formulas.map((formula) => (
          <Box
            key={formula.id}
            component={Button}
            bgcolor='inherit'
            variant='contained'
            textTransform='lowercase'
            width={50}
            height={50}
            ml={2}
            mt={2}
            p={2}
            sx={{
              color: "black",
              fontSize: ".7rem",
            }}
            onClick={() => handleButtonClick(formula.latex)}
          >
            <BlockMath math={formula.formula} />
          </Box>
        ))}
      </Stack>
    </Stack>
  );
};

export default LatexEditor;

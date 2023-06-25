import React, { useRef } from "react";
import "mathquill/build/mathquill.css";
import { addStyles, EditableMathField } from "react-mathquill";
import { formulas } from "../constants/formulas";
import { Stack, Box, Typography } from "@mui/material";

import "katex/dist/katex.min.css";
import FormulaTabs from "./FormulaTabs";
addStyles();

const LatexEditor = ({ setLatexCode, latexCode }) => {
  const mathFieldRef = useRef(null);

 

  const handleChange = (latex) => {
    setLatexCode(latex);
  };

  return (
    <Stack spacing={2} width='100%' justifyContent='center' alignItems='center'>
      <Stack width='100%'>
        <EditableMathField
          style={{
            width: "96%",
            minHeight: 100,
            display: "flex",
            alignItems: "center",
            paddingLeft: 20,
            borderRadius: 10,
            marginTop: 5,
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
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          p={1}
          mt={1}
          bgcolor='#fffcf2'
          minHeight={80}
          boxShadow={1}
          borderRadius={2}
        >
          {" "}
          <Typography>{latexCode}</Typography>
        </Box>
      </Stack>
      <Stack
        direction='row'
        flexWrap='wrap'
        spacing={2}
        alignItems='flex-end'
        justifyContent='flex-start'
        width='95%'
        p={1}
        ml={2}
      >
        <FormulaTabs formulas={formulas} mathFieldRef={mathFieldRef} />
      </Stack>
    </Stack>
  );
};

export default LatexEditor;

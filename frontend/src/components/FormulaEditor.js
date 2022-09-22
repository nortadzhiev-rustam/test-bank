import React from "react";
import { Button, InputBase, Box, Grid } from "@mui/material";
import { styled } from "@mui/styles";
import { MathFieldComponent } from "react-mathlive";
import("mathlive/dist/mathlive-static.css");
const StyledInput = styled(InputBase)({
  width: "100%",
  margin: "10px 10px",
  border: "1px solid #ccc",
  borderRadius: "6px",
  padding: "10px",
  height: "150px",
});

const FormulaEditor = ({ setOpen, setEquation, equation }) => {
  const [latex, setLatex] = React.useState(equation);

  const handleSubmit = () => {
    setEquation(latex);
    setOpen(false)
  };

  return (
    <Box display='flex' component='div' flexDirection='column'>
      <Grid
        container
        spacing={1}
        display='flex'
        flexDirection='row'
        alignItems='center'
      ></Grid>
      <Box sx={{ marginTop: "5px" }}>
        <Box
          sx={{
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: "#ccc",
            borderRadius: "5px",
            padding: "10px",
            marginInline: "2px",
            marginBlock: "10px",
          }}
        >
          <MathFieldComponent
            mathFieldConfig={{ virtualKeyboardMode: "onfocus" }}
            latex={latex}
            onChange={setLatex}
          />
        </Box>
        <Box width={210} display='flex' justifyContent='space-between'>
          <Button
            onClick={() => setOpen(false)}
            sx={{ width: 100 }}
            variant='contained'
            color='error'
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            sx={{ width: 100 }}
            variant='contained'
            color='info'
          >
            Add
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default FormulaEditor;

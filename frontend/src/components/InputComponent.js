import React from "react";
import {
  TextField,
  Button,
  InputBase,
  Box,
  IconButton,
  Grid,
} from "@mui/material";
import { styled } from "@mui/styles";

import { FunctionsRounded } from "@mui/icons-material";
import { MathFieldComponent } from "react-mathlive";
const StyledInput = styled(InputBase)({
  width: "100%",
  margin: "10px 10px",
  border: "1px solid #ccc",
  borderRadius: "6px",
  padding: "10px",
  height: "150px",
});

const Input = ({setOpen}) => {
  const [latex, setLatex] = React.useState("");
  

  return (
    <Box display='flex' component='div' flexDirection='column'>
      <Grid
        container
        spacing={1}
        display='flex'
        flexDirection='row'
        alignItems='center'
      ></Grid>
      <Box sx={{marginTop: '5px'}}>
        <Box
          sx={{
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: "#ccc",
            borderRadius: "5px",
            padding: "10px",
            marginInline: "2px",
            marginBlock: '10px'
          }}
        >
          <MathFieldComponent
            mathFieldConfig={{ virtualKeyboardMode: "manual" }}
            latex={latex}
            onChange={setLatex}
            style={{ border: 1, borderColor: "#666" }}
          />
        </Box>
        <Box width={210} display='flex' justifyContent='space-between'>
          <Button onClick={() => setOpen(false)} sx={{width: 100}} variant='contained' color='error'>
            Cancel
          </Button>
          <Button sx={{width: 100}} variant='contained' color='info'>
            Add
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Input;

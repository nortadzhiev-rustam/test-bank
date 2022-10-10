import React from "react";
import { Button, Box, Grid } from "@mui/material";

import { MathFieldComponent } from "react-mathlive";
import("mathlive/dist/mathlive-static.css");

const FormulaEditor = ({
  setOpen,
  setEquation,
  equation,
  setEditEquation,
  isEditing,
  className,
  handleOpen,
  setFlip,
}) => {
  const [latex, setLatex] = React.useState(equation.equation || "");

  const handleSubmit = () => {
    setEquation(latex);

    setLatex("");
    if (setFlip) {
      setFlip();
    }

    handleOpen && handleOpen();
    setOpen(false);
  };

  const handleEditSubmit = () => {
    setEditEquation({ id: equation.id, equation: latex });
    setEquation("");

    if (setFlip) {
      setFlip();
    }

    handleOpen && handleOpen();
    setOpen(false);
  };

  const handleClose = () => {
    setEquation(equation.equation);

    if (setFlip) {
      setFlip();
    }

    handleOpen && handleOpen();
    setOpen(false);
  };

  return (
    <Box component='div' overflow='hidden' mt={5} mb={2} p={2}>
      <Box
        boxShadow={10}
        display='flex'
        component='div'
        flexDirection='column'
        bgcolor='#22333b'
        p={2}
        borderRadius={3}
        overflow='hidden'
        className={
          className || "animate__animated animate__bounceInDown animate__slow"
        }
      >
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
              marginBlock: "20px",
              backgroundColor: "white",
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
              onClick={handleClose}
              sx={{ width: 100 }}
              variant='contained'
              color='error'
            >
              Cancel
            </Button>
            <Button
              onClick={isEditing ? handleEditSubmit : handleSubmit}
              sx={{ width: 100 }}
              variant='contained'
              color='info'
            >
              Add
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default FormulaEditor;

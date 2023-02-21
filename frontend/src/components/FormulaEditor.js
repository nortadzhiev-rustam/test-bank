import React from "react";
import { Button, Box, Grid, Paper } from "@mui/material";

import { MathfieldComponent } from "react-mathlive";
import("mathlive/dist/mathlive-static.css");

const FormulaEditor = ({
  setOpen,
  setEquation,
  equation,
  setEditEquation,
  isEditing,
  className,
  handleOpen,
  setClosing,
  isClosing,
}) => {
  const [latex, setLatex] = React.useState(equation.equation || "");

  const handleSubmit = () => {
    setEquation(latex);
    setLatex("");
    setTimeout(() => {
      setOpen(false);
    }, 1500);

    setClosing(true);
  };

  const handleEditSubmit = () => {
    setEditEquation({ id: equation.id, equation: latex });
    setEquation("");
    setTimeout(() => {
      setOpen(false);
    }, 1500);

    setClosing(true);
  };

  const handleClose = () => {
    setEquation(equation.equation);
    setTimeout(() => {
      setOpen(false);
    }, 1500);

    setClosing(true);
  };

  return (
    <Box
      component='div'
      overflow='hidden'
      mt={0.1}
      mb={0.1}
      py={2}
      width='100%'
    >
      <Paper
        elevation={6}
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#22333b",
          padding: 10,
          borderRadius: 10,
          overflow: "hidden",
        }}
        className={
          className !== "" && className !== null && className !== undefined
            ? className
            : isClosing
            ? "animate__animated animate__bounceOutUp animate__slow"
            : "animate__animated animate__bounceInDown animate__slow"
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
            <MathfieldComponent
              mathfieldConfig={{ virtualKeyboardMode: "onfocus" }}
              latex={latex}
              onChange={setLatex}
            />
          </Box>
          <Box width='100%' display='flex' justifyContent='space-between'>
            <Button
              onClick={handleClose}
              sx={{ width: 90 }}
              variant='contained'
              color='error'
              size='medium'
            >
              Cancel
            </Button>
            <Button
              onClick={
                latex !== ""
                  ? isEditing
                    ? handleEditSubmit
                    : handleSubmit
                  : null
              }
              sx={{ width: 90 }}
              variant='contained'
              color='info'
              size='medium'
            >
              Add
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default FormulaEditor;

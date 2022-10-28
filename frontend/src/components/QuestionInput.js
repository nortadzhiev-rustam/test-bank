import React, { useState } from "react";
import { Box, Tooltip, Button, IconButton, Paper } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { PhotoCamera } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Formula from "../formula-fx-icon.svg";
import FormulaEditor from "../components/FormulaEditor";
import MyEditor from "./DraftEditor";

// import axios from "axios";
const QuestionInput = () => {
  const [equation, setEquation] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [toEdit, setToEdit] = useState("");
  const [tempImageURL, setTempImageURL] = useState("");
  const [isEditing, setEditing] = useState(false);
  const [isClosing, setClosing] = useState(false);
  const handleOpen = () => {
    setClosing(false);
    setIsOpen(true);
    setToEdit("");
  };

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setIsOpen(false);
    }, 1500);

    setToEdit("");
  };

  // const uploadFile = async (e) => {
  //   e.preventDefault();
  //   let file = e.target.files[0];
  //   let fileName = file.name;
  //   console.log(file);
  //   const formData = new FormData();
  //   formData.append("file", file);
  //   formData.append("fileName", fileName);
  //   try {
  //     const res = await axios.post(
  //       "http://localhost:5000/api/v1/upload",
  //       formData
  //     );
  //     console.log(res);
  //   } catch (ex) {
  //     console.log(ex);
  //   }
  // };

  const handleImageUpload = (e) => {
    setTempImageURL(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <Paper
      style={{
        borderRadius: "10px",
        paddingBlock: "20px",
        paddingInline: "20px",
        marginInline: "2px",
        backgroundColor: "#006064",
        minHeight: 280,
        height: isOpen && 450,
        transition: "all 0.5s ease-in",
      }}
      elevation={10}
    >
      <Box display='flex' flexDirection='row' alignItems='center'>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            marginBottom: "10px",
            justifyContent: "space-between",

            width: "100%",
          }}
        >
          <Tooltip title='Click to Upload picture' arrow>
            <Button
              color='warning'
              variant='contained'
              sx={{ marginRight: "5px" }}
              aria-label='upload picture'
              component='label'
              startIcon={<PhotoCamera />}
              size='small'
            >
              <input
                hidden
                accept='image/*'
                type='file'
                onChange={handleImageUpload}
              />
              photo
            </Button>
          </Tooltip>
          <Tooltip
            title='Click here to inser Equation'
            arrow
            sx={{ marginBottom: "5px" }}
          >
            <Button
              sx={{ marginRight: "0px" }}
              color='error'
              onClick={isOpen ? handleClose : handleOpen}
              variant='contained'
              startIcon={
                <img style={{ height: 25 }} src={Formula} alt='formula' />
              }
              size='small'
            >
              Equation
            </Button>
          </Tooltip>
        </Box>
      </Box>

      <Grid
        container
        spacing={1}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {tempImageURL !== "" && (
          <Grid xs={12} md={4}>
            <Box
              maxWidth='100%'
              height='100%'
              component='div'
              sx={{
                border: "1px",
                borderStyle: "dashed",
                borderColor: "#888",
                borderRadius: 2,
                position: "relative",
                backgroundColor: "white",
              }}
            >
              <IconButton
                sx={{ position: "absolute", top: -5, right: -8 }}
                onClick={() => setTempImageURL("")}
              >
                <DeleteIcon color='action' fontSize='small' />
              </IconButton>
              <IconButton
                sx={{ position: "absolute", top: 20, right: -8 }}
                aria-label='upload picture'
                component='label'
              >
                <EditIcon color='action' fontSize='small' />
                <input
                  hidden
                  accept='image/*'
                  type='file'
                  onChange={handleImageUpload}
                />
              </IconButton>
              <img
                src={tempImageURL}
                alt='inputImage'
                style={{
                  width: "100%",
                  maxHeight: "150px",
                  objectFit: "contain",
                  borderRadius: "15px",
                }}
              />
            </Box>
          </Grid>
        )}
        <Grid xs={12} md={tempImageURL !== "" ? 8 : 12}>
          <MyEditor
            latex={{ id: Date.now(), equation }}
            setLatex={(eq) => setToEdit(eq)}
            setEditing={(e) => setEditing(e)}
            edited={toEdit}
            isEditing={isEditing}
            setEquation={(eq) => setEquation(eq)}
            placeholder='Please write your question here'
            editorId='question'
            handleOpen={handleOpen}
          />
        </Grid>
      </Grid>
      {isOpen && (
        <Box width={"100%"} pl={0}>
          <FormulaEditor
            setEquation={(eq) => setEquation(eq)}
            setOpen={(o) => setIsOpen(o)}
            equation={toEdit}
            isEditing={isEditing}
            setEditEquation={(eq) => setToEdit(eq)}
            isClosing={isClosing}
            setClosing={(e) => setClosing(e)}
          />
        </Box>
      )}
    </Paper>
  );
};

export default QuestionInput;

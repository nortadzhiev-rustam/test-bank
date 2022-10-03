import React, { useState } from "react";
import { Box, Tooltip, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { PhotoCamera } from "@mui/icons-material";
import Formula from "../formula-fx-icon.svg";
import FormulaEditor from "../components/FormulaEditor";
import MyEditor from "./DraftEditor";
import Tiptap from "./TipTap";
import axios from "axios";
const QuestionInput = () => {
  const [equation, setEquation] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [toEdit, setToEdit] = useState("");
  const [tempImageURL, setTempImageURL] = useState("");
  const [isEditing, setEditing] = useState(false);
  const handleOpen = () => {
    setIsOpen(!isOpen);
    setToEdit("");
  };

  const uploadFile = async (e) => {
    e.preventDefault();
    let file = e.target.files[0];
    let fileName = file.name;
    console.log(file);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/upload",
        formData
      );
      console.log(res);
    } catch (ex) {
      console.log(ex);
    }
  };

  const handleImageUpload = (e) => {
    setTempImageURL(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <Box
      style={{
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "#ccc",
        borderRadius: "5px",
        padding: "10px",
        marginInline: "2px",
      }}
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
              color='primary'
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
            title='Click here to inser Formula'
            arrow
            sx={{ marginBottom: "5px" }}
          >
            <Button
              sx={{ marginRight: "0px" }}
              color='warning'
              onClick={handleOpen}
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
        sx={{ maxHeight: 200, alignItems: "center", justifyContent: "center" }}
      >
        {tempImageURL !== "" && (
          <Grid xs={12} md={4} sx={{ cursor: "pointer" }}>
            <Box
              maxWidth='100%'
              maxHeight='100%'
              component='div'
              onClick={() => setTempImageURL("")}
            >
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
          {/* <MyEditor
            setOpen={(o) => setIsOpen(o)}
            latex={equation}
            setLatex={(eq) => setToEdit(eq)}
            setEditing={(e) => setEditing(e)}
            edited={toEdit}
            isEditing={isEditing}
          /> */}
          <Tiptap />
        </Grid>
      </Grid>

      {isOpen && (
        <FormulaEditor
          setEquation={(eq) => setEquation(eq)}
          setOpen={(o) => setIsOpen(o)}
          equation={toEdit}
          isEditing={isEditing}
          setEditEquation={(eq) => setToEdit(eq)}
        />
      )}
    </Box>
  );
};

export default QuestionInput;

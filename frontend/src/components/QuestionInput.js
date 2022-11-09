import React, { useState, useEffect } from "react";
import {
  Box,
  Tooltip,
  Button,
  IconButton,
  Paper,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { PhotoCamera } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Formula from "../formula-fx-icon.svg";
import FormulaEditor from "../components/FormulaEditor";
import MyEditor from "./DraftEditor";
import ImageUpload from "./imageDialog";
import axios from "axios";
import Alert from "@mui/material/Alert";
// import axios from "axios";
const QuestionInput = ({
  setTitle,
  title,
  mark,
  setMark,
  setQuestion,
  image,
  setImage,
}) => {
  const [equation, setEquation] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [toEdit, setToEdit] = useState("");
  const [isEditing, setEditing] = useState(false);
  const [isClosing, setClosing] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setMark(event.target.value);
  };

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

  const handleDelete = async () => {
    const res = await axios.delete(
      "http://localhost:5000/api/v1/files/" + image
    );
    setMessage(res.data.message);
    setImage("");
  };

  useEffect(() => {
    if (message.length !== 0) {
      setTimeout(() => {
        setMessage("");
      }, 2000);
    }
  }, [message]);

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
      {message !== "" && (
        <Alert
          className='animate__animated animate__fadeInDown'
          sx={{ margin: 2 }}
          severity='success'
        >
          {message}
        </Alert>
      )}
      <ImageUpload
        setImage={(iamge) => setImage(iamge)}
        open={dialogOpen}
        setOpen={(e) => setDialogOpen(e)}
      />

      <Box display='flex' flexDirection='row' alignItems='center'>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            marginBottom: "10px",
            justifyContent: "flex-start",
            width: "100%",
          }}
        >
          <Box
            display='flex'
            alignItems='center'
            justifyContent='space-between'
            width='100%'
          >
            <Tooltip title='Click to Upload picture' arrow>
              <Button
                color='warning'
                variant='contained'
                sx={{ marginRight: "5px" }}
                aria-label='upload picture'
                component='label'
                startIcon={<PhotoCamera />}
                size='medium'
                onClick={() => setDialogOpen(true)}
              >
                photo
              </Button>
            </Tooltip>
            <TextField
              sx={{ backgroundColor: "white", borderRadius: 1, width: "100%" }}
              label='Title'
              id='outlined-size-small'
              value={title}
              size='small'
              onChange={(e) => setTitle(e.target.value)}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FormControl
              sx={{
                marginRight: 2,
                width: 80,
                backgroundColor: "white",
                borderRadius: 1,
              }}
              size='small'
            >
              <InputLabel id='demo-select-small'>Mark</InputLabel>
              <Select
                labelId='demo-select-small'
                id='demo-select-small'
                value={mark}
                label='Mark'
                onChange={handleChange}
              >
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={15}>15</MenuItem>
                <MenuItem value={20}>20</MenuItem>
              </Select>
            </FormControl>
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
                size='medium'
              >
                Equation
              </Button>
            </Tooltip>
          </Box>
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
        {image !== "" && (
          <Grid xs={12} md={4}>
            <Box
              maxWidth='100%'
              height={220}
              component='div'
              sx={{
                border: "1px",
                borderStyle: "dashed",
                borderColor: "#888",
                borderRadius: 2,
                position: "relative",
                backgroundColor: "white",
                display: "flex",
                alignItems: "center",
              }}
            >
              <IconButton
                sx={{ position: "absolute", top: -5, right: -8 }}
                onClick={handleDelete}
              >
                <DeleteIcon color='action' fontSize='small' />
              </IconButton>
              <IconButton
                sx={{ position: "absolute", top: 20, right: -8 }}
                aria-label='upload picture'
                component='label'
                onClick={() => setDialogOpen(true)}
              >
                <EditIcon color='action' fontSize='small' />
              </IconButton>
              <img
                src={process.env.PUBLIC_URL + "/uploads/" + image}
                alt='inputImage'
                style={{
                  width: "100%",
                  maxHeight: "210px",
                  objectFit: "contain",
                  borderRadius: "15px",
                }}
              />
            </Box>
          </Grid>
        )}
        <Grid xs={12} md={image !== "" ? 8 : 12}>
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
            setContent={setQuestion}
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

import React, { useState, useEffect, Fragment } from "react";
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
// import FormulaEditor from "../components/FormulaEditor";
import MyEditor from "./DraftEditor";
import ImageUpload from "./imageDialog";
import axios from "axios";
import Alert from "@mui/material/Alert";

const difficulties = ["Easy", "Normal", "Hard", "Chalange"];
const types = [
  "Multiple choice",
  "True or False",
  "Open ended",
  "Match",
  "Fill in the blanks",
];

const QuestionInput = ({
  setTitle,
  title,
  mark,
  setMark,
  setQuestion,
  image,
  setImage,
  difficulty,
  setDifficulty,
  content,
  editing,
  type,
  setType,
}) => {
  const [equation, setEquation] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [toEdit, setToEdit] = useState("");
  const [isEditing, setEditing] = useState(false);
  //eslint-disable-next-line
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
      `${
        process.env.NODE_ENV === "production"
          ? "https://backend.rustamnortadzhiev.com"
          : "http://localhost:5000"
      }/api/v1/files/${image}`
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
    return () => clearTimeout();
  }, [message]);

  return (
    <Paper
      style={{
        borderRadius: "10px",
        paddingTop: "20px",
        paddingInline: "20px",
        marginInline: "2px",
        backgroundColor: "#006064",
        minHeight: 260,

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
              <Fragment>
                <Button
                  color='warning'
                  variant='contained'
                  sx={{
                    marginRight: "5px",
                    display: { xs: "none", lg: "flex" },
                  }}
                  aria-label='upload picture'
                  component='label'
                  startIcon={<PhotoCamera />}
                  size='medium'
                  onClick={() => setDialogOpen(true)}
                >
                  photo
                </Button>
                <Button
                  color='warning'
                  variant='contained'
                  sx={{
                    marginRight: "5px",
                    display: { xs: "flex", lg: "none" },
                  }}
                  aria-label='upload picture'
                  component='label'
                  size='medium'
                  onClick={() => setDialogOpen(true)}
                >
                  <PhotoCamera />
                </Button>
              </Fragment>
            </Tooltip>
            <TextField
              sx={{
                backgroundColor: "white",
                borderRadius: 1,
                width: "100%",
                marginLeft: 1,
              }}
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
                marginInline: 2,
                width: 120,
                backgroundColor: "white",
                borderRadius: 1,
              }}
              size='small'
            >
              <InputLabel id='demo-select-small2'>Type</InputLabel>
              <Select
                labelId='demo-select-small2'
                id='demo-select-small2'
                value={type}
                label='Type'
                onChange={(e) => setType(e.target.value)}
                MenuProps={{ style: { maxHeight: 200 } }}
              >
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                {types.map((item, idx) => (
                  <MenuItem key={idx} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl
              sx={{
                marginInline: 2,
                width: 120,
                backgroundColor: "white",
                borderRadius: 1,
              }}
              size='small'
            >
              <InputLabel id='demo-select-small2'>Difficulty</InputLabel>
              <Select
                labelId='demo-select-small2'
                id='demo-select-small2'
                value={difficulty}
                label='Difficulty'
                onChange={(e) => setDifficulty(e.target.value)}
                MenuProps={{ style: { maxHeight: 200 } }}
              >
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                {difficulties.map((item, idx) => (
                  <MenuItem key={idx} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl
              sx={{
                marginRight: 2,
                width: 80,
                backgroundColor: "white",
                borderRadius: 1,
              }}
              size='small'
            >
              <InputLabel id='demo-select-small1'>Mark</InputLabel>
              <Select
                labelId='demo-select-small1'
                id='demo-select-small1'
                value={mark}
                label='Mark'
                onChange={handleChange}
                MenuProps={{ style: { maxHeight: 200 } }}
              >
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                {Array(20)
                  .fill()
                  .map((_, idx) => (
                    <MenuItem key={idx} value={idx + 1}>
                      {idx + 1}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <Tooltip
              title='Click here to inser Equation'
              arrow
              sx={{ marginBottom: "5px" }}
            >
              <Fragment>
                <Button
                  sx={{
                    marginRight: "0px",
                    display: { xs: "none", lg: "flex" },
                  }}
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
                <Button
                  sx={{
                    marginRight: "0px",
                    display: { xs: "flex", lg: "none" },
                  }}
                  color='error'
                  onClick={isOpen ? handleClose : handleOpen}
                  variant='contained'
                  size='medium'
                >
                  <img style={{ height: 25 }} src={Formula} alt='formula' />
                </Button>
              </Fragment>
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
            content={content}
            editing={editing}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default QuestionInput;

import React from "react";
import {
  Grid,
  Paper,
  Box,
  Typography,
  TextField,
  // FormControl,
  // FormLabel,
  // RadioGroup,
  // FormControlLabel,
  // Radio,
  Button,
  Tooltip,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { setFull, setVisible } from "../store/questionTypeSlice";
import {
  faCircle,
  faMinus,
  faTimes,
  faUpRightAndDownLeftFromCenter,
  faFunction,
} from "@fortawesome/free-solid-svg-icons";
import { FunctionsRounded, PhotoCameraTwoTone } from "@mui/icons-material";
// import axios from "axios";

// import InputComponent from "../components/InputComponent";
import { MathfieldComponent } from "react-mathlive";
import("mathlive/dist/mathlive-static.css");
const StyledBox = styled(Box)({
  display: "flex",
  position: "relative",
  margin: 0,
  padding: 0,
});

const FormPaper = styled(Paper)({
  width: "100%",
  minHeight: 70,
  backgroundColor: "#eceff1",
  textAlign: "start",
  borderTopRightRadius: 13,
  borderTopLeftRadius: 13,
  borderBottomRightRadius: 0,
  borderBottomLeftRadius: 0,
  paddingInline: 20,
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
});

const Input = styled("input")({
  display: "none",
});

const InsertWindow = () => {
  const [mouseIn, setMouseIn] = React.useState(false);
  const [isHover, setHover] = React.useState(false);
  // const [title, setTitle] = React.useState("");
  // const [radio, setRadio] = React.useState("True");
  // const [mark, setMark] = React.useState("");
  // const [question, setQuestion] = React.useState("");
  // const [answer, setAnswer] = React.useState({
  //   a: "",
  //   b: "",
  //   c: "",
  //   d: "",
  // });
  const [latex, setLatex] = React.useState("");
  const dispatch = useDispatch();
  const isFull = useSelector((state) => state.questionsType.isFull);
  const quest = useSelector((state) => state.questionsType.value);
  // const user = useSelector((state) => state.user.user);
  const [isOpen, setIsOpen] = React.useState(false);
  const handleFullScreen = () => {
    dispatch(setFull(!isFull));
  };

  // const handleMouseIn = () => {
  //   setMouseIn(true);
  // };

  const handleClose = () => {
    dispatch(setVisible(false));
    setMouseIn(false);
    dispatch(setFull(false));
  };

  return (
    <Grid item xs={12} sm={12} md={isFull ? 12 : 8}>
      <Paper
        elevation={isHover ? 10 : 2}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        sx={{
          borderRadius: 3,
          transition: "all 0.3s ease-in-out",
          width: "100%",
          paddingBottom: 30,
        }}
        className='animate__animated animate__zoomIn animate__faster'
      >
        <StyledBox>
          <FormPaper>
            <div
              style={{ display: "flex" }}
              onMouseLeave={() => setMouseIn(false)}
              onMouseOver={() => setMouseIn(true)}
            >
              {mouseIn ? (
                <div
                  style={{
                    display: "inline-flex",
                    backgroundColor: "#e63946",
                    borderRadius: "50%",
                    height: 20,
                    width: 20,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={handleClose}
                >
                  <FontAwesomeIcon
                    icon={faTimes}
                    size='sm'
                    style={{
                      borderRadius: "30%",
                    }}
                    color='#fff'
                  />
                </div>
              ) : (
                <FontAwesomeIcon size='lg' color='#e63946' icon={faCircle} />
              )}

              {mouseIn ? (
                <div
                  style={{
                    display: "inline-flex",
                    backgroundColor: "#ee9b00",
                    borderRadius: "50%",
                    marginLeft: 5,
                    height: 20,
                    width: 20,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faMinus}
                    size='sm'
                    style={{
                      borderRadius: "30%",
                    }}
                    color='#fff'
                  />
                </div>
              ) : (
                <FontAwesomeIcon
                  size='lg'
                  style={{ marginLeft: 5 }}
                  color='#ee9b00'
                  icon={faCircle}
                />
              )}

              {mouseIn ? (
                <div
                  style={{
                    display: "inline-flex",
                    backgroundColor: "#43aa8b",
                    borderRadius: "50%",
                    marginLeft: 5,
                    height: 20,
                    width: 20,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={handleFullScreen}
                >
                  <FontAwesomeIcon
                    icon={faUpRightAndDownLeftFromCenter}
                    size='xs'
                    style={{
                      borderRadius: "30%",
                    }}
                    color='#fff'
                  />
                </div>
              ) : (
                <FontAwesomeIcon
                  size='lg'
                  style={{ marginLeft: 5 }}
                  color='#43aa8b'
                  icon={faCircle}
                />
              )}
            </div>
            <Typography
              variant='body1'
              fontFamily='roboto'
              color='#006064'
              fontWeight='900'
            >
              {`${quest.questionType.toUpperCase()} QUESTION`}
            </Typography>
          </FormPaper>
        </StyledBox>

        <Box
          component='div'
          sx={{
            padding: 2,
          }}
        >
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
            <Typography color='primary' variant='button' ml={0.5}>
              Question
            </Typography>
            <TextField
              multiline
              rows={3}
              sx={{ width: "100%", marginBlock: 1 }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                marginBottom: "10px",
              }}
            >
              <Tooltip
                title='Click here to inser Formula'
                arrow
                sx={{ marginBottom: "5px" }}
              >
                <Button
                  sx={{ marginRight: "5px" }}
                  color='primary'
                  variant='contained'
                  onClick={() => setIsOpen(!isOpen)}
                  endIcon={<FunctionsRounded />}
                >
                  Formula
                </Button>
              </Tooltip>
              <Tooltip title='Click to Upload picture' arrow>
                <label htmlFor='icon-button-file'>
                  <Input accept='image/*' id='icon-button-file' type='file' />
                  <Button
                    variant='contained'
                    endIcon={<PhotoCameraTwoTone />}
                    sx={{ marginRight: "5px" }}
                  >
                    Image
                  </Button>
                </label>
              </Tooltip>
            </Box>

            {isOpen && (
              <Box
                sx={{
                  borderWidth: "1px",
                  borderStyle: "solid",
                  borderColor: "#ccc",
                  borderRadius: "5px",
                  padding: "10px",
                  marginInline: "2px",
                }}
              >
                <MathfieldComponent
                  mathfieldConfig={{
                    virtualKeyboardMode: "manual",
                  }}
                  latex={latex}
                  onChange={setLatex}
                />
                <Box>
                  <Button variant='outlined' color='error'>
                    Cancel
                  </Button>
                  <Button variant='outlined' color='info'>
                    Add
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Paper>
    </Grid>
  );
};

export default InsertWindow;

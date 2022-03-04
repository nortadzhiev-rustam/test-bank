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
  faPlusCircle,
  faDownLeftAndUpRightToCenter,
} from "@fortawesome/free-solid-svg-icons";

import { FunctionsRounded, PhotoCameraTwoTone } from "@mui/icons-material";
// import axios from "axios";
import { MathfieldElement } from "mathlive";
import AnswersCard from "../components/AnswersCard";
import("mathlive/dist/mathlive-static.css");

const styles = `
:host(:focus), :host(:focus-within) {
  outline: none !important;
  border-color: rgba(73, 79, 117, 0.5) !important;
  box-shadow: 0 0 0 2px rgba(73, 79, 117, 0.3);
}
:host {
  border: 1px solid #eee !important;
  border-radius: 4px;
  cursor: text;
  height: 100%;
  justify-content: center;
  alignItems: center;
}
.ML__virtual-keyboard-toggle.is-visible {
  color: rgba(73, 79, 117, 1) !important;
}
.ML__virtual-keyboard-toggle.is-visible:hover{
  background: rgba(73, 79, 117, 0.3) !important;
}
.ML__mathlive {
  padding-left: 10px;
}
`;

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
  const [latex, setLatex] = React.useState("f(x) = x^2");
  const dispatch = useDispatch();
  const isFull = useSelector((state) => state.questionsType.isFull);
  const quest = useSelector((state) => state.questionsType.value);
  // const user = useSelector((state) => state.user.user);
  const [isOpen, setIsOpen] = React.useState(false);
  const [counter, setCounter] = React.useState(3);
  const [isCardHover, setCardHover] = React.useState(false);
  const [itemNumber, setItemNumber] = React.useState();

  const [options, setOptions] = React.useState([
    {
      option: 1,
      key: 0,
    },
    {
      option: 2,
      key: 1,
    },
    {
      option: 3,
      key: 2,
    },
  ]);

  const getRandomOption = () => {
    const set = new Set();
    let randomNumber = Math.floor(Math.random() * 5) + 1;
    options.map((item) => {
      set.add(item.option);
    });
    while (set.has(randomNumber)) {
      randomNumber = Math.floor(Math.random() * 5) + 1;
    }
    return randomNumber;
  };

  const getRandomKey = () => {
    const set = new Set();
    let randomNumber = Math.floor(Math.random() * 5) + 1;
    options.map((item) => {
      set.add(item.key);
    });
    while (set.has(randomNumber)) {
      randomNumber = Math.floor(Math.random() * 5) + 1;
    }
    return randomNumber;
  };

  const addOption = () => {
    setOptions([
      ...options,
      {
        option: getRandomOption(),
        key: getRandomKey(),
      },
    ]);
    setCounter(counter + 1);
  };

  const deleteOption = (key) => {
    setOptions(options.filter((item) => item.key !== key));
    setCounter(counter - 1);
  };

  const handleFullScreen = () => {
    dispatch(setFull(!isFull));
  };

  const handleClose = () => {
    dispatch(setVisible(false));
    setMouseIn(false);
    dispatch(setFull(false));
  };

  const mfe = React.useMemo(() => {
    const mfe = new MathfieldElement();
    const style = document.createElement("style");
    style.innerHTML = styles;
    style.setAttribute("data-id", "custom");
    style.setAttribute("data-refcount", "custom");

    mfe.setOptions({
      virtualKeyboardMode: "manual",
      virtualKeyboards: "numeric functions symbols greek",
    });
    mfe.value = latex;
    mfe.setAttribute("id", "MathID-1");
    mfe.shadowRoot.appendChild(style);
    return mfe;
  }, [latex]);

  React.useEffect(() => {
    const mathfield = document.querySelector("#mathfield");
    if (mathfield) {
      if (mathfield.hasChildNodes()) {
        const prev = document.querySelector("#MathID-1");
        if (prev) {
          mathfield.replaceChild(mfe, prev);
        }
      } else {
        mathfield.appendChild(mfe);
      }
    }
  }, [isOpen]);

  React.useEffect(() => {
    mfe.addEventListener("input", (event) => {
      setLatex(event.target.value);
    });
  }, [mfe]);

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
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
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
                  {!isFull ? (
                    <FontAwesomeIcon
                      icon={faUpRightAndDownLeftFromCenter}
                      size='xs'
                      style={{
                        borderRadius: "30%",
                      }}
                      color='#fff'
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faDownLeftAndUpRightToCenter}
                      size='xs'
                      style={{
                        borderRadius: "30%",
                      }}
                      color='#fff'
                    />
                  )}
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
            padding: 5,
          }}
        >
          {isOpen && (
            <Paper elevation={5} sx={{ padding: 2 }}>
              <Typography variant='button' fontFamily='roboto'>
                Formula
              </Typography>
              <Box
                sx={{
                  borderWidth: "1px",
                  borderStyle: "solid",
                  borderColor: "#ccc",
                  borderRadius: "5px",
                  padding: "10px",
                  marginInline: "2px",
                  height: "100px",
                  alignItems: "center",
                }}
                id='mathfield'
              ></Box>
              <Box mt={2} display='flex' justifyContent='flex-end'>
                <Button variant='contained' color='primary'>
                  Submit
                </Button>
                <Button
                  variant='contained'
                  color='error'
                  sx={{ marginLeft: 2 }}
                  onClick={() => setIsOpen(!isOpen)}
                >
                  Cancel
                </Button>
              </Box>
            </Paper>
          )}
          {!isOpen && (
            <Box>
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
                      <Input
                        accept='image/*'
                        id='icon-button-file'
                        type='file'
                      />
                      <label htmlFor='contained-button-file'>
                        <Input
                          accept='image/*'
                          id='contained-button-file'
                          multiple
                          type='file'
                        />
                        <Button
                          variant='contained'
                          component='span'
                          endIcon={<PhotoCameraTwoTone />}
                        >
                          Upload
                        </Button>
                      </label>
                    </label>
                  </Tooltip>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirectoin: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-around",
                  paddingTop: 5,
                }}
              >
                {options.map((option) => (
                  <AnswersCard
                    option={option}
                    key={option.key}
                    onDelete={deleteOption}
                  />
                ))}
                <Tooltip
                  placement='top'
                  title={
                    counter === 5
                      ? "You can not add more then five options"
                      : ""
                  }
                >
                  <Paper
                    elevation={isCardHover && counter !== 5 ? 5 : 0}
                    style={{
                      height: "400px",
                      width: "350px",
                      margin: 5,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginBlock: 20,
                      borderRadius: 20,
                    }}
                    onMouseEnter={() => setCardHover(true)}
                    onMouseLeave={() => setCardHover(false)}
                  >
                    <IconButton
                      disabled={counter === 5}
                      onClick={addOption}
                      onMouseDown={() => setCardHover(false)}
                    >
                      <FontAwesomeIcon icon={faPlusCircle} size='2x' />
                    </IconButton>
                  </Paper>
                </Tooltip>
              </Box>
            </Box>
          )}
        </Box>
      </Paper>
    </Grid>
  );
};

export default InsertWindow;

import React from "react";
import {
  Grid,
  Paper,
  Box,
  Typography,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";
import { styled } from "@mui/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { setFull, setVisible } from "../store/questionTypeSlice";
import {
  faCircle,
  faMinus,
  faPlusCircle,
  faTimes,
  faUpRightAndDownLeftFromCenter,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import InputComponent from "../components/InputComponent";

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

const InsertWindow = () => {
  const [mouseIn, setMouseIn] = React.useState(false);
  const [isHover, setHover] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [radio, setRadio] = React.useState("True");
  const [mark, setMark] = React.useState("");
  const [question, setQuestion] = React.useState("");
  const [answer, setAnswer] = React.useState({
    a: "",
    b: "",
    c: "",
    d: "",
  });

  const dispatch = useDispatch();
  const isFull = useSelector((state) => state.questionsType.isFull);
  const quest = useSelector((state) => state.questionsType.value);
  const user = useSelector((state) => state.user.user);

  const handleFullScreen = () => {
    dispatch(setFull(!isFull));
  };

  const handleMouseIn = () => {
    setMouseIn(true);
  };

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
            transform: "translateZ(0px)",
            flexGrow: 1,
            padding: "10px 20px",
          }}
        >
          <InputComponent
            onChange={(value) => setQuestion(value)}
            value={question}
          />
        </Box>
      </Paper>
    </Grid>
  );
};

export default InsertWindow;

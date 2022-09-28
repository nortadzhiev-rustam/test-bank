import React from "react";
import { Grid, Paper, Box, Typography } from "@mui/material";
import { styled } from "@mui/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { setFull, setVisible } from "../store/questionTypeSlice";
import {
  faCircle,
  faMinus,
  faTimes,
  faUpRightAndDownLeftFromCenter,
  faDownLeftAndUpRightToCenter,
} from "@fortawesome/free-solid-svg-icons";
import QuestionInput from "../components/QuestionInput";

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

  const dispatch = useDispatch();
  const isFull = useSelector((state) => state.questionsType.isFull);
  const quest = useSelector((state) => state.questionsType.value);
  // const user = useSelector((state) => state.user.user);

  const handleFullScreen = () => {
    dispatch(setFull(!isFull));
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
                <CloseButton onClick={handleClose}>
                  <FontAwesomeIcon
                    icon={faTimes}
                    size='sm'
                    style={{
                      borderRadius: "30%",
                    }}
                    color='#fff'
                  />
                </CloseButton>
              ) : (
                <FontAwesomeIcon size='lg' color='#e63946' icon={faCircle} />
              )}

              {mouseIn ? (
                <MinusButton>
                  <FontAwesomeIcon
                    icon={faMinus}
                    size='sm'
                    style={{
                      borderRadius: "30%",
                    }}
                    color='#fff'
                  />
                </MinusButton>
              ) : (
                <FontAwesomeIcon
                  size='lg'
                  style={{ marginLeft: 5 }}
                  color='#ee9b00'
                  icon={faCircle}
                />
              )}

              {mouseIn ? (
                <FullScreenButton onClick={handleFullScreen}>
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
                </FullScreenButton>
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
          <QuestionInput />
        </Box>
      </Paper>
    </Grid>
  );
};

const PaperContainer = styled(Paper)({
  borderRadius: 12,
  transition: "all 0.3s ease-in-out",
  width: "100%",
  paddingBottom: 30,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});

const InputContainer = styled("div")({
  display: "flex",
  flexDirection: "row-reverse",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  paddingInline: 10,
});

const QuestionPaper = styled(Paper)({
  borderRadius: "10px",
  marginInline: "2px",
  height: 250,
  backgroundColor: "#006064",
});

const CloseButton = styled("div")({
  display: "inline-flex",
  backgroundColor: "#e63946",
  borderRadius: "50%",
  height: 20,
  width: 20,
  justifyContent: "center",
  alignItems: "center",
});

const MinusButton = styled("div")({
  display: "inline-flex",
  backgroundColor: "#ee9b00",
  borderRadius: "50%",
  marginLeft: 5,
  height: 20,
  width: 20,
  justifyContent: "center",
  alignItems: "center",
});

const FullScreenButton = styled("div")({
  display: "inline-flex",
  backgroundColor: "#43aa8b",
  marginLeft: 5,
  borderRadius: "50%",
  height: 20,
  width: 20,
  justifyContent: "center",
  alignItems: "center",
});

export default InsertWindow;

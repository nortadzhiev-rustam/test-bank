import React from "react";
import { Grid, Paper, Box, Typography, Button } from "@mui/material";
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
import AnswersContainer from "../components/AnswersContainer";
import axios from "axios";
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

const InsertWindow = ({ setData, setMessage, questionData }) => {
  const [mouseIn, setMouseIn] = React.useState(false);
  const [isHover, setHover] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [mark, setMark] = React.useState("");
  const [question, setQuestion] = React.useState("");
  const [answers, setAnswers] = React.useState([]);
  const [correctAnswer, setCorrectAnswer] = React.useState("");
  const [image, setImage] = React.useState("");
  const dispatch = useDispatch();
  const isFull = useSelector((state) => state.questionsType.isFull);
  const quest = useSelector((state) => state.questionsType.value);
  const user = useSelector((state) => state.user.user);
  // const user = useSelector((state) => state.user.user);

  const handleFullScreen = () => {
    dispatch(setFull(!isFull));
  };

  const handleClose = () => {
    dispatch(setVisible(false));
    setMouseIn(false);
    dispatch(setFull(false));
  };

  const handleSubmit = async () => {
    const data = {
      type: quest.questionType,
      category: quest.category.name,
      difficulty: quest.difficulty,
      grade: quest.grade,
      title,
      question,
      answers,
      mark,
      image,
      correctAnswer,
      userId: user.id,
      departmentId: quest.category.id,
    };

    try {
      const req = await axios.post(
        "http://localhost:5000/api/v1/question",
        data
      );
      setData([...questionData, req.data.question]);
      setMessage(req.data.message);
      handleClose();
    } catch (err) {
      console.log(err);
    }
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
          paddingBottom: 5,
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
          <QuestionInput
            setQuestion={setQuestion}
            title={title}
            setTitle={setTitle}
            mark={mark}
            setMark={setMark}
            image={image}
            setImage={setImage}
          />
          <AnswersContainer
            setCorrectAnswer={setCorrectAnswer}
            answers={answers}
            setAnswers={setAnswers}
          />
        </Box>
        <Box m={3} width='95%' textAlign='right'>
          <Button
            sx={{ borderRadius: 10 }}
            onClick={handleClose}
            color='error'
            variant='contained'
            size='large'
          >
            Cancel
          </Button>
          <Button
            sx={{ marginLeft: 2, borderRadius: 10 }}
            color='success'
            variant='contained'
            size='large'
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </Paper>
    </Grid>
  );
};

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

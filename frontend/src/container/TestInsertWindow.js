import React from "react";
import {
  Grid,
  Paper,
  Box,
  Typography,
  Button,
  Tooltip,
  IconButton,
  useMediaQuery,
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

import AnswersCard from "../components/AnswersCard";

import EditorV2 from "../components/EditorV2";

const InsertWindow = () => {
  const [mouseIn, setMouseIn] = React.useState(false);
  const [isHover, setHover] = React.useState(false);
  const dispatch = useDispatch();
  const isFull = useSelector((state) => state.questionsType.isFull);
  const quest = useSelector((state) => state.questionsType.value);
  const [counter, setCounter] = React.useState(2);
  const [isCardHover, setCardHover] = React.useState(false);
  const [options, setOptions] = React.useState([
    {
      option: 1,
      key: 0,
    },
    {
      option: 2,
      key: 1,
    },
  ]);
  const matches = useMediaQuery("(min-width:600px)");
  const getRandomOption = () => {
    const set = new Set();
    let randomNumber = Math.floor(Math.random() * 5) + 1;
    options.forEach((item) => {
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
    options.forEach((item) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e)
  };

  return (
    <Grid item xs={12} sm={12} md={isFull ? 12 : 8}>
      <PaperContainer
        elevation={isHover ? 10 : 2}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
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
                      borderRadius: "50%",
                    }}
                    color='#fff'
                  />
                </CloseButton>
              ) : (
                <FontAwesomeIcon size='lg' color='#e63946' icon={faCircle} />
              )}

              {mouseIn ? (
                <MinusButton>
                  <FontAwesomeIcon icon={faMinus} size='sm' color='#fff' />
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
            padding: 5,
          }}
        >
          <form onSubmit={handleSubmit}>
            <Box>
              <QuestionPaper elevation={5}>
                <InputContainer>
                  <EditorV2
                    height='190px'
                    placeholder='Enter your question here...'
                  />
                </InputContainer>
              </QuestionPaper>
              <Box
                sx={{
                  display: { md: "flex", sm: "block" },
                  flexDirectoin: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-around",
                  paddingTop: 5,
                }}
              >
                <Grid container spacing={3}>
                  {options.map((option, idx) => (
                    <Grid key={option.key} item xs={matches ? 6 : 12}>
                      <AnswersCard
                        matches={matches}
                        option={option}
                        onDelete={deleteOption}
                        counter={counter}
                        index={idx + 1}
                      />
                    </Grid>
                  ))}
                  {counter !== 5 && (
                    <Grid item xs={12}>
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
                            height: 150,
                            width: "100%",
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
                    </Grid>
                  )}
                </Grid>
              </Box>
            </Box>
            <Button type='submit' variant='contained'>
              Submit
            </Button>
          </form>
        </Box>
      </PaperContainer>
    </Grid>
  );
};

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

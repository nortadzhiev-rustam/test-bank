import React, { useRef, useEffect, useState, useMemo } from "react";
import { useReactToPrint } from "react-to-print";
import { useParams } from "react-router-dom";
import { experimentalStyled as styled } from "@mui/material/styles";
import axios from "axios";
import QuestionPrintView from "../components/QuestionPrintView";

import {
  Box,
  Stack,
  Typography,
  AppBar as MuiAppBar,
  Toolbar,
  Button,
  Alert,
  Switch,
  Divider,
  ToggleButtonGroup,
  ToggleButton,
  Paper,
} from "@mui/material";
import { Print } from "@mui/icons-material";
import "../components/PrintPage.css";
const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    "&:before, &:after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
    },
    "&:before": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    "&:after": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 16,
    height: 16,
    margin: 2,
  },
}));

const AppBar = styled(
  MuiAppBar,
  {}
)(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  display: "flex",
  flexDirection: "row",
  backgroundColor: "#006064",
}));

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    margin: theme.spacing(0.5),
    border: 0,
    "&.Mui-disabled": {
      border: 0,
    },
    "&:not(:first-of-type)": {
      borderRadius: theme.shape.borderRadius,
    },
    "&:first-of-type": {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

const PrintPage = ({ showNav, setShowNav }) => {
  const [data, setData] = useState({});
  const [message, setMessage] = useState("");
  const [checkBoxOn, setCheckBoxOn] = useState(true);
  const [optionOn, setOptionOn] = useState(true);
  const [shuffleQuestion, setShuffleQuestion] = useState(false);
  const [shuffleAnswers, setShuffleAnswers] = useState(false);
  const [showAnswerKey, setShowAnswerKey] = useState(false);
  const [questionImage, setQuestionImage] = useState("300");
  const [font, setFont] = useState("16px");

  const componentRef = useRef();
  const { id } = useParams();

  useEffect(() => {
    if (showNav) {
      setShowNav(false);
    }
  }, [showNav, setShowNav]);

  useEffect(() => {
    axios
      .get(`https://www.backend.rustamnortadzhiev.com/api/v1/test/${id}`)
      .then((res) => {
        if (res.status === 200) {
          setData(res.data);
          document.title = res.data.name;
        }
      })
      .catch((err) => console.log(err.message));

    return () => {
      setData({});
    };
  }, [id]);

  useEffect(() => {
    setTimeout(() => {
      setMessage("");
    }, 1000);
  }, [message]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: data.name,
    onAfterPrint: () => setMessage("Print Success"),
    pageStyle: ` @media print { body { font-size: ${font} } } `,
  });

  const { questions } = data;

  const shQuestion = useMemo(() => {
    const shuffledQuestions = () => {
      return shuffleQuestion
        ? [...questions].sort(() => Math.random() - 0.5)
        : questions;
    };
    return shuffledQuestions();
  }, [shuffleQuestion, questions]);

  const handleShuffleQuestions = () => {
    setShuffleQuestion(!shuffleQuestion);
  };

  const handleShuffleAnswers = () => {
    setShuffleAnswers(!shuffleAnswers);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
        backgroundColor: "#f2f2f2",
        paddingTop: 200,
      }}
    >
      <AppBar>
        <Toolbar>
          <Stack direction='row' py={1} spacing={1}>
            <Stack alignItems='flex-start'>
              <Stack
                width='170px'
                direction='row'
                alignItems='center'
                justifyContent='space-between'
              >
                <Typography>Answer Key</Typography>
                <Android12Switch
                  color='secondary'
                  value={showAnswerKey}
                  onChange={() => setShowAnswerKey(!showAnswerKey)}
                />
              </Stack>

              <Stack
                width='170px'
                direction='row'
                alignItems='center'
                justifyContent='space-between'
              >
                <Typography>Checkboxes</Typography>
                <Android12Switch
                  defaultChecked={checkBoxOn}
                  value={checkBoxOn}
                  color='secondary'
                  onChange={() => setCheckBoxOn(!checkBoxOn)}
                />
              </Stack>

              <Stack
                width='170px'
                direction='row'
                alignItems='center'
                justifyContent='space-between'
              >
                <Typography>Answer options</Typography>
                <Android12Switch
                  defaultChecked={optionOn}
                  color='secondary'
                  value={optionOn}
                  onChange={() => setOptionOn(!optionOn)}
                />
              </Stack>
            </Stack>
            <Divider
              flexItem
              orientation='vertical'
              sx={{ bgcolor: "white" }}
            />
            <Stack alignItems='flex-start'>
              <Stack
                width='183px'
                direction='row'
                alignItems='center'
                justifyContent='space-between'
              >
                <Typography>Shufle Questions</Typography>
                <Android12Switch
                  color='secondary'
                  value={shuffleQuestion}
                  onChange={handleShuffleQuestions}
                />
              </Stack>

              <Stack
                width='183px'
                direction='row'
                alignItems='center'
                justifyContent='space-between'
              >
                <Typography>Shuffle Answers</Typography>
                <Android12Switch
                  value={shuffleAnswers}
                  color='secondary'
                  onChange={handleShuffleAnswers}
                />
              </Stack>
            </Stack>
            <Divider
              flexItem
              orientation='vertical'
              sx={{ bgcolor: "white" }}
            />
            <Stack spacing={1} alignItems='flex-start'>
              <Stack
                direction='row'
                alignItems='center'
                justifyContent='space-between'
                width='300px'
              >
                <Typography>Font</Typography>
                <Paper
                  elevation={0}
                  sx={{
                    display: "flex",
                    border: (theme) => `1px solid ${theme.palette.divider}`,
                    flexWrap: "wrap",
                  }}
                >
                  <StyledToggleButtonGroup
                    color='secondary'
                    size='small'
                    exclusive
                    aria-label='text alignment'
                    onChange={(e) => setFont(e.target.value)}
                    value={font}
                  >
                    <ToggleButton value='12px'>S</ToggleButton>
                    <ToggleButton value='16px'>M</ToggleButton>
                    <ToggleButton value='22px'>L</ToggleButton>
                    <ToggleButton value='26px'>XL</ToggleButton>
                  </StyledToggleButtonGroup>
                </Paper>
              </Stack>
              <Stack
                direction='row'
                alignItems='center'
                justifyContent='space-between'
                width='300px'
              >
                <Typography>Question Image</Typography>
                <Paper
                  elevation={0}
                  sx={{
                    display: "flex",
                    border: (theme) => `1px solid ${theme.palette.divider}`,
                    flexWrap: "wrap",
                  }}
                >
                  <StyledToggleButtonGroup
                    color='secondary'
                    onChange={(e) => setQuestionImage(e.target.value)}
                    value={questionImage}
                    size='small'
                    exclusive
                    aria-label='text alignment'
                  >
                    <ToggleButton value='250'>S</ToggleButton>
                    <ToggleButton value='300'>M</ToggleButton>
                    <ToggleButton value='350'>L</ToggleButton>
                    <ToggleButton value='400'>XL</ToggleButton>
                    <ToggleButton value='OFF'>OFF</ToggleButton>
                  </StyledToggleButtonGroup>
                </Paper>
              </Stack>
            </Stack>
          </Stack>
        </Toolbar>
        <Toolbar sx={{ flexGrow: 1 }} />
        <Toolbar>
          <Stack direction='row' spacing={1}>
            <Button
              variant='contained'
              color='inherit'
              sx={{ color: "#000" }}
              startIcon={<Print />}
              onClick={() => handlePrint()}
            >
              Print
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
      {message !== "" && (
        <Alert sx={{ width: "860px", mb: 5 }}>{message}</Alert>
      )}
      <div
        style={{
          backgroundColor: "#fff",
          padding: 30,
          fontSize: font,
          whiteSpace: "break-space",
        }}
      >
        <div
          className='page-break'
          style={{
            width: "860px",
            backgroundColor: "#ffffff",
           
            padding: 20,
            display: "block",
          }}
          ref={componentRef}
        >
          <Stack
            width='98%'
            direction='row'
            justifyContent='space-between'
            alignItems='center'
            border={1}
            p={2}
            mb={4}
          >
            <Stack
              pl={1}
              justifyContent='center'
              width='50%'
              alignItems='flex-start'
            >
              <img
                src={process.env.PUBLIC_URL + "/uploads/logo Cepi.png"}
                alt='inputImage'
                style={{
                  width: 150,
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <Typography fontSize='inherit'>{data.name}</Typography>
              <Typography fontSize='inherit' variant='caption'>
                {data.questions && data.questions.length + " Questions"}
              </Typography>
            </Stack>
            <Stack direction='column' justifyContent='flex-end' spacing={1}>
              <Stack direction='row' spacing={2.3}>
                <Typography fontSize='inherit'>Name:</Typography>{" "}
                <Box width={300} borderBottom={1}></Box>
              </Stack>
              <Stack direction='row' spacing={2.7}>
                <Typography fontSize='inherit'>Class:</Typography>{" "}
                <Box width={300} borderBottom={1}></Box>
              </Stack>
              <Stack direction='row' spacing={3.4}>
                <Typography fontSize='inherit'>Date:</Typography>{" "}
                <Box width={300} borderBottom={1}></Box>
              </Stack>
              <Stack direction='row' spacing={1}>
                <Typography fontSize='inherit'>Subject:</Typography>{" "}
                <Box width={300} borderBottom={1}></Box>
              </Stack>
            </Stack>
          </Stack>
          <div style={{ display: "block", width: "100%", breakInside: "auto" }}>
            {questions &&
              questions.filter((item) => item.type === "Multiple choice")
                .length !== 0 && (
                <Divider sx={{ my: 5, fontWeight: 600 }} textAlign='center'>
                  {"Multiple choice".toLocaleUpperCase()}
                </Divider>
              )}
            {questions &&
              shQuestion
                .filter((item) => item.type === "Multiple choice")
                .map((question, idx) => (
                  <div
                    style={{
                      display: "block",

                      breakAfter: "auto",
                    }}
                    key={question.id}
                  >
                    <QuestionPrintView
                      questionImage={questionImage}
                      checkBoxOn={checkBoxOn}
                      quest={question}
                      number={idx + 1}
                      optionOn={optionOn}
                      shuffleAnswers={shuffleAnswers}
                    />
                  </div>
                ))}
            <div
              style={{
                display: "block",
                breakAfter: "always",
                breakBefore: "always",
              }}
            >
              {questions &&
                questions.filter((item) => item.type === "Open ended")
                  .length !== 0 && (
                  <Divider sx={{ my: 5, fontWeight: 600 }} textAlign='center'>
                    {"Open ended".toLocaleUpperCase()}
                  </Divider>
                )}
              {questions &&
                shQuestion
                  .filter((item) => item.type === "Open ended")
                  .map((question, idx) => (
                    <div
                      style={{
                        display: "block",

                        breakAfter: "always",
                      }}
                      key={question.id}
                    >
                      <QuestionPrintView
                        questionImage={questionImage}
                        checkBoxOn={checkBoxOn}
                        quest={question}
                        number={idx + 1}
                        optionOn={optionOn}
                        shuffleAnswers={shuffleAnswers}
                      />
                    </div>
                  ))}
            </div>

            {questions &&
              questions.filter((item) => item.type === "True or False")
                .length !== 0 && (
                <Divider sx={{ my: 5, fontWeight: 600 }} textAlign='center'>
                  {"True or False".toLocaleUpperCase()}
                </Divider>
              )}
            {questions &&
              shQuestion
                .filter((item) => item.type === "True or False")
                .map((question, idx) => (
                  <div
                    style={{
                      display: "block",

                      breakAfter: "auto",
                    }}
                    key={question.id}
                  >
                    <QuestionPrintView
                      questionImage={questionImage}
                      checkBoxOn={checkBoxOn}
                      quest={question}
                      number={idx + 1}
                      optionOn={optionOn}
                      shuffleAnswers={shuffleAnswers}
                    />
                  </div>
                ))}

            <div style={{ display: "block" }}>
              {questions &&
                questions.filter((item) => item.type === "Match").length !==
                  0 && (
                  <Divider sx={{ my: 5, fontWeight: 600 }} textAlign='center'>
                    {"Match".toLocaleUpperCase()}
                  </Divider>
                )}
              {questions &&
                shQuestion
                  .filter((item) => item.type === "Match")
                  .map((question, idx) => (
                    <div
                      style={{
                        display: "block",

                        breakAfter: "auto",
                      }}
                      key={question.id}
                    >
                      <QuestionPrintView
                        questionImage={questionImage}
                        checkBoxOn={checkBoxOn}
                        quest={question}
                        number={idx + 1}
                        optionOn={optionOn}
                        shuffleAnswers={shuffleAnswers}
                      />
                    </div>
                  ))}
            </div>

            {showAnswerKey && (
              <div
                style={{
                  display: "block",
                  breakBefore: "page",
                  height: "200px",
                  border: "1px solid black",
                }}
              >
                fdfsf
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintPage;

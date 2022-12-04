import React, { useRef, useEffect, useState, Fragment, useMemo } from "react";
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
  FormGroup,
  FormControlLabel,
  Divider,
} from "@mui/material";
import { Print } from "@mui/icons-material";

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

const PrintPage = ({ showNav, setShowNav }) => {
  const [data, setData] = useState({});
  const [message, setMessage] = useState("");
  const [checkBoxOn, setCheckBoxOn] = useState(true);
  const [optionOn, setOptionOn] = useState(true);
  const [shuffleQuestion, setShuffleQuestion] = useState(false);
  const [shuffleAnswers, setShuffleAnswers] = useState(false);
  const [showAnswerKey, setShowAnswerKey] = useState(false);
  const componentRef = useRef();
  const { id } = useParams();

  useEffect(() => {
    if (showNav) {
      setShowNav(false);
    }
  }, [showNav, setShowNav]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/test/${id}`)
      .then((res) => {
        if (res.status === 200) {
          setData(res.data);
          document.title = res.data.name.toUpperCase();
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
        paddingTop: 100,
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
        <Alert sx={{ width: "595.28px", mb: 5 }}>{message}</Alert>
      )}
      <div style={{ backgroundColor: "#fff", padding: 60 }}>
        <div
          style={{
            maxWidth: "595.28px",
            backgroundColor: "#ffffff",
          }}
          ref={componentRef}
        >
          <Stack
            width='100%'
            height={150}
            border={1}
            direction='row'
            spacing={10}
            alignItems='center'
            p={1}
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
                  width: 100,
                  height: "100%",
                  objectFit: "contain",
                }}
              />
              <Typography>{data.name}</Typography>
              <Typography variant='caption'>
                {data.questions && data.questions.length + " Questions"}
              </Typography>
            </Stack>
            <Stack direction='column' justifyContent='flex-end' spacing={1}>
              <Stack direction='row' spacing={2.3}>
                <Typography>Name:</Typography>{" "}
                <Box width={200} borderBottom={1}></Box>
              </Stack>
              <Stack direction='row' spacing={2.7}>
                <Typography>Class:</Typography>{" "}
                <Box width={200} borderBottom={1}></Box>
              </Stack>
              <Stack direction='row' spacing={3.4}>
                <Typography>Date:</Typography>{" "}
                <Box width={200} borderBottom={1}></Box>
              </Stack>
              <Stack direction='row' spacing={1}>
                <Typography>Subject:</Typography>{" "}
                <Box width={200} borderBottom={1}></Box>
              </Stack>
            </Stack>
          </Stack>
          <div style={{ display: "block" }}>
            {questions &&
              shQuestion.map((question, idx) => (
                <div
                  style={{
                    display: "block",

                    breakAfter: "auto",
                  }}
                  key={idx}
                >
                  <QuestionPrintView
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
                breakBefore: "page",
                height: "200px",
                border: "1px solid black",
              }}
            >
              fdfsf
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintPage;

import React, { useRef, useEffect, useState, Fragment } from "react";
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
} from "@mui/material";
import { Print } from "@mui/icons-material";

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
        }
      })
      .catch((err) => console.log(err.message));

    return () => {
      setData({});
    };
  }, [id]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documnetTitle: data.name,
    onAfterPrint: () => setMessage("Print Success"),
  });

  const { questions } = data;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        backgroundColor: "#f2f2f2",
        paddingTop: 100,
      }}
    >
      <AppBar>
        <Toolbar></Toolbar>
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
      <div style={{ backgroundColor: "#fff", padding: 60 }}>
        <Stack
          spacing={3}
          component='div'
          sx={{
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
            spacing={28}
            alignItems='center'
            p={1}
          >
            <Stack justifyContent='center' alignItems='center'>
              <img
                src={process.env.PUBLIC_URL + "/uploads/logo Cepi.png"}
                alt='inputImage'
                style={{
                  width: 100,
                  height: "100%",
                  objectFit: "contain",
                }}
              />
              <Typography variant='h5'>{data.name}</Typography>
              <Typography>
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

          {questions &&
            questions.map((question, idx) => (
              <Fragment key={idx}>
                <QuestionPrintView quest={question} number={idx + 1} />
              </Fragment>
            ))}
        </Stack>
      </div>
    </div>
  );
};

export default PrintPage;

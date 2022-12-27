import React, { useState, useEffect } from "react";
import {
  Paper,
  Box,
  Typography,
  Button,
  Avatar,
  IconButton,
} from "@mui/material";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useParams, useNavigate } from "react-router-dom";
import {
  faImage,
  faGraduationCap,
  faBook,
  faListCheck,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import Grid from "@mui/material/Unstable_Grid2";
import QuestionView from "../components/QuestionView";
import axios from "axios";
import { Stack } from "@mui/system";
import Spinner from "../components/Spinner";
import { Folder, Mode, Print } from "@mui/icons-material";

const intervals = [
  { label: "year", seconds: 31536000 },
  { label: "month", seconds: 2592000 },
  { label: "day", seconds: 86400 },
  { label: "hour", seconds: 3600 },
  { label: "minute", seconds: 60 },
  { label: "second", seconds: 1 },
];

function timeSince(date) {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  const interval = intervals.find((i) => i.seconds < seconds);
  const count = Math.floor(seconds / interval.seconds);
  return `${count} ${interval.label}${count !== 1 ? "s" : ""} ago`;
}

export default function TestWindow({
  setError,
  open,
  test,

  loading,
  setTest,
  showNav,
  setShowNav,
}) {
  const [testData, setTestData] = useState(undefined);
  const [user, setUser] = useState(undefined);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (showNav === false) setShowNav(true);
  }, [showNav, setShowNav]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/test/${id}`)
      .then((res) => {
        if (res.status === 200) {
          setTestData(res.data);
          setUser(res.data.user);
          document.title = res.data.name;
        }
        if (test === null) {
          setTest(res.data);
        }
      })
      .catch((err) => console.log(`Something went wrong ${err}`));
  }, [open, test, setError, id, setTest]);

  const handleEdit = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/v1/test/${id}?isEditing=${true}`
      );
      if (res.status === 200) navigate(`/test/editor/${id}/edit`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Stack
      width='100%'
      height='100%'
      mx={2}
      mt={40}
      direction='row'
      spacing={2}
      justifyContent='center'
    >
      {loading && <Spinner loading={loading} />}
      <Stack
        direction='column'
        ml={{ xs: "10px", lg: "30px" }}
        spacing={2}
        width='70%'
      >
        {testData !== undefined && !loading && (
          <Paper
            elevation={5}
            sx={{
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              padding: 2,
              position: "fixed",
              width: "70%",
              left: { xs: "12%", md: "13.5%", lg: "22%" },
              top: 55,
              zIndex: 10,
            }}
          >
            <Grid container spacing={1}>
              <Grid display='flex' justifyContent='center' xs={3} xl={2}>
                {testData.image === "" ||
                testData.image === undefined ||
                testData.image === null ? (
                  <Box
                    sx={{
                      height: { xs: 100, md: 170 },
                      width: "100%",
                      backgroundColor: "#cccccc",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 5,
                    }}
                  >
                    <FontAwesomeIcon color='#183153' size='3x' icon={faImage} />
                  </Box>
                ) : (
                  <Box
                    sx={{
                      height: { xs: 100, md: 170 },
                      width: "100%",
                      backgroundColor: "#cccccc",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 5,
                      border: 1,
                    }}
                  >
                    <img
                      src={
                        process.env.PUBLIC_URL + "/uploads/" + testData.image
                      }
                      alt='inputImage'
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "15px",
                      }}
                    />
                  </Box>
                )}
              </Grid>
              <Grid xs={9} xl={10}>
                <Grid container spacing={1}>
                  <Grid xs={12}>
                    <Stack
                      direction='row'
                      justifyContent='space-between'
                      spacing={1}
                    >
                      <Typography variant='body1'>Test</Typography>
                      {testData.isEditing && (
                        <Box
                          component='div'
                          width={60}
                          bgcolor='#006460'
                          color='white'
                          display='flex'
                          justifyContent='center'
                          alignItems='center'
                          borderRadius={10}
                          fontSize={14}
                        >
                          Draft
                        </Box>
                      )}
                    </Stack>
                  </Grid>
                  <Grid xs={12}>
                    <Typography
                      variant={{ xs: "h6", md: "h5" }}
                      fontWeight='bold'
                    >
                      {testData.name}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={1}>
                  <Grid xs={6} xl={2}>
                    <Box
                      display='flex'
                      flexDirection='row'
                      alignItems='center'
                      color='#666666'
                    >
                      <FontAwesomeIcon size='xs' icon={faGraduationCap} />
                      <Typography fontSize={{ xs: "12px" }} sx={{ ml: 1 }}>
                        {testData.grade}
                        {testData.garde > 3
                          ? "th Grade"
                          : testData.grade === 1
                          ? "st Grade"
                          : testData.grade === 2
                          ? "nd Grade"
                          : testData.grade === 3
                          ? "rd Grade"
                          : "th Grade"}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid xs={6} xl={2}>
                    <Box
                      display='flex'
                      flexDirection='row'
                      alignItems='center'
                      color='#666666'
                    >
                      <FontAwesomeIcon size='xs' icon={faBook} />
                      {testData.department !== null && (
                        <Typography fontSize={{ xs: "12px" }} sx={{ ml: 1 }}>
                          {testData.department.name}
                        </Typography>
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Stack
              ml={1}
              mt={1}
              direction='row'
              alignItems='center'
              justifyContent='space-between'
            >
              {user !== undefined && (
                <Stack direction='row' alignItems='center'>
                  <Avatar
                    sx={{
                      backgroundColor: "red",
                      mr: 1,
                      width: 30,
                      height: 30,
                      fontSize: 14,
                    }}
                  >
                    {user.firstName.charAt(0)}
                  </Avatar>
                  <Stack
                    direction='row'
                    alignItems='center'
                    justifyContent='center'
                    spacing={1}
                  >
                    <Typography fontSize={{ xs: 10, md: 14 }} variant='body1'>
                      {user.firstName + " " + user.lastName}
                    </Typography>
                    <FontAwesomeIcon fontSize={5} icon={faCircle} />
                    <Typography fontSize={{ xs: 10, md: 12 }} variant='caption'>
                      {timeSince(new Date(testData.createdAt))}
                    </Typography>
                  </Stack>
                </Stack>
              )}
              <Stack
                direction='row'
                alignItems='center'
                spacing={1}
                display={{ xs: "none", md: "flex" }}
              >
                <Button
                  size='small'
                  startIcon={<Print />}
                  variant='contained'
                  color='inherit'
                  onClick={() => window.open(`/print/test/${id}`, "_blank")}
                >
                  Print
                </Button>
                <Button
                  size='small'
                  startIcon={<Mode />}
                  variant='contained'
                  color='inherit'
                  onClick={handleEdit}
                >
                  Edit
                </Button>
                <Button
                  size='small'
                  startIcon={<Folder />}
                  variant='contained'
                  color='inherit'
                >
                  Save
                </Button>
              </Stack>
              <Stack
                direction='row'
                alignItems='center'
                spacing={1}
                display={{ xs: "flex", md: "none" }}
              >
                <IconButton
                  size='small'
                  color='secondary'
                  onClick={() => window.open(`/print/test/${id}`, "_blank")}
                >
                  <Print fontSize='small' />
                </IconButton>
                <IconButton size='small' color='secondary' onClick={handleEdit}>
                  <Mode fontSize='small' />
                </IconButton>
                <IconButton size='small' color='secondary'>
                  <Folder fontSize='small' />
                </IconButton>
              </Stack>
            </Stack>
          </Paper>
        )}
        {testData && (
          <Stack
            direction='row'
            alignItems='center'
            spacing={1}
            mt={200}
            ml={40}
          >
            <FontAwesomeIcon icon={faListCheck} />{" "}
            <Typography>
              {testData.questions.length + " "}{" "}
              {testData.questions.length < 2 ? "question" : "questions"}
            </Typography>
          </Stack>
        )}
        <Stack spacing={3} sx={{ marginTop: 200 }}>
          {" "}
          {testData === undefined || testData.questions.length === 0 ? (
            <Box
              sx={{ height: 200 }}
              display='flex'
              alignItems='center'
              justifyContent='center'
            >
              <Typography variant='h5' textAlign='center'>
                Questions which you prepared will appear here!
              </Typography>
            </Box>
          ) : (
            <Stack spacing={4} mb={3}>
              {testData.questions.map((item, idx) => (
                <QuestionView key={idx} data={item} />
              ))}
            </Stack>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
}

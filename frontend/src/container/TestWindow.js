import React, { useState, useEffect } from "react";
import { Paper, Box, Typography, Button, Avatar } from "@mui/material";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useParams, useNavigate } from "react-router-dom";
import {
  faImage,
  faGraduationCap,
  faBook,
  faListCheck,
} from "@fortawesome/free-solid-svg-icons";
import Grid from "@mui/material/Unstable_Grid2";
import QuestionView from "../components/QuestionView";
import axios from "axios";
import { Stack } from "@mui/system";
import Spinner from "../components/Spinner";
import { Folder, Mode, Print } from "@mui/icons-material";

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
      .get(`http://localhost:5000/api/v1/test/${id || test.id}`)
      .then((res) => {
        if (res.status === 200) {
          setTestData(res.data);
          setUser(res.data.user);
        }
        if (test === null) {
          setTest(res.data);
        }
      })
      .catch((err) => setError(`Something went wrong ${err}`));
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
      mt={8}
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
              borderRadius: 2,
              padding: 2,
              position: "fixed",
              width: "65%",
              left: "23%",
              zIndex: 10,
            }}
          >
            <Grid container spacing={2}>
              <Grid display='flex' justifyContent='center' xs={4} lg={3}>
                {testData.image === "" ||
                testData.image === undefined ||
                testData.image === null ? (
                  <Box
                    sx={{
                      height: 150,
                      width: 150,
                      backgroundColor: "#cccccc",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 5,
                    }}
                  >
                    <FontAwesomeIcon color='#183153' size='5x' icon={faImage} />
                  </Box>
                ) : (
                  <Box
                    sx={{
                      height: 150,
                      width: 150,
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
              <Grid xs={8}>
                <Grid container spacing={1} sx={{ mt: 1 }}>
                  <Grid xs={6}>
                    <Stack direction='row' spacing={1}>
                      <Typography variant='h5'>Test</Typography>
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
                        >
                          Draft
                        </Box>
                      )}
                    </Stack>
                    <Typography variant='h4'>{testData.name}</Typography>
                  </Grid>
                </Grid>
                <Grid container rowSpacing={1} spacing={1} sx={{ mt: 1 }}>
                  <Grid xs={6} md={2}>
                    <Box
                      display='flex'
                      flexDirection='row'
                      alignItems='center'
                      color='#666666'
                    >
                      <FontAwesomeIcon icon={faGraduationCap} />
                      <Typography sx={{ ml: 1 }}>{testData.grade}th</Typography>
                    </Box>
                  </Grid>
                  <Grid xs={6} md={2}>
                    <Box
                      display='flex'
                      flexDirection='row'
                      alignItems='center'
                      color='#666666'
                    >
                      <FontAwesomeIcon icon={faBook} />
                      <Typography sx={{ ml: 1 }}>
                        {testData.department.name}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Stack
              direction='row'
              alignItems='center'
              justifyContent='space-between'
              mt={2}
            >
              {user !== undefined && (
                <Stack direction='row' alignItems='center'>
                  <Avatar sx={{ backgroundColor: "red", mr: 1 }}>
                    {user.firstName.charAt(0)}
                  </Avatar>
                  <Stack
                    direction='column'
                    alignItems='flex-start'
                    justifyContent='center'
                  >
                    <Typography variant='body1'>
                      {user.firstName + " " + user.lastName}
                    </Typography>
                    <Typography variant='caption'>
                      {new Date(testData.createdAt).toUTCString()}
                    </Typography>
                  </Stack>
                </Stack>
              )}
              <Stack direction='row' alignItems='center' spacing={1}>
                <Button
                  variant='contained'
                  color='inherit'
                  startIcon={<Print />}
                  onClick={() => window.open(`/print/test/${id}`, "_blank")}
                >
                  Print
                </Button>

                <Button
                  variant='contained'
                  color='inherit'
                  onClick={handleEdit}
                >
                  <Mode fontSize='small' sx={{ mr: 1 }} /> Edit
                </Button>
                <Button variant='contained' color='inherit'>
                  <Folder fontSize='small' sx={{ mr: 1 }} /> Save
                </Button>
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

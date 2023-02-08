// profile page component
import React from "react";
import {
  Box,
  Typography,
  Stack,
  Avatar,
  Tabs,
  Tab,
  Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

function NavTabs() {
  let [searchParams, setSearchParams] = useSearchParams();
  let queryTab = searchParams.get("section");
  queryTab = queryTab ? queryTab : "collections";

  React.useEffect(() => {
    if (!queryTab) {
      searchParams.set("section", "library");
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams, queryTab]);

  const handleChange = (event, newValue) => {
    searchParams.set("section", newValue);
    setSearchParams(searchParams);
  };
  return (
    <Box
      sx={{
        mx: { xs: 2, md: 5, lg: 10 },
        bgcolor: "rgb(249,249,249)",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        px: 2,
      }}
    >
      <Tabs
        value={queryTab}
        onChange={handleChange}
        aria-label='nav tabs example'
      >
        <Tab label='Library' value='library' />
        <Tab label='Collections' value='collections' />
      </Tabs>
    </Box>
  );
}

const useStyles = makeStyles(() => ({
  root: {
    padding: 20,
    marginTop: 50,
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  paper: {
    width: { xs: "90%", md: "60%" },
    height: 500,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
}));

const Profile = ({ showNav, setShowNav }) => {
  const [tests, setTests] = React.useState([]);
  const [questions, setQuestions] = React.useState([]);
  const user = useSelector((state) => state.user.user.user);
  const classes = useStyles();

  const getTests = async () => {
    const res = await axios.get(
      "https://backend.rustamnortadzhiev.com/api/v1/tests"
    );
    if (res.status === 200) {
      setTests(res.data);
    }
  };

  const getQuestions = async () => {
    const res = await axios.get(
      "https://backend.rustamnortadzhiev.com/api/v1/questions"
    );
    if (res.status === 200) {
      setQuestions(res.data);
    }
  };

  React.useEffect(() => {
    getTests();
    getQuestions();
  }, []);

  React.useEffect(() => {
    if (showNav === false) setShowNav(true);
  }, [showNav, setShowNav]);

  return (
    <Box component='div' className={classes.root}>
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        spacing={3}
        mt={{ xs: 2, md: 5, lg: 10 }}
        mx={{ xs: 2, md: 5, lg: 10 }}
        p={{ xs: 2, md: 3, lg: 5 }}
        bgcolor='#FFF'
        sx={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
      >
        <Stack direction='row' spacing={3}>
          <Box
            width={{ xs: 60, md: 100, xl: 150 }}
            height={{ xs: 60, md: 100, xl: 150 }}
          >
            <Avatar sx={{ height: "100%", width: "100%" }}></Avatar>
          </Box>
          <Stack direction='column' justifyContent='center' spacing={1}>
            <Stack direction='row' spacing={1} alignItems='center'>
              <Typography
                variant={{ xs: "body1", md: "h5", xl: "h4" }}
                fontWeight={{ xs: 400, md: 500, xl: 700 }}
              >
                {user.firstName + " " + user.lastName}
              </Typography>
              <Box
                sx={{
                  bgcolor: "#006064",
                  borderRadius: 5,
                  paddingInline: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#fff",
                  fontWeight: { xs: 200, md: 350, xl: 500 },
                  width: { xs: 50, md: 80 },
                  height: 25,
                }}
              >
                <Typography
                  variant='caption'
                  fontSize={{ xs: 10, md: 16 }}
                  color='white'
                >
                  {user.role}
                </Typography>
              </Box>
            </Stack>
            <Typography variant='h5'>{user.email}</Typography>
            <Typography>{user.department.name}</Typography>
          </Stack>
        </Stack>
        <Stack spacing={1}>
          <Button
            color='inherit'
            variant='outlined'
            size='small'
            startIcon={<FontAwesomeIcon icon={faPenToSquare} />}
          >
            Edit Profile
          </Button>
          <Stack
            direction='row'
            spacing={3}
            justifyContent='center'
            alignItems='center'
          >
            <Stack spacing={1} justifyContent='center' alignItems='center'>
              <Typography
                variant={{ xs: "caption", md: "body1", lg: "h6" }}
                fontWeight={{ xs: 350, md: 500, lg: 700 }}
              >
                {tests !== [] &&
                  tests.filter((item) => item.userId === user.id).length}
              </Typography>
              <Typography>Tests</Typography>
            </Stack>
            <Stack spacing={1} justifyContent='center' alignItems='center'>
              <Typography
                variant={{ xs: "caption", md: "body1", lg: "h6" }}
                fontWeight={{ xs: 350, md: 500, lg: 700 }}
              >
                {questions !== [] &&
                  questions.filter((item) => item.userId === user.id).length}
              </Typography>
              <Typography>Questions</Typography>
            </Stack>
            <Stack spacing={1} justifyContent='center' alignItems='center'>
              <Typography
                variant={{ xs: "caption", md: "body1", lg: "h6" }}
                fontWeight={{ xs: 350, md: 500, lg: 700 }}
              >
                0
              </Typography>
              <Typography>Collections</Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <NavTabs />
    </Box>
  );
};

export default Profile;

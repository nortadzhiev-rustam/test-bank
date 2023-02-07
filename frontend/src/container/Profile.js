// profile page component
import React from "react";
import {
  Paper,
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
import { Edit } from "@mui/icons-material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

function LinkTab(props) {
  return (
    <Tab
      component='a'
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

function NavTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        mr: 10,
        ml: 10,
        bgcolor: "rgb(249,249,249)",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        px: 2,
      }}
    >
      <Tabs value={value} onChange={handleChange} aria-label='nav tabs example'>
        <LinkTab label='Library' href='/drafts' />
        <LinkTab label='Collections' href='/trash' />
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
    return () => {
      setShowNav();
    };
  }, [showNav, setShowNav]);

  return (
    <Box component='div' className={classes.root}>
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        spacing={3}
        mt={10}
        mx={10}
        p={5}
        bgcolor='#FFF'
        sx={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
      >
        <Stack direction='row' spacing={3}>
          <Box width={150} height={150}>
            <Avatar sx={{ height: "100%", width: "100%" }}></Avatar>
          </Box>
          <Stack direction='column' justifyContent='center' spacing={1}>
            <Stack direction='row' spacing={1}>
              <Typography variant='h4' fontWeight={700}>
                {user.firstName + " " + user.lastName}
              </Typography>
              <Box
                sx={{
                  bgcolor: "#006064",
                  borderRadius: 5,
                  paddingInline: 2,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#fff",
                  fontWeight: 500,
                }}
              >
                {user.role}
              </Box>
            </Stack>
            <Typography variant='h5'>{user.email}</Typography>
            <Typography>{user.department.name}</Typography>
          </Stack>
        </Stack>
        <Stack spacing={2}>
          <Button
            color='inherit'
            variant='outlined'
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
            <Stack spacing={2} justifyContent='center' alignItems='center'>
              <Typography variant='h6' fontWeight={700}>
                {tests !== [] &&
                  tests.filter((item) => item.userId === user.id).length}
              </Typography>
              <Typography>Tests</Typography>
            </Stack>
            <Stack spacing={2} justifyContent='center' alignItems='center'>
              <Typography variant='h6' fontWeight={700}>
                {questions !== [] &&
                  questions.filter((item) => item.userId === user.id).length}
              </Typography>
              <Typography>Questions</Typography>
            </Stack>
            <Stack spacing={2} justifyContent='center' alignItems='center'>
              <Typography variant='h6' fontWeight={700}>
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

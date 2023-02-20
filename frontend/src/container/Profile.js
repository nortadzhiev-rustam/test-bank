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
  Dialog,
  FormControl,
  Radio,
  FormControlLabel,
  DialogActions,
  FormLabel,
  RadioGroup,
  Slide,
  DialogTitle,
  DialogContent,
  TextField,
} from "@mui/material";
import { CreateNewFolder } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faFolder } from "@fortawesome/free-solid-svg-icons";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import TestView from "../components/TestView";
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const Profile = ({ showNav, setShowNav }) => {
  const [tests, setTests] = React.useState([]);
  const [questions, setQuestions] = React.useState([]);
  const [collections, setCollections] = React.useState([]);
  const [isOpen, setOpen] = React.useState(false);
  const [visibility, setVisibility] = React.useState("Public");
  const [collectionName, setCollectionName] = React.useState("");
  const [isActive, setActive] = React.useState(true);
  const [selected, setSelected] = React.useState(0);
  const handleChange = (event) => {
    setVisibility(event.target.value);
  };

  React.useEffect(() => {
    axios
      .get("https://www.backend.rustamnortadzhiev.com/api/v1/collections")
      .then((res) => {
        setCollections(res.data);
      });
  }, []);

  const handleDialogOpen = () => {
    setOpen(!isOpen);
    setCollectionName("");
  };

  const user = useSelector((state) => state.user.user.user);
  const classes = useStyles();
  let [searchParams, setSearchParams] = useSearchParams();
  let search = searchParams.get("section");
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

  const handleSubmit = async () => {
    const data = {
      name: collectionName,
      visibility,
      userId: user.id,
    };
    try {
      const res = await axios.post(
        `https://www.backend.rustamnortadzhiev.com/api/v1/collection`,
        data
      );
      setCollections((prevState) => [...prevState, res.data.collection]);
      handleDialogOpen();
    } catch (e) {
      console.log(e);
    }
  };
  React.useEffect(() => {
    getTests();
    getQuestions();
  }, []);

  React.useEffect(() => {
    if (showNav === false) setShowNav(true);
  }, [showNav, setShowNav]);

  const handleSelect = (id) => {
    setActive(true);
    setSelected(id);
  };

  return (
    <Box component='div' className={classes.root}>
      <Dialog
        maxWidth='sm'
        fullWidth
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleDialogOpen}
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle>{"Create a new Collection"}</DialogTitle>
        <DialogContent>
          <Stack spacing={1}>
            <TextField
              sx={{ margin: 1 }}
              value={collectionName}
              onChange={(e) => setCollectionName(e.target.value)}
              variant='outlined'
              label='Enter collection name'
              placeholder='e.g Exams, Physics, Quiz, etc.'
            />
            <FormControl>
              <FormLabel id='demo-controlled-radio-buttons-group'>
                Visibility
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby='demo-controlled-radio-buttons-group'
                name='controlled-radio-buttons-group'
                value={visibility}
                onChange={handleChange}
              >
                <FormControlLabel
                  value='Private'
                  control={<Radio />}
                  label='Private'
                />
                <FormControlLabel
                  value='Public'
                  control={<Radio />}
                  label='Public'
                />
              </RadioGroup>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' color='error' onClick={handleDialogOpen}>
            {"Cancel"}
          </Button>
          <Button
            variant='contained'
            onClick={handleSubmit}
            disabled={collectionName === ""}
          >
            {"Create"}
          </Button>
        </DialogActions>
      </Dialog>
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
            <Typography>Department: {user.department.name}</Typography>
          </Stack>
        </Stack>
        <Stack spacing={2}>
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
                {collections.filter((item) => item.userId === user.id).length}
              </Typography>
              <Typography>
                {collections.filter((item) => item.userId === user.id)
                  .length === 1
                  ? "Collection"
                  : "Collections"}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <NavTabs />

      <Grid2 container>
        {search === "library" && (
          <Grid2 xs={8}>
            <Stack
              width='100%'
              height='100%'
              spacing={2}
              ml={{ xs: 0, md: "70px" }}
              mt={10}
              justifyContent='flex-start'
            >
              {tests
                .filter((item) => item.userId === user.id)
                .map((data, idx) => (
                  <TestView
                    key={idx}
                    testData={data}
                    user={data.user}
                    isProfile={true}
                  />
                ))}
            </Stack>
          </Grid2>
        )}
        {search === "collections" && (
          <Grid2 xs={12} xl={2.5} mt={10} xsOffset={1}>
            <Stack
              spacing={2}
              maxWidth={{ xs: "100%", sm: "40%", md: "30%", xl: "100%" }}
            >
              <Stack
                direction='row'
                justifyContent='space-between'
                alignItems='center'
                width='100%'
                display={{ xs: "none", xl: "flex" }}
              >
                <Typography color='dimgray'>My Collections</Typography>
                <Button
                  startIcon={<CreateNewFolder />}
                  color='success'
                  size='small'
                  variant='outlined'
                  onClick={handleDialogOpen}
                >
                  New
                </Button>
              </Stack>

              <Stack
                spacing={2}
                direction={{ xs: "column", xl: "column-reverse" }}
              >
                <Stack direction={{ xs: "row", xl: "column" }} spacing={1}>
                  {collections
                    .filter((item) => item.userId === user.id)
                    .map((collection, idx) => (
                      <Stack
                        sx={{
                          "&:hover": {
                            boxShadow: 2,
                            bgcolor: "white",
                          },
                          cursor: "pointer",
                          boxShadow: isActive && selected === idx ? 2 : 0,
                          bgcolor:
                            isActive && selected === idx ? "white" : "none",
                        }}
                        key={collection.name}
                        spacing={1}
                        alignItems='center'
                        direction='row'
                        color='#6c757d'
                        p={0.5}
                        px={1}
                        borderRadius={1}
                        width='100%'
                        justifyContent='space-between'
                        onClick={() => handleSelect(idx)}
                      >
                        <Stack direction='row' spacing={1} alignItems='center'>
                          <FontAwesomeIcon icon={faFolder} />

                          <Typography>{collection.name}</Typography>
                        </Stack>
                        <Typography textAlign='right'>
                          {collection.Tests.length}
                        </Typography>
                      </Stack>
                    ))}
                </Stack>
                <Button
                  startIcon={<CreateNewFolder />}
                  color='inherit'
                  size='small'
                  variant='contained'
                  onClick={handleDialogOpen}
                  fullWidth
                  sx={{ display: { xs: "flex", xl: "none" } }}
                >
                  Collections
                </Button>
              </Stack>
            </Stack>
          </Grid2>
        )}
      </Grid2>
    </Box>
  );
};

export default Profile;

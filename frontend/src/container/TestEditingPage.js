import React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import {
  InputBase,
  InputAdornment,
  Button,
  Stack,
  Typography,
  alpha,
  IconButton,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  Alert,
  AlertTitle,
} from "@mui/material";
import Slide from "@mui/material/Slide";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import logo from "../logo.svg";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  DriveFolderUpload,
  Mode,
  Settings,
  Wallpaper,
  CheckBoxOutlined,
  Layers,
  Flaky,
  Subject,
  FormatListBulleted,
} from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import TesteditDialog from "../components/TesteditDialog";
import InsertPanel from "../components/InsertPanel";
import TestInsertWindow from "./TestInsertWindow";
import QuestionView from "../components/QuestionView";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderRadius: "0px 0 10px 10px",
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

const Search = styled(Paper)(({ theme }) => ({
  position: "relative",
  height: 50,

  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 5,
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#006064",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const types = [
  { type: "Multiple-choice", icon: <CheckBoxOutlined fontSize='inherit' /> },
  { type: "True or False", icon: <Flaky fontSize='inherit' /> },
  { type: "Open ended", icon: <Subject fontSize='inherit' /> },
  { type: "Match", icon: <Layers fontSize='inherit' /> },
];

export default function TestEditingPage({ setShowNav, showNav }) {
  const [testData, setTestData] = React.useState([]);
  const [name, setName] = React.useState("");
  const [search, setSearch] = React.useState("");
  const [grade, setGrade] = React.useState("");
  const [department, setDepartment] = React.useState("");
  const [questions, setQuestions] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [openSettings, setOpenSettings] = React.useState(false);
  const [isEditing, setEditing] = React.useState(false);
  const [image, setImage] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [questionType, setQuestionType] = React.useState("");
  const [question, setQuestion] = React.useState({});
  const history = useNavigate();
  const [error, setError] = React.useState("");
  const [openEditor, setOpenEditor] = React.useState(false);
  const { id } = useParams();

  const handleDelete = async (questionId) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/v1/question/${questionId}`
      );
      setMessage(res.data.message);
      const newArray = questions
        .filter((item) => item.id !== questionId)
        .map((item) => item);
      setQuestions(newArray);
    } catch (err) {
      setError(err);
    }
  };

  const handleEdit = (questionId) => {
    questions
      .filter((item) => item.id === questionId)
      .map((item) => setQuestion(item));
  };

  React.useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/test/${id}`)
      .then((res) => {
        if (res.status === 200) {
          setName(res.data.name);
          setSearch(res.data.name);
          setGrade(res.data.grade);
          setDepartment(res.data.department);
          setQuestions(res.data.questions);
          setImage(res.data.image);
        }
      })
      .catch((err) => console.log(`Something went wrong ${err}`));
  }, [id, isEditing, openEditor, open]);

  React.useEffect(() => {
    if (showNav) {
      setShowNav(false);
    }
  }, [showNav, setShowNav]);

  const handleDialogOpen = () => {
    setOpenSettings(!openSettings);
    setEditing(true);
  };

  const handleEditorOpen = (type) => {
    setOpenEditor(true);
    setQuestionType(type);
  };

  React.useEffect(() => {
    setTimeout(() => {
      setMessage("");
    }, 1000);
  }, [message]);

  return (
    <Box
      sx={{
        flexGrow: 1,
        width: "100%",
        mt: 8,
        justifyContent: "center",
        alignItem: "center",
        backroundColor: "#f2f2f2",
       
      }}
    >
      {message !== "" && (
        <Alert
          sx={{  width: "92%" }}
          severity='success'
        >
          <AlertTitle>Success</AlertTitle>
          {message}
        </Alert>
      )}
      <TesteditDialog
        onClose={setOpen}
        open={open}
        setImageName={setImage}
        imageName={image}
        setEditing={setEditing}
        grade={grade}
        keepMounted
      />

      <Dialog
        maxWidth='xs'
        open={openSettings}
        TransitionComponent={Transition}
        keepMounted={true}
        onClose={handleDialogOpen}
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle>{"Create a Test"}</DialogTitle>
        <DialogContent>
          <InsertPanel
            isEditing={isEditing}
            setEditing={setEditing}
            department={department}
            name={name}
            setOpen={setOpenSettings}
          />
        </DialogContent>
      </Dialog>
      <AppBar>
        <Toolbar>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              cursor: "pointer",
            }}
            onClick={() => history("/")}
          >
            <img src={logo} width='30' height='30' alt='logo' />
            <Typography
              sx={{ marginLeft: 2 }}
              variant='h6'
              noWrap
              component='div'
              color='white'
            >
              Test Generator
            </Typography>
          </div>
        </Toolbar>
        <Toolbar sx={{ flexGrow: 1 }} />
        <Toolbar>
          <Stack direction='row' spacing={1}>
            <Button
              sx={{
                backgroundColor: "rgba(255,255,255, 0.2)",
                "&:hover": { backgroundColor: "rgba(255,255,255, 0.3)" },
              }}
              size='small'
              variant='contained'
              onClick={() => setOpen(true)}
            >
              <Settings sx={{ mr: 1 }} fontSize='small' /> Settings
            </Button>
            <Button
              variant='contained'
              size='small'
              sx={{
                width: 120,
                backgroundColor: "#ffffff",
                color: "#333333",
                "&:hover": { backgroundColor: "#e7e7e7" },
              }}
            >
              <DriveFolderUpload sx={{ mr: 1 }} fontSize='small' /> Save
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
      {openEditor ? (
        <TestInsertWindow
          setOpenTest={setOpenEditor}
          questionData={testData}
          setData={setTestData}
          setMessage={setMessage}
          test={department}
          grade={grade}
          type={questionType}
          setError={setError}
        />
      ) : (
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          bgcolor='#f2f2f2'
          minHeight={{ xs: "92vh", md: "100vh" }}
        >
          <Grid
            xs={12}
            md={6}
            mdOffset={1}
            lgOffset={2}
            sx={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Item
              elevation={5}
              sx={{
                position: "fixed",
                width: { xs: "90%", md: "46%" },
                zIndex: 10,
              }}
            >
              <Stack direction='row' alignItems='center' spacing={2}>
                <Stack
                  direction='column'
                  justifyContent='center'
                  alignItems='flex-start'
                  width='100%'
                  spacing={1}
                >
                  <Typography fontWeight='bold'>
                    Teleport questions from test library
                  </Typography>
                  <Search elevation={5}>
                    <StyledInputBase
                      fullWidth
                      sx={{ fontSize: "1rem", pr: 1 }}
                      placeholder='Search for test on any topic'
                      inputProps={{ "aria-label": "search" }}
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      endAdornment={
                        <InputAdornment position='end'>
                          <Button variant='contained' size='medium'>
                            Search
                          </Button>
                        </InputAdornment>
                      }
                      startAdornment={
                        <InputAdornment position='start'>
                          <SearchIconWrapper>
                            <SearchIcon fontSize='large' />
                          </SearchIconWrapper>
                        </InputAdornment>
                      }
                    />
                  </Search>
                </Stack>
                {questions.length !== 0 ? (
                  <Stack
                    justifyContent='center'
                    alignItems='flex-start'
                    width={250}
                    spacing={1}
                  >
                    <Typography fontWeight='bold'>Create test</Typography>
                    <Button
                      size='small'
                      variant='contained'
                      sx={{
                        width: { xs: "150px", lg: "250px" },
                        height: 48,
                        alignItems: "center",
                      }}
                    >
                      <AddCircleOutline sx={{ mr: 2 }} />
                      Create
                    </Button>
                  </Stack>
                ) : null}
              </Stack>
            </Item>

            {questions.length === 0 ? (
              <Stack
                sx={{ mt: 20, width: "92%", height: 300 }}
                direction='column'
                alignItems='center'
                spacing={2}
              >
                <Typography>or, Create a new question</Typography>
                <Item sx={{ width: "100%", borderRadius: 3, mb: 400 }}>
                  <Grid container spacing={0.5}>
                    <Grid xs={12} md={6}>
                      <Typography mb={2} textAlign='left'>
                        Assessment
                      </Typography>
                      <Stack
                        direction='row'
                        flexWrap='wrap'
                        justifyContent='flex-start'
                      >
                        {types.map((item, idx) => (
                          <Stack
                            key={idx}
                            direction='row'
                            justifyContent='flex-start'
                            spacing={1}
                            alignItems='center'
                            p={1}
                            borderRadius={2}
                            width='129px'
                            sx={{
                              "&:hover": { backgroundColor: "#f2f2f2" },
                              cursor: "pointer",
                            }}
                            onClick={() => handleEditorOpen(item.type)}
                          >
                            <Box
                              width={30}
                              height={30}
                              borderRadius={2}
                              bgcolor='#006064'
                              alignItems='center'
                              display='flex'
                              justifyContent='center'
                              color='#ffffff'
                            >
                              {item.icon}
                            </Box>
                            <Typography fontSize='small'>
                              {item.type}
                            </Typography>
                          </Stack>
                        ))}
                      </Stack>
                    </Grid>
                    <Grid xs={1}>
                      <Divider orientation='vertical' />
                    </Grid>
                    <Grid xs={12} md={4.5}>
                      <Box width='100%'></Box>
                    </Grid>
                  </Grid>
                </Item>
              </Stack>
            ) : (
              <Stack
                direction='column'
                spacing={3}
                width='95%'
                mt={20}
                zIndex={1}
              >
                <Stack direction='row' spacing={1}>
                  <FormatListBulleted />
                  <Typography>
                    {`${questions.length} ${
                      questions.length < 2 ? " question" : " questions"
                    }`}
                  </Typography>
                </Stack>
                <Stack direction='column' spacing={1} alignItems='center'>
                  {questions.map((question, idx) => (
                    <QuestionView
                      key={idx}
                      data={question}
                      isEditing={true}
                      index={idx + 1}
                      handleDelete={handleDelete}
                      handleEdit={handleEdit}
                    />
                  ))}
                </Stack>
                <Stack direction='row' justifyContent='center' spacing={2}>
                  {types.map((type, idx) => (
                    <Box
                      key={idx}
                      width={50}
                      height={50}
                      borderRadius={2}
                      bgcolor='#006064'
                      alignItems='center'
                      display='flex'
                      justifyContent='center'
                      color='#ffffff'
                      fontSize={30}
                      onClick={() => handleEditorOpen(type.type)}
                      boxShadow={10}
                      sx={{ cursor: "pointer" }}
                    >
                      {type.icon}
                    </Box>
                  ))}
                </Stack>
              </Stack>
            )}
          </Grid>
          <Grid
            xs={10}
            md={4}
            lg={3}
            xl={2.4}
            sx={{
              position: { xs: "static", md: "fixed" },
              top: "72px",
              right: { md: "70px", lg: "120px", xl: "150px" },
            }}
          >
            <Item
              elevation={0}
              sx={{
                mt: 5,
                border: "1px solid #cccccc",
                borderRadius: 3,
                backgroundColor: "transparent",
              }}
            >
              <Stack direction='column' spacing={1} p={1}>
                {image === "" || image === null || image === undefined ? (
                  <Stack
                    borderRadius={2}
                    width='100%'
                    height={150}
                    direction='column'
                    justifyContent='center'
                    alignItems='center'
                    spacing={2}
                    border='1px solid #cccccc'
                    onClick={() => setOpen(true)}
                    sx={{ cursor: "pointer" }}
                  >
                    <Box
                      width={70}
                      height={70}
                      borderRadius='50%'
                      bgcolor='#006064'
                      display='flex'
                      justifyContent='center'
                      alignItems='center'
                      color='white'
                    >
                      <Wallpaper color='inherit' fontSize='large' />
                    </Box>
                    <Typography fontSize='small'>
                      Click here to upload a test image!
                    </Typography>
                  </Stack>
                ) : (
                  <Box
                    maxWidth='100%'
                    height={220}
                    component='div'
                    sx={{
                      border: "1px",
                      borderStyle: "dashed",
                      borderColor: "#888",
                      borderRadius: 2,
                      position: "relative",
                      backgroundColor: "white",
                      display: "flex",
                      alignItems: "center",
                      color: "white",
                    }}
                  >
                    <IconButton
                      sx={{ position: "absolute", top: -5, right: -8 }}
                      onClick={() => setOpen(true)}
                    >
                      <DeleteIcon color='inherit' fontSize='small' />
                    </IconButton>

                    <img
                      src={process.env.PUBLIC_URL + "/uploads/" + image}
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
                <Stack
                  direction='row'
                  justifyContent='space-between'
                  alignItems='center'
                >
                  <Typography>{name}</Typography>
                  <IconButton onClick={handleDialogOpen}>
                    <Mode fontSize='small' />
                  </IconButton>
                </Stack>
                <Divider />
                <Stack direction='row' justifyContent='space-between' mt={5}>
                  <Typography>{grade ? grade + "th Grades" : ""}</Typography>
                  <IconButton onClick={() => setOpen(true)}>
                    <Mode fontSize='small' />
                  </IconButton>
                </Stack>
                <Stack direction='row' justifyContent='space-between'>
                  <Typography>{department.name}</Typography>
                  <IconButton onClick={handleDialogOpen}>
                    <Mode fontSize='small' />
                  </IconButton>
                </Stack>
              </Stack>
            </Item>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}

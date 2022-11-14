import React, { useState, useEffect } from "react";
import { Paper, Box, Typography, Button, Avatar } from "@mui/material";
import { styled } from "@mui/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { setFull, setVisible } from "../store/questionTypeSlice";
import { useParams, useNavigate } from "react-router-dom";
import {
  faCircle,
  faMinus,
  faTimes,
  faUpRightAndDownLeftFromCenter,
  faDownLeftAndUpRightToCenter,
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
const StyledBox = styled(Box)({
  display: "flex",
  position: "relative",
  margin: 0,
  padding: 0,
});

const FormPaper = styled(Paper)({
  width: "100%",
  height: 70,
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

export default function TestWindow({
  setError,
  open,
  setOpenTest,
  test,
  setLoading,
  loading,
}) {
  const [mouseIn, setMouseIn] = useState(false);
  const [isHover, setHover] = useState(false);
  const [testData, setTestData] = useState(undefined);
  const [user, setUser] = useState(undefined);
  const dispatch = useDispatch();
  const isFull = useSelector((state) => state.questionsType.isFull);
  const navigate = useNavigate();
  const handleFullScreen = () => {
    dispatch(setFull(!isFull));
  };

  const handleClose = () => {
    dispatch(setVisible(false));
    setMouseIn(false);
    dispatch(setFull(false));
    navigate("/test/create");
    setOpenTest(false);
  };
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/test/${id || test.id}`)
      .then((res) => {
        if (res.status === 200) {
          setTestData(res.data);
          setUser(res.data.user);
        }
      })
      .catch((err) => setError(`Something went wrong ${err}`));
  }, [open, test, setError, id]);

  return (
    <Paper
      elevation={isHover ? 10 : 2}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      sx={{
        borderRadius: 3,
        transition: "all 0.3s ease-in-out",
        width: "100%",
        paddingBottom: 5,
        minHeight: 700,
      }}
      className='animate__animated animate__fadeInUp animate__faster'
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
                    borderRadius: "30%",
                  }}
                  color='#fff'
                />
              </CloseButton>
            ) : (
              <FontAwesomeIcon size='lg' color='#e63946' icon={faCircle} />
            )}

            {mouseIn ? (
              <MinusButton>
                <FontAwesomeIcon
                  icon={faMinus}
                  size='sm'
                  style={{
                    borderRadius: "30%",
                  }}
                  color='#fff'
                />
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
        </FormPaper>
      </StyledBox>
      {loading && <Spinner loading={loading} />}
      {testData !== undefined && (
        <Paper
          elevation={5}
          style={{ height: 200, margin: 25, borderRadius: 5, padding: 20 }}
        >
          <Grid container spacing={2}>
            <Grid xs={6} md={2.5} xl={2}>
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
            </Grid>
            <Grid xs={6} md={9.5} xl={10}>
              <Grid container spacing={1} sx={{ mt: 1 }}>
                <Grid xs={6}>
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
              <Button variant='contained' color='success'>
                Edit
              </Button>
              <Button variant='contained' color='success'>
                Save
              </Button>
            </Stack>
          </Stack>
        </Paper>
      )}
      {testData && (
        <Stack direction='row' alignItems='center' spacing={1} ml={5}>
          <FontAwesomeIcon icon={faListCheck} />{" "}
          <Typography>{testData.questions.length + " "} questions</Typography>
        </Stack>
      )}
      {testData === undefined || testData.questions.length === 0 ? (
        <Box
          sx={{ height: 600 }}
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          <Typography variant='h5' textAlign='center'>
            Questions which you prepared will appear here!
          </Typography>
        </Box>
      ) : (
        <Box>
          {testData.questions.map((item, idx) => (
            <QuestionView key={idx} data={item} />
          ))}
        </Box>
      )}
    </Paper>
  );
}

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

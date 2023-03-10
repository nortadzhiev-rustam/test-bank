import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import {
  Paper,
  Box,
  Stack,
  Typography,
  Avatar,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slide,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormControl,
  TextField,
  Divider,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faBook,
  faGraduationCap,
  faListCheck,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import {
  Delete,
  Folder,
  FolderOutlined,
  Visibility,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const TestView = ({
  testData,
  user,
  handleDelete,
  isProfile,
  collections,
  setCollections,
}) => {
  const navigate = useNavigate();
  const [isOpen, setOpen] = React.useState(false);
  const [collectionId, setCollectionId] = React.useState(null);
  const [newCollection, setNewCollection] = React.useState("");
  const handleSaveDialogOpen = () => {
    setOpen(!isOpen);
  };

  const handleDone = async () => {
    const data = {
      name: newCollection,

      userId: user.id,
    };
    if (newCollection !== "") {
      try {
        const res = await axios.post(
          `https://backend.rustamnortadzhiev.com/api/v1/collection`,
          data
        );
        const res2 = await axios.put(
          `https://backend.rustamnortadzhiev.com/api/v1/test/${testData.id}?collectionId=${res.data.collection.id}`
        );
        console.log(res2.data.message);
        handleSaveDialogOpen();
      } catch (e) {
        console.log(e);
      }
    } else {
      handleSaveDialogOpen();
    }
  };

  const handleChange = async (event) => {
    setCollectionId(Number(event.target.value));
    try {
      const res = await axios.put(
        `https://backend.rustamnortadzhiev.com/api/v1/test/${
          testData.id
        }?collectionId=${Number(event.target.value)}`
      );
      console.log(res.data.message);
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    setCollectionId(testData.collectionId);
    return () => {
      setCollectionId(0);
    };
  }, [testData.collectionId]);

  return (
    <>
      <Dialog
        maxWidth='xs'
        fullWidth
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleSaveDialogOpen}
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle>Add "{testData.name}" to collection</DialogTitle>
        <DialogContent>
          <FormControl>
            <RadioGroup value={collectionId} onChange={handleChange}>
              {collections
                .filter((item) => item.userId === user.id)
                .map((item) => (
                  <FormControlLabel
                    key={item.name}
                    value={item.id}
                    control={<Radio />}
                    label={item.name}
                  />
                ))}
            </RadioGroup>
          </FormControl>
          <Divider variant='fullWidth' sx={{ mt: 5, mb: 3 }} />
          <Typography>Create a new collection</Typography>
          <TextField
            fullWidth
            label='Input a collection name'
            placeholder='e.g Exams, Physics, Quiz, etc.'
            onChange={(e) => setNewCollection(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant='contained'
            color='error'
            onClick={() => handleSaveDialogOpen()}
          >
            {"Cancel"}
          </Button>
          <Button variant='contained' onClick={() => handleDone()}>
            {"Done"}
          </Button>
        </DialogActions>
      </Dialog>
      <Paper
        sx={{
          borderRadius: 1,
          padding: 1,
          width: "100%",
        }}
      >
        <Grid width='100%' container spacing={1}>
          <Grid display='flex' justifyContent='center' xs={2}>
            {testData.image === "" ||
            testData.image === undefined ||
            testData.image === null ? (
              <Box
                sx={{
                  height: { xs: 100, md: 100 },
                  width: "100%",
                  backgroundColor: "#cccccc",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 1,
                }}
              >
                <FontAwesomeIcon color='#183153' size='2x' icon={faImage} />
              </Box>
            ) : (
              <Box
                sx={{
                  height: { xs: 100, md: 130 },
                  width: "100%",
                  backgroundColor: "#cccccc",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 1,
                }}
              >
                <img
                  src={process.env.PUBLIC_URL + "/uploads/" + testData.image}
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
          <Grid xs={10} xl={10}>
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
                <Typography variant={{ xs: "h6", md: "h5" }} fontWeight='bold'>
                  {testData.name}
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid xs={4} lg={3}>
                <Box
                  display='flex'
                  flexDirection='row'
                  alignItems='center'
                  color='#666666'
                >
                  <FontAwesomeIcon size='xs' icon={faListCheck} />
                  {testData.questions ? (
                    <Typography fontSize={{ xs: "12px" }} sx={{ ml: 1 }}>
                      {testData.questions.length}
                      {testData.questions.length > 2
                        ? " questions"
                        : " question"}
                    </Typography>
                  ) : (
                    <Typography fontSize={{ xs: "12px" }} sx={{ ml: 1 }}>
                      0 question
                    </Typography>
                  )}
                </Box>
              </Grid>
              <Grid xs={4} lg={3}>
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
              <Grid xs={4} lg={3}>
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
          mt={isProfile ? 1 : 0}
          ml={1}
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
            {!isProfile && (
              <Button
                size='small'
                startIcon={<Delete />}
                variant='contained'
                color='error'
                onClick={() => handleDelete(testData.id)}
              >
                delete
              </Button>
            )}
            {!isProfile && (
              <Button
                size='small'
                startIcon={<Visibility />}
                variant='contained'
                color='info'
                onClick={() =>
                  navigate(`/admin/test/${testData.id}/${testData.name}`)
                }
              >
                View
              </Button>
            )}
            <Button
              size='small'
              startIcon={
                testData.collectionId === null ? <FolderOutlined /> : <Folder />
              }
              variant={isProfile ? "outlined" : "contained"}
              color={
                isProfile
                  ? testData.collectionId !== null
                    ? "success"
                    : "warning"
                  : "secondary"
              }
              onClick={handleSaveDialogOpen}
            >
              {testData.collectionId === null ? "Save" : "Saved"}
            </Button>
          </Stack>
          <Stack
            direction='row'
            alignItems='center'
            spacing={1}
            display={{ xs: "flex", md: "none" }}
          >
            {!isProfile && (
              <IconButton
                size='small'
                color='secondary'
                onClick={() => handleDelete(testData.id)}
              >
                <Delete fontSize='small' />
              </IconButton>
            )}
            {!isProfile && (
              <IconButton
                size='small'
                color='secondary'
                onClick={() =>
                  navigate(`/admin/test/${testData.id}/${testData.name}`)
                }
              >
                <Visibility fontSize='small' />
              </IconButton>
            )}
            {!isProfile && (
              <IconButton
                size='small'
                color='secondary'
                onClick={handleSaveDialogOpen}
              >
                {testData.collectionId === null ? (
                  <FolderOutlined fontSize='small' />
                ) : (
                  <Folder fontSize='small' />
                )}
              </IconButton>
            )}
            {isProfile && (
              <Button
                size='small'
                startIcon={
                  testData.collectionId === null ? (
                    <FolderOutlined />
                  ) : (
                    <Folder />
                  )
                }
                variant={isProfile ? "outlined" : "contained"}
                color={isProfile ? "success" : "inherit"}
                onClick={handleSaveDialogOpen}
              >
                {testData.collectionId === null ? "Save" : "Saved"}
              </Button>
            )}
          </Stack>
        </Stack>
      </Paper>
    </>
  );
};
export default TestView;

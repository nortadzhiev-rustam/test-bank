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
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faBook,
  faGraduationCap,
  faListCheck,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Delete, Folder, Mode } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";

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

const TestView = ({ testData, user, handleDelete }) => {
  const navigate = useNavigate();

  return (
    <Paper
      sx={{
        borderRadius: 1,
        padding: 1,

        "&:hover": { bgcolor: "#f2f2f2" },
        cursor: "pointer",
      }}
    >
      <Grid container spacing={1}>
        <Grid display='flex' justifyContent='center' xs={3} xl={2}>
          {testData.image === "" ||
          testData.image === undefined ||
          testData.image === null ? (
            <Box
              sx={{
                height: 100,
                width: 100,
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
                height: 100,
                width: 100,
                backgroundColor: "#cccccc",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 5,
                border: 1,
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
        <Grid xs={9} xl={10}>
          <Grid container spacing={1}>
            <Grid xs={12}>
              <Stack direction='row' justifyContent='space-between' spacing={1}>
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
            <Grid xs={4}>
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
                    {testData.questions.length > 2 ? " questions" : " question"}
                  </Typography>
                ) : (
                  <Typography fontSize={{ xs: "12px" }} sx={{ ml: 1 }}>
                    0 question
                  </Typography>
                )}
              </Box>
            </Grid>
            <Grid xs={4}>
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
            <Grid xs={4}>
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
      <Stack direction='row' alignItems='center' justifyContent='space-between'>
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
            startIcon={<Delete />}
            variant='contained'
            color='inherit'
            onClick={() => handleDelete(testData.id)}
          >
            delete
          </Button>
          <Button
            size='small'
            startIcon={<Mode />}
            variant='contained'
            color='inherit'
            onClick={() =>
              navigate(`/admin/test/${testData.id}/${testData.name}`)
            }
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
            onClick={() => handleDelete(testData.id)}
          >
            <Delete fontSize='small'/>
          </IconButton>
          <IconButton
            size='small'
            color='secondary'
            onClick={() =>
              navigate(`/admin/test/${testData.id}/${testData.name}`)
            }
          >
            <Mode fontSize='small' />
          </IconButton>
          <IconButton size='small' color='secondary'>
            <Folder fontSize='small'/>
          </IconButton>
        </Stack>
      </Stack>
    </Paper>
  );
};
export default TestView;

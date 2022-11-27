import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { Paper, Box, Stack, Typography, Avatar, Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faBook,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";
import { Folder, Mode } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
export default function TestView({ testData, user }) {
  const navigate = useNavigate();
  return (
    <Paper
      onClick={() => navigate(`/admin/test/${testData.id}/${testData.name}`)}
      elevation={5}
      sx={{
        borderRadius: 2,
        padding: 2,
        bgcolor: "#f2f2f2",
        "&:hover": { bgcolor: "#ffffff" },
        cursor: "pointer",
      }}
    >
      <Grid container spacing={2}>
        <Grid display='flex' justifyContent='center' xs={4}>
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
        <Grid xs={8}>
          <Grid container spacing={1} sx={{ mt: 1 }}>
            <Grid xs={6}>
              <Stack direction='row' spacing={1}>
                <Typography variant='h5'>Test</Typography>
                {testData.isEditing && (
                  <Box
                    component='div'
                    m={0}
                    pt={0.4}
                    width={60}
                    bgcolor='#006460'
                    color='white'
                    display='flex'
                    justifyContent='center'
                    alignItems='flex-start'
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
            <Grid xs={4}>
              <Box
                display='flex'
                flexDirection='row'
                alignItems='center'
                color='#666666'
              >
                <FontAwesomeIcon icon={faGraduationCap} />
                {testData.questions ? (
                  <Typography sx={{ ml: 1 }}>
                    {testData.questions.length}
                    {testData.questions.length > 2 ? " questions" : " question"}
                  </Typography>
                ) : (
                  <Typography sx={{ ml: 1 }}>0 question</Typography>
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
                <FontAwesomeIcon icon={faGraduationCap} />
                <Typography sx={{ ml: 1 }}>{testData.grade}th Grade</Typography>
              </Box>
            </Grid>
            <Grid xs={4}>
              <Box
                display='flex'
                flexDirection='row'
                alignItems='center'
                color='#666666'
              >
                <FontAwesomeIcon icon={faBook} />
                {testData.department !== null && (
                  <Typography sx={{ ml: 1 }}>
                    {testData.department.name}
                  </Typography>
                )}
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
            onClick={() =>
              navigate(`/admin/test/${testData.id}/${testData.name}`)
            }
          >
            <Mode fontSize='small' sx={{ mr: 1 }} /> Edit
          </Button>
          <Button variant='contained' color='inherit'>
            <Folder fontSize='small' sx={{ mr: 1 }} /> Save
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}

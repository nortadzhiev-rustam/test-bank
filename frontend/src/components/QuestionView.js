import React, { useEffect, useState, useRef } from "react";
import Grid from "@mui/material/Unstable_Grid2/";
import {
  Paper,
  Typography,
  Button,
  Box,
  Avatar,
  Chip,
  Divider,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare } from "@fortawesome/free-regular-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import Markdown from './Markdown'


const _renderContent = (content) => <Markdown source={content} />;

export default function QuestionView({ data }) {
  const {
    image,
    question,
    option1,
    option2,
    option3,
    option4,
    type,
    mark,
    correctAnswer,
  } = data;
  const [options, setOptions] = useState([option1, option2, option3, option4]);

  return (
    <Box sx={{ flexGrow: 1, m: 3 }}>
      <Paper elevation={5} sx={{ padding: 2, borderRadius: 5 }}>
        <Box
          width='100%'
          display='flex'
          flexDirection='row'
          justifyContent='space-between'
          mb={4}
        >
          <Paper elevation={5} sx={{ borderRadius: 5 }}>
            <Chip
              sx={{ padding: 2 }}
              icon={<FontAwesomeIcon icon={faCheckSquare} />}
              label={type}
              variant='outlined'
            />
          </Paper>
          <Paper elevation={5} sx={{ borderRadius: 5 }}>
            <Chip
              sx={{ padding: 2 }}
              icon={<FontAwesomeIcon icon={faPen} />}
              label={`${mark} points`}
              variant='outlined'
            />
          </Paper>
        </Box>
        <Grid container spacing={2} sx={{ alignItems: "center", m: 2 }}>
          {image !== "" && (
            <Grid xs={12} md={2}>
              <img
                src={process.env.PUBLIC_URL + "/uploads/" + image}
                alt='inputImage'
                style={{
                  width: "100%",
                  maxHeight: "210px",
                  objectFit: "contain",
                  borderRadius: "15px",
                }}
              />
            </Grid>
          )}
          <Grid sx={12} md={image !== "" ? 10 : 12}>
            {_renderContent(question)}
          </Grid>
        </Grid>
        <Divider orientation='horizontal'>answer choices</Divider>
        <Grid
          sx={{ margin: 2 }}
          container
          spacing={2}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {options.map((option, idx) => (
            <Grid xs={12} md={6}>
              <Box
                key={idx}
                display='flex'
                flexDirection='row'
                alignItems='center'
              >
                <Box
                  width={15}
                  height={15}
                  borderRadius='50%'
                  mr={2}
                  bgcolor={option === correctAnswer ? "green" : "red"}
                ></Box>
                <Typography variant='caption'>{option}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
}

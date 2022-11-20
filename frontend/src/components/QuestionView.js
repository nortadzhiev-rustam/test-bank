import React, { useEffect, useState } from "react";
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
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import { Stack } from "@mui/system";

export default function QuestionView({ data }) {
  const { image, question, options, type, mark, correctAnswer } = data;
  const [answers] = useState(JSON.parse(options));
  const [quest] = useState(JSON.parse(question));
  const [correct] = useState(JSON.parse(correctAnswer));

  return (
    <Box sx={{ mb: 3, width: "100%" }}>
      <Paper elevation={5} sx={{ padding: 1, borderRadius: 2 }}>
        <Box
          width='100%'
          display='flex'
          flexDirection='row'
          justifyContent='space-between'
          mb={1}
        >
          <Paper elevation={2} sx={{ borderRadius: 1, py: 0.5, px: 1 }}>
            <Stack direction='row' spacing={1} alignItems='center'>
              <FontAwesomeIcon icon={faCheckSquare} />
              <Typography>{type}</Typography>
            </Stack>
          </Paper>
          <Paper elevation={2} sx={{ borderRadius: 1, py: 0.5, px: 1 }}>
            <Stack direction='row' spacing={1} alignItems='center'>
              <FontAwesomeIcon icon={faPen} />
              <Typography>{`${mark} points`}</Typography>
            </Stack>
          </Paper>
        </Box>
        <Grid container spacing={2} sx={{ alignItems: "center", m: 1 }}>
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
          <Grid xs={12} md={image !== "" ? 10 : 12} p='0px'>
            {quest.text !== undefined ? (
              <Typography variant='body1'>Q: {quest.text}</Typography>
            ) : (
              <Typography variant='body1'>Q:</Typography>
            )}
            {quest.equation !== undefined && (
              <BlockMath math={quest.equation} />
            )}
          </Grid>
        </Grid>
        <Divider orientation='horizontal'>answer choices</Divider>
        <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
          {answers.map((option, idx) => (
            <Grid key={idx} xs={12} md={6}>
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
                  bgcolor={correct.key === option.key ? "green" : "red"}
                ></Box>
                {option.content.text !== undefined && (
                  <Typography variant='caption'>
                    {option.content.text}
                  </Typography>
                )}
                {option.content.equation !== undefined && (
                  <BlockMath math={option.content.equation} />
                )}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
}

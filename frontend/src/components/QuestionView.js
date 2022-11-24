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
  List,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare } from "@fortawesome/free-regular-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import { Stack } from "@mui/system";
import {
  CheckBoxOutlined,
  CopyAll,
  Delete,
  Flaky,
  Layers,
  Mode,
  Subject,
} from "@mui/icons-material";
import axios from "axios";

export default function QuestionView({
  data,
  isEditing,
  index,
  handleDelete,
  handleEdit,
}) {
  const { image, question, options, type, mark, correctAnswer, id } = data;
  const [answers] = useState(JSON.parse(options));
  const [quest] = useState(JSON.parse(question));
  const [correct] = useState(JSON.parse(correctAnswer));

  const IconSelector = () => {
    if (type === "Multiple-choice")
      return <CheckBoxOutlined color='inherit' fontSize='small' />;
    if (type === "True or False")
      return <Flaky color='inherit' fontSize='small' />;
    if (type === "Open ended")
      return <Subject color='inherit' fontSize='small' />;
    else return <Layers color='inherit' fontSize='small' />;
  };

  const onDelete = () => {
    handleDelete(id);
  };

  const onEdit = () => {
    handleEdit(id);
  };

  return (
    <Box sx={{ mb: 3, width: "100%" }}>
      <Paper elevation={5} sx={{ padding: 1, borderRadius: 2 }}>
        {isEditing ? (
          <Stack
            direction='row'
            justifyContent='space-between'
            alignItems='center'
            mx={1}
          >
            <Stack direction='row' spacing={1}>
              <Box
                width={25}
                height={25}
                bgcolor='#006064'
                borderRadius={1}
                color='white'
                display='flex'
                justifyContent='center'
                alignItems='center'
              >
                <IconSelector />
              </Box>
              <Typography>Question {index}</Typography>
            </Stack>
            <Stack direction='row' spacing={1}>
              <Button
                variant='contained'
                size='small'
                color='inherit'
                onClick={onEdit}
              >
                {" "}
                <Mode fontSize='small' color='inherit' /> Edit
              </Button>
              <Button
                display='flex'
                justifyContent='center'
                alignItems='center'
                width={25}
                variant='contained'
                color='inherit'
                sx={{ minWidth: 15, maxWidth: 20 }}
              >
                <CopyAll fontSize='small' />
              </Button>
              <Button
                display='flex'
                justifyContent='center'
                alignItems='center'
                variant='contained'
                color='inherit'
                sx={{ minWidth: 15, maxWidth: 20 }}
                onClick={() => onDelete()}
              >
                <Delete fontSize='small' />
              </Button>
            </Stack>
          </Stack>
        ) : (
          <Box
            width='100%'
            display='flex'
            flexDirection='row'
            justifyContent='space-between'
            mb={1}
          >
            <Paper elevation={2} sx={{ borderRadius: 1, py: 0.5, px: 1 }}>
              <Stack direction='row' spacing={1} alignItems='center'>
                <IconSelector />
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
        )}
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

import React, { useState } from "react";
import Grid from "@mui/material/Unstable_Grid2/";
import { Paper, Typography, Button, Box, Divider } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFeatherPointed } from "@fortawesome/free-solid-svg-icons";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import { Stack } from "@mui/system";
import {
  CheckCircleRounded,
  CopyAll,
  Delete,
  Flaky,
  Layers,
  Mode,
  Subject,
} from "@mui/icons-material";
import './QuestionView.css'
const IconSelector = ({ type }) => {
  if (type === "Multiple choice")
    return <CheckCircleRounded color='inherit' fontSize='small' />;
  if (type === "True or False")
    return <Flaky color='inherit' fontSize='small' />;
  if (type === "Open ended")
    return <Subject color='inherit' fontSize='small' />;
  else return <Layers color='inherit' fontSize='small' />;
};

export default function QuestionView({
  data,
  isEditing,
  index,
  handleDelete,
  handleEdit,
  handleDuplicate,
}) {
  const { image, question, options, type, mark, correctAnswer, id, matches } =
    data;
  const [answers] = useState(JSON.parse(options));
  const [quest] = useState(JSON.parse(question));
  const [correct] = useState(JSON.parse(correctAnswer));
  const [match] = useState(JSON.parse(matches));
  const onDelete = () => {
    handleDelete(id);
  };

  const onEdit = () => {
    handleEdit(id, type);
  };

  const onDuplicate = () => {
    handleDuplicate(id);
  };

  function createMarkup(content) {
    return { __html: content };
  }

  return (
    <Box component='div' sx={{ width: "100%" }}>
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
                <IconSelector type={type} />
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
                width={25}
                variant='contained'
                color='inherit'
                sx={{ minWidth: 15, maxWidth: 20 }}
                onClick={() => onDuplicate()}
              >
                <CopyAll fontSize='small' />
              </Button>
              <Button
                display='flex'
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
            <Paper elevation={0} sx={{ borderRadius: 1, py: 0.5, px: 1 }}>
              <Stack direction='row' spacing={1} alignItems='center'>
                <IconSelector type={type} />
                <Typography>{type}</Typography>
              </Stack>
            </Paper>
            <Paper elevation={0} sx={{ borderRadius: 1, py: 0.5, px: 1 }}>
              <Stack direction='row' spacing={1} alignItems='center'>
                <FontAwesomeIcon icon={faFeatherPointed} />
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
              // <Typography variant='body1'>Q: {quest.text}</Typography>
              <div dangerouslySetInnerHTML={createMarkup(quest.text)}></div>
            ) : (
              <Typography variant='body1'>Q:</Typography>
            )}
            {quest.equation !== undefined && (
              <BlockMath math={quest.equation} />
            )}
          </Grid>
        </Grid>

        <Divider orientation='horizontal'>answer choices</Divider>

        {(type === "Multiple choice" ||
          type === "Fill in the blanks" ||
          type === "True or False") && (
          <Grid container spacing={2} m={1} columns={{ xs: 4, sm: 8, md: 12 }}>
            {answers.map((option) => (
              <Grid key={option.key} xs={12} sm={6}>
                <Box display='flex' flexDirection='row' alignItems='center'>
                  <Box
                    width={15}
                    height={15}
                    borderRadius='50%'
                    mr={1}
                    bgcolor={correct.key === option.key ? "green" : "red"}
                  ></Box>
                  {option.content.text !== undefined && (
                    // <Typography variant='caption'>
                    //   {option.content.text + " "}
                    // </Typography>
                    <div
                    
                      dangerouslySetInnerHTML={createMarkup(
                        option.content.text
                      )}
                    ></div>
                  )}
                  {option.content.equation !== undefined && (
                    <BlockMath math={option.content.equation} />
                  )}
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
        {type === "Open ended" && (
          <Typography my={2} textAlign='center'>
            Participants will provide their own answers
          </Typography>
        )}

        {type === "Match" && (
          <Grid container spacing={1} m={1}>
            <Grid xs={6}>
              {answers.map((option) => (
                <Box
                  key={option.key}
                  display='flex'
                  flexDirection='row'
                  alignItems='center'
                >
                  <Box
                    width={12}
                    height={12}
                    borderRadius='50%'
                    mr={1}
                    bgcolor='green'
                    color='white'
                    display='flex'
                    flexDirection='column'
                    alignItems='center'
                    justifyContent='center'
                  ></Box>
                  {option.content.text !== undefined && (
                    // <Typography variant='caption'>
                    //   {option.content.text + " "}
                    // </Typography>
                    <div
                      dangerouslySetInnerHTML={createMarkup(
                        option.content.text
                      )}
                    ></div>
                  )}
                  {option.content.equation !== undefined && (
                    <BlockMath math={option.content.equation} />
                  )}
                </Box>
              ))}
            </Grid>

            {match !== null && match !== undefined && (
              <Grid xs={6}>
                {match.map((item) => (
                  <Box
                    key={item.id}
                    display='flex'
                    flexDirection='row'
                    alignItems='center'
                    mt={2}
                    mb={4}
                  >
                    <Box
                      width={12}
                      height={12}
                      borderRadius='50%'
                      mr={1}
                      bgcolor='orange'
                      color='white'
                      display='flex'
                      flexDirection='column'
                      alignItems='center'
                      justifyContent='center'
                    ></Box>

                    <Typography variant='caption'>{item.match}</Typography>
                  </Box>
                ))}
              </Grid>
            )}
          </Grid>
        )}
      </Paper>
    </Box>
  );
}

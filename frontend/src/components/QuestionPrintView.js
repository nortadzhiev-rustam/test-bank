import { Box, Stack, Typography } from "@mui/material";
import { BlockMath } from "react-katex";
import React from "react";

const QuestionPrintView = ({ quest, number, imageOff }) => {
  const { question, options, image } = quest;

  const parsedQuestion = JSON.parse(question);
  const answers = JSON.parse(options);

  const optionGenerator = (index) => {
    if (index === 0) return "A";
    else if (index === 1) return "B";
    else if (index === 2) return "C";
    else if (index === 3) return "D";
    else if (index === 4) return "E";
    else return "";
  };

  return (
    <Stack spacing={2} width='100%' mb={2}>
      <Stack direction='row' spacing={1} width='100%' alignItems='center'>
        <Typography variant='h6'>{number + "."}</Typography>

        <Stack direction='row' spacing={2} width='100%' alignItems='center'>
          {image !== "" && !imageOff && (
            <img
              src={process.env.PUBLIC_URL + "/uploads/" + image}
              alt='inputImage'
              style={{
                width: "210px",
                maxHeight: "210px",
                objectFit: "contain",
                borderRadius: "15px",
              }}
            />
          )}
          {parsedQuestion.text !== undefined && (
            <Typography sx={{overflowWrap: 'anywhere'}} variant='h6'>
              {parsedQuestion.text}
            </Typography>
          )}
          {parsedQuestion.equation !== undefined && (
            <BlockMath math={parsedQuestion.equation} />
          )}
        </Stack>
      </Stack>
      <Stack pl={5} mb={1} direction='row'  flexWrap='wrap' >
        {answers.map((answer, idx) => (
          <Stack key={idx} width='50%' alignItems='center' direction='row'>
            {optionGenerator(idx) + ")"}
            <Stack
              ml={1}
              spacing={2}
              direction='row'
              alignItems='center'
            >
              {answer.content.text !== undefined && (
                <Typography>{answer.content.text}</Typography>
              )}
              {answer.content.equation !== undefined && (
                <BlockMath math={answer.content.equation} />
              )}
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default QuestionPrintView;

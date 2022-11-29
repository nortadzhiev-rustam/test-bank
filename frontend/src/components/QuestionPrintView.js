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
    <Stack spacing={2} width='100%'>
      <Stack direction='row' spacing={1} width='100%'>
        <Typography variant='h6'>{number + "."}</Typography>
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
        <Stack direction='row' spacing={2} width='100%'>
          {parsedQuestion.text !== undefined && (
            <Typography noWrap variant='h6'>
              {parsedQuestion.text}
            </Typography>
          )}
          {parsedQuestion.equation !== undefined && (
            <BlockMath math={parsedQuestion.equation} />
          )}
        </Stack>
      </Stack>
      <Stack direction='row' alignItems='center' flexWrap='wrap'>
        {answers.map((answer, idx) => (
          <Stack key={idx} width='50%' alignItems='flex-start' direction='row'>
            {optionGenerator(idx) + ")"}
            <Stack ml={2} mb={2} spacing={2} direction='row'>
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

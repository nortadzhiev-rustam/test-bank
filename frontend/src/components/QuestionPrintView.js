import { Stack, Typography, Box, Divider } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { BlockMath } from "react-katex";
import React, {  useMemo } from "react";
import "./PrintPage.css";
const QuestionPrintView = ({
  quest,
  number,
  checkBoxOn,
  optionOn,
  shuffleAnswers,
  questionImage,
}) => {
  const { question, options, image, matches, type } = quest;

  const parsedQuestion = JSON.parse(question);
  const answers = JSON.parse(options);
  const parsedMatches = JSON.parse(matches);

  const optionGenerator = (index) => {
    if (index === 0) return "A";
    else if (index === 1) return "B";
    else if (index === 2) return "C";
    else if (index === 3) return "D";
    else if (index === 4) return "E";
    else return "";
  };

  const shAnswers = useMemo(() => {
    const shuffledAnswers = () => {
      return shuffleAnswers
        ? [...answers].sort(() => Math.random() - 0.5)
        : answers;
    };
    return shuffledAnswers();
  }, [shuffleAnswers, answers]);

  

  return (
    <Grid
      className='container'
      container
      rowSpacing={2}
      spacing={1}
      sx={{ display: "block", breakAfter: "always" }}
    >
      <Grid xs={12}>
        <div style={{ display: "block", breakBefore: "auto" }}>
          <Stack
            direction='row'
            alignItems='center'
            spacing={1}
            flexWrap={Number(questionImage) > 300 ? "wrap" : "nowrap"}
          >
            <Typography fontSize='inherit' fontWeight='bold'>
              {number + "."}
            </Typography>
            {image !== "" && questionImage !== "OFF" && (
              <Box>
                <img
                  src={process.env.PUBLIC_URL + "/uploads/" + image}
                  alt='inputImage'
                  style={{
                    width: Number(questionImage),
                    height: Number(questionImage),
                    objectFit: "contain",
                    borderRadius: "15px",
                    border: 1,
                  }}
                />
              </Box>
            )}
            <Stack direction='row' spacing={2} alignItems='center'>
              {parsedQuestion.text !== undefined && (
                <Box sx={{ whiteSpace: "normal" }}>
                  <Typography sx={{ display: "block" }} fontSize='inherit'>
                    {parsedQuestion.text}
                  </Typography>
                </Box>
              )}
              {parsedQuestion.equation !== undefined && (
                <BlockMath math={parsedQuestion.equation} />
              )}
            </Stack>
          </Stack>
        </div>
      </Grid>

      <Grid xsOffset={0.5} xs={11.5}>
        {optionOn ? (
          <Grid container rowSpacing={1} spacing={2} alignItems='center'>
            {(type === "Multiple choice" ||
              type === "True or False" ||
              type === "Fill in the blanks") &&
              shAnswers.map((answer, idx) => (
                <Grid key={answer.key} xs={6}>
                  <Stack direction='row' spacing={2} alignItems='center'>
                    {checkBoxOn && (
                      <Typography fontSize='inherit' fontWeight='bold'>
                        {optionGenerator(idx) + ") "}
                      </Typography>
                    )}
                    {answer.content.text !== undefined && (
                      <Typography fontSize='inherit'>
                        {" " + answer.content.text}
                      </Typography>
                    )}
                    {answer.content.equation !== undefined && (
                      <BlockMath math={answer.content.equation} />
                    )}
                  </Stack>
                </Grid>
              ))}
            {type === "Match" && (
              <Grid xs={12}>
                <Grid container>
                  <Grid xs={6}>
                    {shAnswers.map((answer, idx) => (
                      <Stack
                        key={answer.key}
                        direction='row'
                        spacing={2}
                        alignItems='center'
                      >
                        {checkBoxOn && (
                          <Typography fontSize='inherit' fontWeight='bold'>
                            {optionGenerator(idx) + ") "}
                          </Typography>
                        )}
                        {answer.content.text !== undefined && (
                          <Typography fontSize='inherit'>
                            {" " + answer.content.text}
                          </Typography>
                        )}
                        {answer.content.equation !== undefined && (
                          <BlockMath math={answer.content.equation} />
                        )}
                      </Stack>
                    ))}
                  </Grid>

                  <Grid xs={6}>
                    {parsedMatches
                      .sort(() => Math.random() - 0.5)
                      .map((match) => (
                        <Stack
                          key={match.match}
                          direction='row'
                          spacing={2}
                          alignItems='center'
                        >
                          {checkBoxOn && (
                            <Typography fontSize='inherit' fontWeight='bold'>
                              __
                            </Typography>
                          )}
                          {match.match !== undefined && (
                            <Typography fontSize='inherit'>
                              {" " + match.match}
                            </Typography>
                          )}
                        </Stack>
                      ))}
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Grid>
        ) : (
          <Divider orientation='horizontal' />
        )}
      </Grid>
    </Grid>
  );
};

export default QuestionPrintView;

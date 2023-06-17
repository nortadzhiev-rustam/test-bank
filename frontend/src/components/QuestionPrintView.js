import { Stack, Typography, Box, Divider } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { BlockMath } from "react-katex";
import katex from "katex";
import "katex/dist/katex.min.css";
import React, { useMemo } from "react";
import "./PrintPage.css";
const QuestionPrintView = ({
  quest,
  number,
  checkBoxOn,
  optionOn,
  shuffleAnswers,
  questionImage,
  font,
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

  const renderLatex = (latex) => {
    const options = {
      throwOnError: false,
      strict: false,
      displayMode: true, // Set this to true if you want to render LaTeX in display mode
    };

    try {
      return katex.renderToString(latex, options);
    } catch (error) {
      console.error("Error rendering LaTeX:", error);
      return latex;
    }
  };

  const renderContent = (content) => {
    const regex = /<span data-type="inlineMath" content="(.*?)"><\/span>/g;

    return content.replace(regex, (match, latex) => {
      const renderedLatex = renderLatex(latex);
      return `<span class="latex-rendered">${renderedLatex}</span>`;
    });
  };

  function createMarkup(content) {
    return { __html: renderContent(content) };
  }

  return (
    <Grid
      className='container'
      container
      rowSpacing={2}
      spacing={1}
      sx={{ display: "block", breakAfter: "always", breakBefore: "always" }}
    >
      <Grid xs={12}>
        <div style={{ display: "block", breakBefore: "auto" }}>
          <Stack
            direction='row'
            alignItems='center'
            spacing={1}
            flexWrap={Number(questionImage) > 300 ? "wrap" : "nowrap"}
            mb={type === "Open ended" ? 30 : 1}
          >
            <Typography fontSize={font} fontWeight='bold'>
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
                  <div
                    style={{ fontSize: font }}
                    dangerouslySetInnerHTML={createMarkup(parsedQuestion.text)}
                  ></div>
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
                      <Typography fontSize={font} fontWeight='bold'>
                        {optionGenerator(idx) + ") "}
                      </Typography>
                    )}
                    {answer.content.text !== undefined && (
                      <div
                        style={{ fontSize: font }}
                        dangerouslySetInnerHTML={createMarkup(
                          answer.content.text
                        )}
                      ></div>
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
                          <Typography fontSize={font} fontWeight='bold'>
                            {optionGenerator(idx) + ") "}
                          </Typography>
                        )}
                        {answer.content.text !== undefined && (
                          <div
                            style={{ fontSize: font }}
                            dangerouslySetInnerHTML={createMarkup(
                              answer.content.text
                            )}
                          ></div>
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
                          mt={1}
                          mb={4}
                        >
                          {checkBoxOn && (
                            <Typography fontSize={font} fontWeight='bold'>
                              __
                            </Typography>
                          )}
                          {match.match !== undefined && (
                            <Typography fontSize={font}>
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

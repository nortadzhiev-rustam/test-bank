import { Stack, Typography, Box, Divider } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { BlockMath } from "react-katex";
import React, { useMemo } from "react";
import "./PrintPage.css";
const QuestionPrintView = ({
  quest,
  number,
  imageOff,
  checkBoxOn,
  optionOn,
  shuffleAnswers,
  questionImage,
}) => {
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
                  <Typography sx={{display: 'block'}}  fontSize='inherit'>
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
            {shAnswers.map((answer, idx) => (
              <Grid key={idx} xs={6}>
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
          </Grid>
        ) : (
          <Divider orientation='horizontal' />
        )}
      </Grid>
    </Grid>

    // <table style={{ width: "100%", breakInside: "auto"  }}>
    //   <tbody>
    //     <tr>
    //       <th width='5%'>{number + "."}</th>
    //       {image !== "" && !imageOff && (
    //         <th>
    //           <img
    //             src={process.env.PUBLIC_URL + "/uploads/" + image}
    //             alt='inputImage'
    //             style={{
    //               width: "150px",
    //               maxHeight: "150x",
    //               objectFit: "contain",
    //               borderRadius: "15px",
    //             }}
    //           />
    //         </th>
    //       )}
    //       {parsedQuestion.text !== undefined && (
    //         <th style={{ paddinLeft: 5, textAlign: "left" }}>
    //           {parsedQuestion.text}
    //         </th>
    //       )}
    //       {parsedQuestion.equation !== undefined && (
    //         <th>
    //           <BlockMath math={parsedQuestion.equation} />
    //         </th>
    //       )}
    //       {(parsedQuestion.equation === undefined ||
    //         parsedQuestion.text === undefined ||
    //         image === "" ||
    //         imageOff) && <th width='25%'></th>}
    //     </tr>
    //     <tr style={{ borderSpacing: 10 }}></tr>
    //     <tr>
    //       {answers.map((answer, idx) =>
    //         idx < 2 ? (
    //           <td key={idx} colSpan={2} style={{ paddingLeft: 30 }}>
    //             {optionGenerator(idx) + ") "}
    //             {answer.content.text !== undefined &&
    //               answer.content.text + " "}{" "}
    //             {answer.content.equation !== undefined && (
    //               <div style={{ display: "inline-flex", marginLeft: 10 }}>
    //                 {" "}
    //                 <BlockMath math={answer.content.equation} />
    //               </div>
    //             )}
    //           </td>
    //         ) : null
    //       )}
    //     </tr>
    //     <tr>
    //       {answers.map((answer, idx) =>
    //         idx > 1 ? (
    //           <td key={idx} colSpan={2} style={{ paddingLeft: 30 }}>
    //             {optionGenerator(idx) + ") "}
    //             {answer.content.text !== undefined &&
    //               answer.content.text + "  "}{" "}
    //             {answer.content.equation !== undefined && (
    //               <div style={{ display: "inline-flex", marginLeft: 10 }}>
    //                 {" "}
    //                 <BlockMath math={answer.content.equation} />
    //               </div>
    //             )}
    //           </td>
    //         ) : null
    //       )}
    //     </tr>
    //   </tbody>
    // </table>
    // <Stack spacing={2} width='100%' mb={2} style={{pageBreakBefore: 'always'}} >
    //   <Stack direction='row' spacing={1} width='100%' alignItems='center'>
    //     <Typography variant='h6'>{number + "."}</Typography>

    //     <Stack direction='row' spacing={2} width='100%' alignItems='center'>
    //       {image !== "" && !imageOff && (
    //         <img
    //           src={process.env.PUBLIC_URL + "/uploads/" + image}
    //           alt='inputImage'
    //           style={{
    //             width: "210px",
    //             maxHeight: "210px",
    //             objectFit: "contain",
    //             borderRadius: "15px",
    //           }}
    //         />
    //       )}
    //       {parsedQuestion.text !== undefined && (
    //         <Typography sx={{ overflowWrap: "anywhere" }} variant='h6'>
    //           {parsedQuestion.text}
    //         </Typography>
    //       )}
    //       {parsedQuestion.equation !== undefined && (
    //         <BlockMath math={parsedQuestion.equation} />
    //       )}
    //     </Stack>
    //   </Stack>
    //   <Stack pl={5} mb={1} direction='row' flexWrap='wrap'>
    //     {answers.map((answer, idx) => (
    //       <Stack key={idx} width='50%' alignItems='center' direction='row'>
    //         {optionGenerator(idx) + ")"}
    //         <Stack
    //           ml={1}
    //           mt={0.5}
    //           spacing={2}
    //           direction='row'
    //           alignItems='center'
    //         >
    //           {answer.content.text !== undefined && (
    //             <Typography>{answer.content.text}</Typography>
    //           )}
    //           {answer.content.equation !== undefined && (
    //             <BlockMath math={answer.content.equation} />
    //           )}
    //         </Stack>
    //       </Stack>
    //     ))}
    //   </Stack>
    // </Stack>
  );
};

export default QuestionPrintView;

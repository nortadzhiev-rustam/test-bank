import React from 'react';
import { Paper, Box, Grid } from '@mui/material';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import { Image } from '@mui/icons-material';
const QuestionCard = ({ question, answer, img }) => {
  const config = {
    /* in theory, the MathML input processor should be activated if we add
        an "mml" block to the config OR if "input/mml" (NOT "input/mathml" as stated 
        in the docs) is in the load array. However, this is not necessary as MathML is 
        ALWAYS enabled in MathJax */
    loader: { load: ['input/mml', 'output/chtml'] },
    mml: {},
  };

  return (
    <MathJaxContext>
      <Paper elevation={3} sx={{ margin: 5 }}>
        <div style={{ paddingBlock: 10, paddingInline: 20 }}>
          <MathJax>
            {'$$\\lim_{x\\to\\infty}=\\frac{x^2+5x}{4}$$'}
          </MathJax>
          {img !== null ||
            (img !== undefined && (
              <Image sx={{ width: '100%', height: 'auto' }} src={img} />
            ))}

          <Grid container sx={{ display: 'flex', flexDirection: 'row' }}>
            <Grid item sx={{ flex: 1 }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                component='div'
              >
                <span> A: &nbsp; </span>
                <MathJax inline>
                  <span
                    dangerouslySetInnerHTML={{ __html: answer.answerA }}
                  ></span>
                </MathJax>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                component='div'
              >
                <span> B: &nbsp; </span>
                <MathJax inline>
                  <span
                    dangerouslySetInnerHTML={{ __html: answer.answerB }}
                  ></span>
                </MathJax>
              </Box>
            </Grid>
            <Grid item sx={{ flex: 1 }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                component='div'
              >
                <span> C: &nbsp; </span>
                <MathJax inline>
                  <span
                    dangerouslySetInnerHTML={{ __html: answer.answerC }}
                  ></span>
                </MathJax>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                component='div'
              >
                <span> D: &nbsp; </span>
                <MathJax inline>
                  <span
                    dangerouslySetInnerHTML={{ __html: answer.answerD }}
                  ></span>
                </MathJax>
              </Box>
            </Grid>
          </Grid>
        </div>
      </Paper>
    </MathJaxContext>
  );
};

export default QuestionCard;

import React from 'react';
import {
  TextField,
  Button,
  InputBase,
  Box,
  IconButton,
  Grid,
} from '@mui/material';
import { styled } from '@mui/styles';
import MathDialog from './MathDialog';
import { EditableMathField, addStyles, StaticMathField } from 'react-mathquill';
import { FunctionsRounded } from '@mui/icons-material';
import MathJax from 'mathjax3-react';
addStyles();
const StyledInput = styled(InputBase)({
  width: '100%',
  margin: '10px 10px',
  border: '1px solid #ccc',
  borderRadius: '6px',
  padding: '10px',
  height: '150px'
});

const Input = (props) => {
  const [latex, setLatex] = React.useState('');
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    props.onChange(latex);
  }, [latex]);

  return (
    <Box display='flex' component='div' flexDirection='column'>
      <Grid
        container
        spacing={1}
        display='flex'
        flexDirection='row'
        alignItems='center'
      >
        <Grid item xs={12} md={12} mr={5}>
          <StyledInput
            endAdornment={
              <IconButton onClick={() => setOpen(true)}>
                <FunctionsRounded />
              </IconButton>
            }
            multiline
            rows={3}
            placeholder='Enter your question here'
            value={latex}
            onChange={(e) => setLatex((prevState) => e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={3} display='flex' justifyContent='start'>
          <MathJax.Provider
            
          >
            <MathJax.Formula formula={latex} />
          </MathJax.Provider>
        </Grid>
      </Grid>
      <MathDialog
        latex={latex}
        setLatex={(value) => setLatex(value)}
        setOpen={(status) => setOpen(status)}
        open={open}
      />
    </Box>
  );
};

export default Input;

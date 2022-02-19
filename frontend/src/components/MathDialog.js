import React, { useRef } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import { addStyles, EditableMathField, StaticMathField } from 'react-mathquill';
import { formulas } from '../constants/formulas';
import { IconButton, Typography, Box } from '@mui/material';
import { CancelRounded } from '@mui/icons-material';
import PropTypes from 'prop-types';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import { MathFieldComponent } from 'react-mathlive';
import('mathlive/dist/mathlive-static.css');
addStyles();
function PaperComponent(props) {
  return (
    <Draggable
      handle='#draggable-dialog-title'
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function MathDialog({ open, setOpen, latex, setLatex }) {
  const [formule, setFormule] = React.useState('');
  const [formuleLatex, setFormuleLatex] = React.useState('');
  const inputRef = useRef(null);
  React.useEffect(() => {
    if (latex) {
      setFormule(latex);
    } else setFormule('');
  }, [latex]);

  const handleClose = () => {
    setFormule('');
    setOpen(false);
  };

  const handleSubmit = () => {
    setLatex(formule);
    setFormule('');
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby='draggable-dialog-title'
      >
        <DialogTitle
          style={{
            cursor: 'move',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
          id='draggable-dialog-title'
        >
          <Typography
            variant='body1'
            sx={{ fontSize: '30px', fontWeight: 'bold' }}
          >
            Formula
          </Typography>{' '}
          <IconButton onClick={() => setOpen(false)}>
            <CancelRounded color='error' />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Paper
            style={{
              marginBlock: 20,
              display: 'flex',
              alignItems: 'end',
              flexWrap: 'wrap',
            }}
          >
            {formulas.map((formula) => (
              <Button
                key={formula.id}
                variant='contained'
                style={{
                  height: 40,
                  width: 40,
                  textTransform: 'lowerCase',
                  fontSize: formula.fontSize,
                  marginInline: 2,
                  borderRadius: 5,
                  marginBlock: 5,
                  dispaly: 'flex',
                  alignItems: 'center',
                  padding: 0,
                  cursor: 'pointer',
                }}
                size='large'
                onClick={() => {
                  setFormule((prevState) => prevState + formula.latex);
                }}
              >
                <StaticMathField style={{ cursor: 'pointer' }}>
                  {formula.formula}
                </StaticMathField>
              </Button>
            ))}
          </Paper>

          <Box
            style={{
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: 'turquoise',
              borderRadius: '5px',
              padding: '10px',
            }}
          >
            <MathFieldComponent
              ref={inputRef}
              mathFieldConfig={{
                defaultMode: 'text',
                virtualKeyboardMode: 'off',
              }}
              style={{
                borderWidth: '1px',
                borderColor: '#e63946',
                borderStyle: 'solid',
                borderRadius: '5px',
                padding: '5px',
                width: '100%',
              }}
              latex={formule}
              onChange={setFormule}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

MathDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  latex: PropTypes.string.isRequired,
  setLatex: PropTypes.func.isRequired,
};

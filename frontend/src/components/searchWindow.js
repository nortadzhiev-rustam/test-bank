import * as React from 'react';

import Dialog from '@mui/material/Dialog';

import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';
import {
  InputBase,
  InputAdornment,
  Box,
  Grow,
  
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  height: 40,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#006064',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '35ch',
    },
  },
}));



export default function SearchWindow({ open, setOpen }) {
  const [scroll] = React.useState('paper');

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

 

  return (
    <Dialog
      
      TransitionComponent={Grow}
      transitionDuration={{ enter: 500, exit: 500 }}
      open={open}
      onClose={handleClose}
      scroll={scroll}
      aria-labelledby='scroll-dialog-title'
      aria-describedby='scroll-dialog-description'
      sx={{ backdropFilter: 'blur(3px)', }}
    >
      <DialogTitle sx={{ paddingInline: 0, borderRadius: '10px' }} id='scroll-dialog-title'>
        <Search>
          <StyledInputBase
            sx={{ fontSize: '1.3rem' }}
            placeholder='Search…'
            inputProps={{ 'aria-label': 'search' }}
            endAdornment={
              <InputAdornment
                sx={{ padding: '10px', cursor: 'pointer' }}
                position='end'
              >
                <Box
                  sx={{
                    bgcolor: '#f5f5f5',
                    borderRadius: 2,
                    paddingInline: '15px',
                    paddingBlock: '5px',
                    fontSize: '1.2rem',
                    color: '#90a4ae',
                    '&:hover': {
                      color: '#b0bec5',
                    },
                  }}
                  onClick={() => setOpen(false)}
                >
                  Esc
                </Box>
              </InputAdornment>
            }
            startAdornment={
              <InputAdornment position='start'>
                <SearchIconWrapper>
                  <SearchIcon fontSize='large' />
                </SearchIconWrapper>
              </InputAdornment>
            }
          />
        </Search>
      </DialogTitle>
      <DialogContent sx={{minHeight: 400, p:0 }} dividers={scroll === 'paper'}>
        
      </DialogContent>
    </Dialog>
  );
}

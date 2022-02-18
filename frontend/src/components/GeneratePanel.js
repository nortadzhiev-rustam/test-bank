import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { openWindow, setVisible } from '../store/questionTypeSlice';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import 'animate.css';
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  paddingBlock: theme.spacing(4),
  paddingInline: theme.spacing(4),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  transition: 'all 0.5s ease-in',
  borderRadius: 15,
}));

const categories = [
  'English',
  'Protuguese',
  'Mathematics',
  'Physics',
  'Chemistry',
  'French',
];

const difficulties = ['Easy', 'Medium', 'Hard', 'Challenge'];

const GeneratePanel = () => {
  const [isMouseIn, setMouseIn] = React.useState(false);
  const [category, setCategory] = React.useState('');
  const [difficulty, setDifficulty] = React.useState('');
  const dispatch = useDispatch();
  const handleVisibility = () => {
    if (category !== '') {
      dispatch(setVisible(true));
      dispatch(openWindow('generate'));
    } else {
      dispatch(setVisible(false));
    }
  };

  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };
  const handleChangeDifficulty = (event) => {
    setDifficulty(event.target.value);
  };

  return (
    <Item elevation={isMouseIn ? 10 : 2} onMouseEnter={()=> setMouseIn(true)} onMouseLeave={()=> setMouseIn(false)} className='animate__animated animate__fadeInLeft' sx={{transition: 'all 0.5s ease-in'}}>
      <Typography
        style={{ marginBottom: 5, textAlign: 'start' }}
        variant='body2'
        fontWeight={900}
        color='initial'
      >
        CHOOSE CATEGORY
      </Typography>
      <FormControl size='small' fullWidth style={{ marginBottom: 20 }}>
        <InputLabel id='demo-simple-select-label'>Category</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={category}
          label='Category'
          onChange={handleChangeCategory}
        >
          {categories.map((item, idx) => {
            return (
              <MenuItem key={idx} value={item.toLowerCase()}>
                {item}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <Typography
        style={{ marginBottom: 5, textAlign: 'start' }}
        variant='body2'
        fontWeight={900}
        color='initial'
      >
        CHOOSE DIFFICULTY
      </Typography>
      <FormControl size='small' fullWidth style={{ marginBottom: 20 }}>
        <InputLabel id='demo-simple-select-label'>Difficulty</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={difficulty}
          label='Category'
          onChange={handleChangeDifficulty}
        >
          {difficulties.map((dif, idx) => {
            return (
              <MenuItem key={idx} value={dif.toLowerCase()}>
                {dif}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <Typography
        style={{ marginBottom: 5, textAlign: 'start' }}
        variant='body2'
        fontWeight={900}
        color='initial'
      >
        CHOOSE DIFFICULTY
      </Typography>
      <FormControl size='small' fullWidth style={{ marginBottom: 20 }}>
        <InputLabel id='demo-simple-select-label'>Difficulty</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={difficulty}
          label='Category'
          onChange={handleChangeDifficulty}
        >
          {difficulties.map((dif, idx) => {
            return (
              <MenuItem key={idx} value={dif.toLowerCase()}>
                {dif}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <Button variant='contained' color='success' onClick={handleVisibility}>
        Generate
      </Button>
    </Item>
  );
};

export default GeneratePanel;

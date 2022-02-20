import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import 'animate.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  questCategory,
  questDifficulty,
  questType,
  grade,
  openWindow,
  setVisible,
} from '../store/questionTypeSlice';





const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  paddingBlock: theme.spacing(4),
  paddingInline: theme.spacing(4),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  borderRadius: 15,
  transition: 'all 0.3s ease-in',
}));


const difficulties = ['Easy', 'Medium', 'Hard', 'Challenge'];
const types = ['Multiple choice', 'True or Flase', 'Fill in gaps', 'Classic'];
const grades = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const InsertPanel = () => {
  const [isMouseIn, setMouseIn] = React.useState(false);
  const quest = useSelector((state) => state.questionsType.value);
  const category = useSelector(state => state.department.department)
  const dispatch = useDispatch();
  

 

  const handleVisibility = () => {
    if (quest.category !== '') {
      dispatch(setVisible(true));
      dispatch(openWindow('insert'));
    } else {
      dispatch(setVisible(false));
    }
  };
  const handleChangeCategory = (event) => {
    dispatch(questCategory(event.target.value));
  };
  const handleChangeDifficulty = (event) => {
    dispatch(questDifficulty(event.target.value));
  };

  const handleChangeType = (event) => {
    dispatch(questType(event.target.value));
  };

  const handleChangeGarde = (event) => {
    dispatch(grade(Number(event.target.value)));
  };

  return (
    <Item elevation={isMouseIn ? 10 : 2} onMouseEnter={()=> setMouseIn(true)} onMouseLeave={()=> setMouseIn(false)} className='animate__animated animate__fadeInRight'>
      <div style={{ overflow: 'hidden' }}>
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
            value={quest.category}
            label='Category'
            onChange={handleChangeCategory}
          >
            {category.map((item, idx) => {
              return (
                <MenuItem key={idx} value={item}>
                  {item.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        {quest.category !== '' && (
          <div className='animate__animated animate__fadeInUp'>
            <Typography
              style={{ marginBottom: 5, textAlign: 'start' }}
              variant='body2'
              fontWeight={900}
              color='initial'
            >
              CHOOSE TYPE
            </Typography>
            <FormControl size='small' fullWidth style={{ marginBottom: 20 }}>
              <InputLabel id='demo-simple-select-label'>Type</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={quest.questionType}
                label='Category'
                onChange={handleChangeType}
              >
                {types.map((tp, idx) => {
                  return (
                    <MenuItem key={idx} value={tp.toLowerCase()}>
                      {tp}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
        )}
        {quest.questionType !== '' && (
          <div className='animate__animated animate__fadeInUp'>
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
                value={quest.difficulty}
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
          </div>
        )}

        {quest.difficulty !== '' && (
          <FormControl
            component='fieldset'
            className='animate__animated animate__fadeInUp'
          >
            <FormLabel component='legend'>Grades</FormLabel>
            <RadioGroup
              value={quest.grade}
              onChange={handleChangeGarde}
              row
              aria-label='gender'
              name='row-radio-buttons-group'
            >
              {grades.map((grd, idx) => {
                return (
                  <FormControlLabel
                    key={idx}
                    value={grd}
                    control={<Radio color={'info'} />}
                    label={grd}
                    labelPlacement='start'
                  />
                );
              })}
            </RadioGroup>
          </FormControl>
        )}
      </div>
      <Button
        disabled={quest.grade === 0 ? true : false}
        variant='contained'
        color='info'
        onClick={handleVisibility}
      >
        Insert
      </Button>
    </Item>
  );
};

export default InsertPanel;

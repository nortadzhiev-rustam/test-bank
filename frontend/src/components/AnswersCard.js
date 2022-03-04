import React from 'react';
import { Paper, Box, Checkbox, IconButton } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faCamera } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { styled } from '@mui/styles';
import { Functions } from '@mui/icons-material';
const StyledPaper = styled(Paper)({
  height: '270px',
  width: '200px',
  marginInline: 5,
  marginBlock: 20,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
  alignItems: 'center',
  borderRadius: 20,
});

const IconBox = styled(Box)({
  backgroundColor: '#2a9d8f',
  width: '30px',
  height: '30px',
  marginTop: 10,
  marginLeft: 5,
  borderRadius: 7,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
});

const BoxContainer = styled(Box)({
  width: '100%',
  height: '40px',
  paddingInline: '10px',
  borderTopLeftRadius: '5px',
  borderTopRightRadius: '5px',
  marginBottom: '10px',
});

const UpperBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const AnswerBox = styled(Box)({
  display: 'flex',
  width: '90%',
  height: '200px',
  border: '1px solid #CCCCCC',
  borderRadius: 20,
  justifyContent: 'center',
  alignItems: 'center',
});

const IconBoxContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  marginLeft: 10,
});

const Input = styled('input')({
  display: 'none',
});

const AnswersCard = (props) => {
  const [checked, setChecked] = React.useState(false);
  const [image, setImage] = React.useState('');

  return (
    <StyledPaper elevation={5}>
      <BoxContainer>
        <UpperBox>
          <IconBoxContainer>
            <IconBox variant='button'>
              <Functions sx={{color: 'white'}}/>
            </IconBox>
            <IconBox variant='button'>
              <label htmlFor='icon-button-file'>
                <Input accept='image/*' id='icon-button-file' type='file' />
                <IconButton aria-label='upload picture' component='span'>
                  <FontAwesomeIcon size='xs' icon={faCamera} color='white' />
                </IconButton>
              </label>
            </IconBox>
            <IconBox variant='button' onClick={()=> props.onDelete(props.option.key)}>
              <FontAwesomeIcon size='sm' icon={faTrashCan} color='white' />
            </IconBox>
          </IconBoxContainer>
          <Box>
            <Checkbox
              icon={<FontAwesomeIcon size='xl' icon={faCheckCircle} />}
              checkedIcon={
                <FontAwesomeIcon size='xl' color='red' icon={faCheckCircle} />
              }
            />
          </Box>
        </UpperBox>
      </BoxContainer>
      <AnswerBox contentEditable>
        <p style={{ color: '#ccc' }}>Insert Your answer here</p>
      </AnswerBox>
    </StyledPaper>
  );
};

export default AnswersCard;

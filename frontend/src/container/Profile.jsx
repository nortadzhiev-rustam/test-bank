// profile page component
import React from 'react';
import { Paper, Box, Typography} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';

const Root = styled(Box)({
  padding: 20,
  width: '100%',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

const StyledPaper = styled(Paper)({
  width: '60%',
  height: 500,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 20,
});

const Profile = () => {
  const user = useSelector(state => state.user.user);

  return (

      <Root component='div'>
        <StyledPaper>
            
            <Typography variant='h4' component='h1'>
               Name: {user.firstName} {user.lastName}
            </Typography>
            <Typography variant='h4' component='h1'>
               Email: {user.email}
            </Typography>
            <Typography variant='h4' component='h1'>
               Department: {user.department.name}
            </Typography>
            
        </StyledPaper>
      </Root>

  );
};

export default Profile;

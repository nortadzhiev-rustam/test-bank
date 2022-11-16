// profile page component
import React from 'react';
import { Paper, Box, Typography} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(() => ({
  root: {
    padding: 20,
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paper: {
    width: '60%',
    height: 500,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
}));

const Profile = () => {
  const user = useSelector(state => state.user.user.user);
  const classes = useStyles();
  

  return (
    
      <Box component='div' className={classes.root}>
        <Paper className={classes.paper}>
            
            <Typography variant='h4' component='h1'>
               Name: {user.firstName} {user.lastName}
            </Typography>
            <Typography variant='h4' component='h1'>
               Email: {user.email}
            </Typography>
            <Typography variant='h4' component='h1'>
               Department: {user.department.name}
            </Typography>
            
        </Paper>
      </Box>
    
  );
};

export default Profile;

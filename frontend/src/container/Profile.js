// profile page component
import React from "react";
import { Paper, Box, Typography, Stack, Avatar } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";

const useStyles = makeStyles(() => ({
  root: {
    padding: 20,
    marginTop: 50,
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  paper: {
    width: { xs: "90%", md: "60%" },
    height: 500,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
}));

const Profile = ({ showNav, setShowNav }) => {
  const user = useSelector((state) => state.user.user.user);
  const classes = useStyles();
  React.useEffect(() => {
    if (showNav === false) setShowNav(true);
  }, [showNav, setShowNav]);

  return (
    <Box component='div' className={classes.root}>
      <Stack direction='row' spacing={3} mt={10} ml={10}>
        <Box width={150} height={150}>
          <Avatar sx={{ height: "100%", width: "100%" }}></Avatar>
        </Box>
        <Stack direction='column' justifyContent='center' spacing={1}>
          <Stack direction='row' spacing={1}>
            <Typography variant='h4' fontWeight={700}>
              {user.firstName + " " + user.lastName}
            </Typography>
            <Box
              sx={{
                bgcolor: "#006064",
                borderRadius: 5,
                paddingInline: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#fff",
                fontWeight: 500,
              }}
            >
              {user.role}
            </Box>
          </Stack>
          <Typography variant='h5'>{user.email}</Typography>
          <Typography>{user.department.name}</Typography>
        </Stack>
        <Stack>
          
        </Stack>
      </Stack>
    </Box>
  );
};

export default Profile;

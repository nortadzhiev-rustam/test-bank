import { Paper, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { setLoading } from "../store/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HowToReg, MeetingRoom } from "@mui/icons-material";

export default function InicialPage() {
  const loggedIn = useSelector((state) => state.user.isLoggedIn);
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginClicked, setLoginClicked] = React.useState(false);
  const [registerClicked, setRegisterClicked] = React.useState(false);

  React.useEffect(() => {
    dispatch(setLoading(true));
    if (user && user.isAuth) {
      navigate("/admin");
    }
  }, [navigate, loggedIn, dispatch, user]);

  return (
    <Stack
      direction='column'
      justifyContent='center'
      sx={{
        my: { xs: "80px", md: "250px" },
        width: "100%",
        transition: "all 2s ease-in",
      }}
      spacing={3}
    >
      <Typography
        fontWeight='bold'
        color='#118ab2'
        textAlign='center'
        variant='h2'
      >
        Welcome to Test Generatng Application
      </Typography>
      <Typography
        fontWeight='bold'
        color='#83c5be'
        textAlign='center'
        variant='h4'
      >
        Login or register
      </Typography>
      <Stack direction='row' justifyContent='center' spacing={1}>
        <Paper
          elevation={loginClicked ? 2 : 10}
          onClick={() => navigate("/login")}
          onMouseEnter={() => setLoginClicked(true)}
          onMouseLeave={() => setLoginClicked(false)}
          sx={{
            backgroundColor: "#7209b7",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: { xs: "150px", md: "250px" },
            height: 100,
            borderRadius: 5,
            cursor: "pointer",
            transition: "all 0.3s ease-in",
            "&:hover": {
              transform: "translate3D(0, 4px, 20px)",
            },
          }}
        >
          <Stack
            direction='row'
            justifyContent='center'
            alignItems='center'
            spacing={2}
            color='white'
          >
            <MeetingRoom fontSize='large' />
            <Typography color='white' variant='h4'>
              Login
            </Typography>
          </Stack>
        </Paper>
        <Paper
          onClick={() => navigate("/register")}
          onMouseEnter={() => setRegisterClicked(true)}
          onMouseLeave={() => setRegisterClicked(false)}
          elevation={registerClicked ? 2 : 10}
          sx={{
            backgroundColor: "#2a9d8f",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: { xs: "150px", md: "250px" },
            height: 100,
            borderRadius: 5,
            cursor: "pointer",
            transition: "all 0.3s ease-in",
            "&:hover": {
              transform: "translate3D(0, 4px, 20px)",
            },
          }}
        >
          <Stack
            direction='row'
            justifyContent='center'
            alignItems='center'
            spacing={2}
            color='white'
          >
            <HowToReg fontSize='large' />
            <Typography color='white' variant='h4'>
              Register
            </Typography>
          </Stack>
        </Paper>
      </Stack>
    </Stack>
  );
}

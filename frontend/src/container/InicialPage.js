import { Paper, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function InicialPage() {
  const loggedIn = useSelector((state) => state.user.isLoggedIn);
  const navigate = useNavigate();
  React.useEffect(() => {
    if (loggedIn) {
      navigate("/admin");
    }
  }, []);

  return (
    <Stack
      direction='column'
      justifyContent='center'
      style={{ marginTop: 300, width: "100%" }}
      spacing={3}
    >
      <Typography textAlign='center' variant='h2'>
        Welcome to Test Generatng Application
      </Typography>
      <Typography textAlign='center' variant='h4'>
        Login or register
      </Typography>
      <Stack direction='row' justifyContent='center' spacing={3}>
        <Paper
          elevation={5}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: 300,
            height: 200,
          }}
        >
          <Typography variant='h3'>Login</Typography>
        </Paper>
        <Paper
          elevation={5}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: 300,
            height: 200,
          }}
        >
          <Typography variant='h3'>Register</Typography>
        </Paper>
      </Stack>
    </Stack>
  );
}

import React from "react";
import { makeStyles } from "@mui/styles";
import {
  Box,
  FormControl,
  InputLabel,
  Paper,
  FilledInput,
  Button,
  Typography,
  Grid,
  InputAdornment,
  IconButton,
  Alert,
} from "@mui/material";
import axios from "axios";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, login } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "rgb(255,255,255)",
    paddingBlock: 50,
    paddingInline: 20,
    borderRadius: 10,

    transition: "all 0.7s ease-in-out",
    "&:hover": {
      boxShadow: "0px 0px 20px 10px rgba(0,0,0,0.2)",
      transform: "translate3D(0, -10px, 20px)",
    },
  },
  textField: { marginBlock: 10, color: "#fff" },
});

const Login = ({ history }) => {
  const classes = useStyles();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  React.useEffect(() => {
    const isLogged = (status) => {
      if (status) {
        navigate(-1);
      }
    };

    isLogged(isLoggedIn);
  }, [navigate, isLoggedIn]);

  React.useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      const res = await axios.post(
        `${
          process.env.NODE_ENV === "production"
            ? "https://backend.rustamnortadzhiev.com"
            : "http://localhost:5000"
        }/api/v1/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      dispatch(login(res.data));

      navigate("/admin");
    } catch (err) {
      setError(err.message);
    }
    dispatch(setLoading(false));
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickSignUp = () => {
    navigate("/register");
  };

  return (
    <Box className={classes.root}>
      {error !== "" && (
        <Alert className='animate__animated animate__fadeIn' severity='error'>
          {error}
        </Alert>
      )}
      <Paper
        sx={{
          borderRadius: "15px",
          padding: { md: "40px", xs: "10px" },
          marginBlock: { xs: "20px" },
          backgroundColor: "#006064",
        }}
        className='animate__animated animate__bounceIn animate__slow'
        elevation={10}
      >
        <Typography
          variant='h3'
          color='white'
          fontWeight='bold'
          sx={{
            textAlign: "center",
            marginBottom: { xs: 2, md: 5 },
            textTransform: "uppercase",
          }}
        >
          Login
        </Typography>
        <Box
          component='form'
          onSubmit={handleSubmit}
          className={classes.form}
          sx={{
            margin: { xs: "10px", md: "0px" },
            maxWidth: { xs: "280px", md: "350px" },
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl
                variant='filled'
                fullWidth
                sx={{ marginBlock: 1 }}
                size='medium'
              >
                <InputLabel htmlFor='email'>Email or Username</InputLabel>
                <FilledInput
                  id='email'
                  variant='filled'
                  label='Email or Username'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl
                fullWidth
                variant='filled'
                sx={{ marginBlock: 1 }}
                size='medium'
              >
                <InputLabel htmlFor='password'>Password</InputLabel>
                <FilledInput
                  type={showPassword ? "text" : "password"}
                  id='password'
                  variant='filled'
                  label='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge='end'
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Button
                variant='standart'
                size='small'
                color='success'
                onClick={handleClickSignUp}
                sx={{ fontSize: 12 }}
              >
                Don't have an account?
                <Box
                  component='span'
                  sx={{ textDecoration: "underline", marginLeft: 1 }}
                >
                  Sign Up!
                </Box>
              </Button>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Button type='submit' variant='contained'>
                Sign in
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;

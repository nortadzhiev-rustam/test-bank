import React from "react";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/userSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  Paper,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  Typography,
  FilledInput,
  Select,
  MenuItem,
  Alert,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";

const useStyles = makeStyles({
  root: {
    width: "100%",
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
    padding: 20,
    borderRadius: 10,
    transition: "all 0.7s ease-in-out",
    "&:hover": {
      boxShadow: "0px 0px 20px 10px rgba(0,0,0,0.2)",
      transform: "translate3D(0, -10px, 20px)",
    },
  },
  textField: { marginBlock: 10, color: "#fff" },
});

const Register = ({ setIsLogin, history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const departments = useSelector((state) => state.department.department);
  const [values, setValues] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    showPassword: false,
    showPasswordConfirm: false,
    departmentId: 0,
  });
  const [error, setError] = React.useState("");
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const navigate = useNavigate();
  React.useEffect(() => {
    const isLogged = async (status) => {
      if (status) {
        await navigate("/");
      }
    };

    isLogged(isLoggedIn);
  }, [navigate, isLoggedIn]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      firstName,
      lastName,
      email,
      password,
      passwordConfirm,
      departmentId,
    } = values;
    if (password !== passwordConfirm) {
      setError("Passwords do not match");
    } else {
      try {
        const res = await axios.post(
          `${
            process.env.NODE_ENV === "production"
              ? "https://backend.rustamnortadzhiev.com"
              : "http://localhost:5000"
          }/api/v1/register`,
          {
            firstName,
            lastName,
            email,
            password,
            departmentId,
          },
          { withCredentials: true }
        );

        if (res.data.error) {
          setError(res.data.error);
        } else {
          setValues({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            passwordConfirm: "",
            showPassword: false,
            showPasswordConfirm: false,
            department: "",
            error: "",
          });
          dispatch(login(res.data));

          window.location.replace("/");
        }
      } catch (err) {
        setError(err.response.data.message);
      }
    }
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleClickShowPasswordConfirm = () => {
    setValues({ ...values, showPasswordConfirm: !values.showPasswordConfirm });
  };

  React.useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }, [error]);

  return (
    //form for register with material-ui

    <Box className={classes.root} sx={{ my: { xs: "100px" } }}>
      {error !== "" && (
        <Alert
          className='animate__animated animate__fadeIn'
          sx={{ width: "550px", position: "relative" }}
          severity='error'
        >
          {error}
        </Alert>
      )}
      <Paper
        sx={{
          borderRadius: "15px",
          padding: { md: "40px", xs: "20px" },

          margin: { xs: "20px" },
          backgroundColor: "#006064",
        }}
        elevation={10}
        className='animate__animated animate__bounceIn animate__slow'
      >
        <Typography
          variant='h3'
          fontWeight='bold'
          sx={{
            textAlign: "center",
            marginBottom: { xs: 2, md: 5 },
            textTransform: "uppercase",
          }}
          color='white'
        >
          Sign-up
        </Typography>
        <form noValidate className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={1} className={classes.textField}>
            <Grid item xs={12} sm={6}>
              <TextField
                color='success'
                size='small'
                autoComplete='fname'
                fullWidth
                onChange={handleChange("firstName")}
                label='First Name'
                variant='filled'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                color='success'
                size='small'
                fullWidth
                autoComplete='lname'
                onChange={handleChange("lastName")}
                label='Last Name'
                variant='filled'
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} className={classes.textField}>
            <Grid item xs={12}>
              <TextField
                color='success'
                type='email'
                size='small'
                fullWidth
                onChange={handleChange("email")}
                email='email'
                label='Email'
                variant='filled'
                autoComplete='email'
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} className={classes.textField}>
            <Grid item xs={12} sm={6}>
              <FormControl
                size='small'
                sx={{ width: "100%" }}
                variant='filled'
                color='success'
              >
                <InputLabel htmlFor='outlined-adornment-password'>
                  Password
                </InputLabel>
                <FilledInput
                  fullWidth
                  id='outlined-adornment-password'
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange("password")}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge='end'
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label='Password'
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl
                size='small'
                fullWidth
                color='success'
                variant='filled'
              >
                <InputLabel htmlFor='outlined-adornment-passwordConfirm'>
                  Confirm Password
                </InputLabel>
                <FilledInput
                  name='passwordConfirm'
                  id='outlined-adornment-passwordConfirm'
                  type={values.showPasswordConfirm ? "text" : "password"}
                  value={values.passwordConfirm}
                  onChange={handleChange("passwordConfirm")}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={handleClickShowPasswordConfirm}
                        onMouseDown={handleMouseDownPassword}
                        edge='end'
                      >
                        {values.showPasswordConfirm ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label='Password'
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={1} className={classes.textField}>
            <Grid item xs={12} sm={6}>
              <FormControl
                fullWidth
                size='small'
                variant='filled'
                color='success'
              >
                <InputLabel htmlFor='select-role'>Department</InputLabel>
                <Select
                  variant='filled'
                  value={values.departmentId || ""}
                  onChange={(event) =>
                    setValues({ ...values, departmentId: event.target.value })
                  }
                  labelId='select-role'
                  label='Department'
                >
                  {departments.map((department) => (
                    <MenuItem key={department.id} value={department.id}>
                      {department.name}
                    </MenuItem>
                  ))}
                </Select>
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
                onClick={() => navigate("/login")}
                variant='standart'
                color='info'
              >
                Already have an account?{" "}
                <Box
                  component='span'
                  sx={{ textDecoration: "underline", marginLeft: 1 }}
                >
                  Login!
                </Box>
              </Button>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Button
                variant='contained'
                sx={{ bgcolor: "#006064", "&:hover": { bgcolor: "#004d40" } }}
                type='submit'
              >
                Sign up
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default Register;

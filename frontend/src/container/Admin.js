import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Typography, Box } from "@mui/material";
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
const Admin = () => {
  //department registering
  const [department, setDepartment] = useState("");
  const [departmentError, setDepartmentError] = useState("");
  const [departmentSuccess, setDepartmentSuccess] = useState("");
  const [departmentList, setDepartmentList] = useState([]);
  const handleDepartment = (e) => {
    setDepartment(e.target.value);
  };

  const handleDepartmentSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/v1/departments", { name: department })
      .then((res) => {
        setDepartmentSuccess(res.data.message);
        setDepartmentError("");
      })
      .catch((err) => {
        setDepartmentError(err.response.data.message);
        setDepartmentSuccess("");
      });
    setDepartment("");
  };

  //department listing
  const handleDepartmentList = () => {
    axios
      .get("http://localhost:5000/api/v1/departments")
      .then((res) => {
        setDepartmentList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //user listing
  const [userList, setUserList] = useState([]);
  const handleUserList = () => {
    axios
      .get("http://localhost:5000/api/v1/users")
      .then((res) => {
        setUserList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                width: '100vw',
                backgroundColor: '#f5f5f5',
            }}
        >
            <Typography variant='h4' sx={{ marginBottom: '1rem' }}>
                Admin
            </Typography>
            <Grid2 container spacing={2}>
                <Grid2 item xs={12} sm={6}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%',
                            width: '100%',
                            backgroundColor: '#fff',
                            padding: '1rem',
                            borderRadius: '0.5rem',
                        }}
                    >
                        <Typography variant='h5' sx={{ marginBottom: '1rem' }}>
                            Department
                        </Typography>
                        <form onSubmit={handleDepartmentSubmit}>
                            <TextField

                                label='Department'
                                variant='outlined'
                                sx={{ marginBottom: '1rem' }}
                                value={department}
                                onChange={handleDepartment}
                            />
                            <Button

                                variant='contained'
                                type='submit'
                                sx={{ marginBottom: '1rem' }}
                            >
                                Register
                            </Button>
                        </form>
                        <Typography variant='h6' sx={{ marginBottom: '1rem' }}>
                            Department List
                        </Typography>
                        <Button variant='contained' onClick={handleDepartmentList}>
                            List
                        </Button>
                        <ul>
                            {departmentList.map((department) => (
                                <li key={department.id}>{department.name}</li>
                            ))}
                        </ul>
                    </Box>
                </Grid2>
                <Grid2 item xs={12} sm={6}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%',
                            width: '100%',
                            backgroundColor: '#fff',
                            padding: '1rem',
                            borderRadius: '0.5rem',
                        }}
                    >
                        <Typography variant='h5' sx={{ marginBottom: '1rem' }}>
                            User
                        </Typography>
                        <Typography variant='h6' sx={{ marginBottom: '1rem' }}>
                            User List
                        </Typography>
                        <Button variant='contained' onClick={handleUserList}>
                            List
                        </Button>
                        <ul>
                            {userList.map((user) => (
                                <li key={user.id}>{user.firstName}</li>
                            ))}
                        </ul>
                    </Box>
                </Grid2>
            </Grid2>
        </Box>
    </div>

  );
};

export default Admin;

// Admin panel to ad department and see all users with jsx
import React, { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  Button,
  Box,
  TextField,
  List,
  IconButton,
} from "@mui/material";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const Admin = () => {
  //departments
  const [departments, setDepartments] = React.useState([]);
  const [department, setDepartment] = React.useState("");
  //users
  const [users, setUsers] = React.useState([]);
  const [isHover, setHover] = useState(false);

  //get departments
  useEffect(() => {
    const getDepartments = async () => {
      const res = await axios.get("http://localhost:5000/api/v1/departments");
      setDepartments(res.data);
    };
    getDepartments();
  }, []);

  //get users
  useEffect(() => {
    const getUsers = async () => {
      const res = await axios.get("http://localhost:5000/api/v1/users");
      setUsers(res.data);
    };
    getUsers();
  }, []);

  //add department
  const addDepartment = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:5000/api/v1/departments", {
      name: department,
    });
    setDepartments([...departments, res.data.department]);
    setDepartment("");
  };

  //delete department
  const deleteDepartment = async (id) => {
    await axios.delete(`http://localhost:5000/api/v1/departments/${id}`);
    setDepartments(departments.filter((department) => department.id !== id));
  };

  return (
    <Box
      style={{
        width: "90%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        margin: 10,
        transition: "all 0.5s ease",
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper elevation={10} style={{ padding: 20 }}>
            <Typography variant='h6'>Departments</Typography>
            <Box
              component='form'
              mt={2}
              display='flex'
              justifyContent='center'
              alignItems='center'
              onSubmit={addDepartment}
            >
              <TextField
                label='Department'
                variant='outlined'
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                size='small'
              />
              <Button
                variant='contained'
                size='medium'
                color='primary'
                onClick={addDepartment}
              >
                Add
              </Button>
            </Box>
            <List>
              {departments.map((department) => (
                <Box
                  component='li'
                  key={department.id}
                  display='flex'
                  justifyContent='space-between'
                  alignItems='center'
                  mt={2}
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}
                  id={department.id}
                >
                  <Typography>{department.name}</Typography>
                  {isHover && (
                    <IconButton
                      size='small'
                      color='error'
                      onClick={() => deleteDepartment(department.id)}
                    >
                      <FontAwesomeIcon icon={faTrashCan} />
                    </IconButton>
                  )}
                </Box>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={10} style={{ padding: 20 }}>
            <Typography variant='h6'>Users</Typography>
            <List>
              {users.map((user) => (
                <Box
                  component='li'
                  key={user.id}
                  display='flex'
                  justifyContent='space-between'
                  alignItems='center'
                  mt={2}
                >
                  <Typography>
                    {user.firstName + " " + user.lastName}
                  </Typography>
                  <Typography>{user.department.name}</Typography>
                </Box>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
export default Admin;

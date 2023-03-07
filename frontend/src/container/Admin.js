// Admin panel to ad department and see all users with jsx
import React, { useEffect } from "react";
import {
  Grid,
  Paper,
  Typography,
  Button,
  Box,
  TextField,
  List,
} from "@mui/material";
import axios from "axios";

import PersonalCard from "../components/PersonalCard";
import DepartmentCard from "../components/DepartmentCard";
const Admin = ({ showNav, setShowNav }) => {
  //departments
  const [departments, setDepartments] = React.useState([]);
  const [department, setDepartment] = React.useState("");
  //users
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    if (showNav === false) setShowNav(true);
  }, [showNav, setShowNav]);

  //get departments
  useEffect(() => {
    const getDepartments = async () => {
      const res = await axios.get("https://www.backend.rustamnortadzhiev.com/api/v1/departments");
      setDepartments(res.data);
    };
    getDepartments();
  }, []);

  //get users
  useEffect(() => {
    const getUsers = async () => {
      const res = await axios.get("https://www.backend.rustamnortadzhiev.com/api/v1/users");
      setUsers(res.data);
    };
    getUsers();
  }, []);

  //add department
  const addDepartment = async (e) => {
    e.preventDefault();
    const res = await axios.post("https://www.backend.rustamnortadzhiev.com/api/v1/departments", {
      name: department,
    });
    setDepartments([...departments, res.data.department]);
    setDepartment("");
  };

  //delete department
  const deleteDepartment = async (id) => {
    await axios.delete(`https://www.backend.rustamnortadzhiev.com/api/v1/departments/${id}`);
    setDepartments(departments.filter((department) => department.id !== id));
  };

  return (
    <Box
      style={{
        width: "98%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        margin: 10,
        transition: "all 0.5s ease",
      }}
    >
      <Grid container spacing={2}>
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
            <List sx={{ maxHeight: 345, overflow: "auto" }}>
              {departments.map((department) => (
                <DepartmentCard
                  key={department.id}
                  department={department}
                  onDelete={deleteDepartment}
                />
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={10} style={{ padding: 20 }}>
            <Typography variant='h6'>Users</Typography>
            <List sx={{ maxHeight: 400, overflow: "auto" }}>
              {users.map((user) => (
                <PersonalCard key={user.id} user={user} />
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
export default Admin;

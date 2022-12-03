import React, { useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import {
  AddBox,
  Inventory2,
  Person,
  SaveAlt,
  TextSnippet,
} from "@mui/icons-material";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import TestView from "../components/TestView";

import axios from "axios";
export default function MyLibrary({ showNav, setShowNav }) {
  const [testData, setTestData] = useState([]);

  const user = useSelector((state) => state.user.user.user);
  let [searchParams, setSearchParams] = useSearchParams();
  React.useEffect(() => {
    if (showNav === false) setShowNav(true);
  }, [showNav, setShowNav]);
  const handleClick = (search) => {
    setSearchParams(search);
  };
  React.useEffect(() => {
    axios.get("http://localhost:5000/api/v1/tests").then((res) => {
      console.log(res.data);
      setTestData(res.data);
    });
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/v1/test/${id}`);
      setTestData(testData.filter((item) => item.id !== id));
      console.log(res.message);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Grid mx={10} width='100%' container spacing={2} mt={15} height='100%'>
      <Grid xs={12} md={4} lg={3} xl={2}>
        <Stack
          spacing={4}
          position={{ xs: "static", lg: "fixed" }}
          width={{ xs: "100%", lg: "250px" }}
        >
          {" "}
          <Typography
            variant='h4'
            fontWeight='bold'
            fontFamily='Sans-Serif'
            color='#666666'
          >
            My Library
          </Typography>
          <Stack width='100%' direction='row' flexWrap='wrap'>
            <List component='nav' sx={{ display: "flex", flexWrap: "wrap" }}>
              <ListItem disablePadding>
                <ListItemButton
                  selected={searchParams.has("allTest")}
                  onClick={() => handleClick("allTest=true")}
                >
                  <ListItemIcon>
                    <Inventory2 />
                  </ListItemIcon>
                  <ListItemText primary='All my content' />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  selected={searchParams.has("madeByMe")}
                  onClick={() => handleClick("madeByMe=true")}
                >
                  <ListItemIcon>
                    <Person />
                  </ListItemIcon>
                  <ListItemText primary='Prepared by me' />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  selected={searchParams.has("imported")}
                  onClick={() => handleClick("imported=true")}
                >
                  <ListItemIcon>
                    <SaveAlt />
                  </ListItemIcon>
                  <ListItemText primary='Imported' />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  selected={searchParams.has("drafts")}
                  onClick={() => handleClick("drafts=true")}
                >
                  <ListItemIcon>
                    <TextSnippet />
                  </ListItemIcon>
                  <ListItemText primary='Drafts' />
                </ListItemButton>
              </ListItem>
            </List>
          </Stack>
          <Divider />
          <Stack spacing={2}>
            <Button
              startIcon={<AddBox />}
              color='inherit'
              size='small'
              variant='contained'
            >
              Collections
            </Button>
          </Stack>
        </Stack>
      </Grid>
      <Grid
        xs={12}
        md={8}
        lgOffset={3}
        xlOffset={0}
        lg={9}
        ml={3}
        height='100%'
      >
        <Stack
          width='100%'
          height='100%'
          spacing={2}
          ml={{ xs: 0, md: "70px" }}
          mt={10}
          justifyContent='flex-start'
        >
          {testData
            .filter((item) => item.userId === user.id)
            .map((data, idx) => (
              <TestView
                key={idx}
                testData={data}
                user={data.user}
                handleDelete={handleDelete}
              />
            ))}
        </Stack>
      </Grid>
    </Grid>
  );
}

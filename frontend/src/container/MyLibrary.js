import React, { useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import {
  Box,
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
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import TestView from "../components/TestView";
import { setLoading } from "../store/userSlice";
import axios from "axios";
export default function MyLibrary({ showNav, setShowNav }) {
  const [testData, setTestData] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      setTestData(
        res.data.filter((test) => test.userId === user.id).map((item) => item)
      );
    });
  }, []);

  return (
    <Grid mx={10} width='100%' container spacing={2} mt={20}>
      <Grid xs={12} md={4}>
        <Stack spacing={4}>
          {" "}
          <Typography
            variant='h4'
            fontWeight='bold'
            fontFamily='Sans-Serif'
            color='#666666'
          >
            My Library
          </Typography>
          <Box width='100%'>
            <List component='nav'>
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
          </Box>
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
      <Grid xs={12} md={8}>
        <Stack width='100%' spacing={2}>
          {testData.map((data) => (
            <TestView testData={data} user={data.user} />
          ))}
        </Stack>
      </Grid>
    </Grid>
  );
}

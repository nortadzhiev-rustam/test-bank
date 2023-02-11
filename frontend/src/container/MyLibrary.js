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
  Slide,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import {
  CreateNewFolder,
  Inventory2,
  Person,
  SaveAlt,
  TextSnippet,
} from "@mui/icons-material";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import TestView from "../components/TestView";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});
export default function MyLibrary({ showNav, setShowNav }) {
  const [testData, setTestData] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const [visibility, setVisibility] = useState("Public");
  const [collectionName, setCollectionName] = useState("");
  const [collections, setCollections] = useState([]);
  const handleChange = (event) => {
    setVisibility(event.target.value);
  };
  const user = useSelector((state) => state.user.user.user);
  let [searchParams, setSearchParams] = useSearchParams();
  React.useEffect(() => {
    if (showNav === false) setShowNav(true);
    document.title = "Test Generator";
  }, [showNav, setShowNav]);
  const handleClick = (search) => {
    setSearchParams(search);
  };
  React.useEffect(() => {
    axios
      .get("https://www.backend.rustamnortadzhiev.com/api/v1/tests")
      .then((res) => {
        console.log(res.data);
        setTestData(res.data);
      });
  }, []);

  React.useEffect(() => {
    axios
      .get("https://www.backend.rustamnortadzhiev.com/api/v1/collections")
      .then((res) => {
        setCollections(res.data);
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `https://www.backend.rustamnortadzhiev.com/api/v1/test/${id}`
      );
      setTestData(testData.filter((item) => item.id !== id));
      console.log(res.message);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDialogOpen = () => {
    setOpen(!isOpen);
    setCollectionName("");
  };

  const handleSubmit = async () => {
    const data = {
      name: collectionName,
      visibility,
      userId: user.id,
    };
    try {
      const res = await axios.post(
        `https://www.backend.rustamnortadzhiev.com/api/v1/collection`,
        data
      );

      handleDialogOpen();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Grid mx={2} width='100%' container spacing={2} my={15} height='100%'>
      <Dialog
        maxWidth='sm'
        fullWidth
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleDialogOpen}
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle>{"Create a new Collection"}</DialogTitle>
        <DialogContent>
          <Stack spacing={1}>
            <TextField
              sx={{ margin: 1 }}
              value={collectionName}
              onChange={(e) => setCollectionName(e.target.value)}
              variant='outlined'
              label='Enter collection name'
              placeholder='e.g Exams, Physics, Quiz, etc.'
            />
            <FormControl>
              <FormLabel id='demo-controlled-radio-buttons-group'>
                Visibility
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby='demo-controlled-radio-buttons-group'
                name='controlled-radio-buttons-group'
                value={visibility}
                onChange={handleChange}
              >
                <FormControlLabel
                  value='Private'
                  control={<Radio />}
                  label='Private'
                />
                <FormControlLabel
                  value='Public'
                  control={<Radio />}
                  label='Public'
                />
              </RadioGroup>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' color='error' onClick={handleDialogOpen}>
            {"Cancel"}
          </Button>
          <Button
            variant='contained'
            onClick={handleSubmit}
            disabled={collectionName === ""}
          >
            {"Create"}
          </Button>
        </DialogActions>
      </Dialog>
      <Grid xs={12} lgOffset={1} xl={2}>
        <Stack
          spacing={4}
          position={{ xs: "static", xl: "fixed" }}
          width={{ xs: "100%", xl: "300px" }}
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
            <List
              component='nav'
              sx={{
                display: "flex",
                flexDirection: { xs: "row", xl: "column" },
                flexWrap: "wrap",
              }}
            >
              <ListItem disablePadding sx={{ width: 300 }}>
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
              <ListItem disablePadding sx={{ width: 300 }}>
                <ListItemButton
                  selected={searchParams.has("madeByMe")}
                  onClick={() => handleClick("madeByMe=true")}
                >
                  <ListItemIcon>
                    <Person />
                  </ListItemIcon>
                  <ListItemText primary='Prepared by me' />
                  <Typography>
                    {testData.filter((item) => item.userId === user.id).length}
                  </Typography>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding sx={{ width: 300 }}>
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
              <ListItem disablePadding sx={{ width: 300 }}>
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
          <Stack
            spacing={2}
            maxWidth={{ xs: "100%", sm: "40%", md: "30%", xl: "100%" }}
          >
            <Typography
              display={{ xs: "none", xl: "flex" }}
              textTransform='uppercase'
              color='dimgray'
            >
              Collections
            </Typography>
            <Stack
              spacing={2}
              direction={{ xs: "column", xl: "column-reverse" }}
            >
              <Stack direction={{ xs: "row", xl: "column" }} spacing={1}>
                {collections
                  .filter((item) => item.userId === user.id)
                  .map((collection) => (
                    <Stack
                      sx={{
                        "&:hover": {
                          boxShadow: 2,
                          bgcolor: "white",
                        },
                        cursor: "pointer",
                      }}
                      key={collection.name}
                      spacing={1}
                      alignItems='center'
                      direction='row'
                      color='#6c757d'
                      p={0.5}
                      px={1}
                      borderRadius={2}
                      width='100%'
                      justifyContent='space-between'
                    >
                      <Stack direction='row' spacing={1} alignItems='center'>
                        <FontAwesomeIcon icon={faFolder} />

                        <Typography>{collection.name}</Typography>
                      </Stack>
                      <Typography textAlign='right'>
                        {collection.Tests.length}
                      </Typography>
                    </Stack>
                  ))}
              </Stack>
              <Button
                startIcon={<CreateNewFolder />}
                color='inherit'
                size='small'
                variant='contained'
                onClick={handleDialogOpen}
                fullWidth
              >
                Collections
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Grid>
      <Grid
        xs={12}
        md={11}
        lgOffset={3}
        lg={8}
        xl={7}
        ml={{ xs: 0, lg: 3 }}
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

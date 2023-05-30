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
import Skeleton from "@mui/material/Skeleton";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});
export default function MyLibrary({ showNav, setShowNav }) {
  const [testData, setTestData] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const [visibility, setVisibility] = useState("Public");
  const [collectionName, setCollectionName] = useState("");
  const [collections, setCollections] = useState([]);
  const [isActive, setActive] = React.useState(false);
  const [selected, setSelected] = React.useState(0);
  const [isLoading, setLoading] = React.useState(false);
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
    setLoading(true);
    axios
      .get("https://backend.rustamnortadzhiev.com/api/v1/tests")
      .then((res) => {
        console.log(res.data);
        setTestData(res.data);
        setLoading(false);
      });
  }, []);

  React.useEffect(() => {
    axios
      .get("https://backend.rustamnortadzhiev.com/api/v1/collections")
      .then((res) => {
        setCollections(res.data);
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `https://backend.rustamnortadzhiev.com/api/v1/test/${id}`
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
    setLoading(true);
    const data = {
      name: collectionName,
      visibility,
      userId: user.id,
    };
    try {
      const res = await axios.post(
        `https://backend.rustamnortadzhiev.com/api/v1/collection`,
        data
      );
      setCollections((prevState) => [...prevState, res.data.collection]);
      handleDialogOpen();
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSelect = (id) => {
    setActive(true);
    setSelected(id);
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
      <Grid xs={12} lgOffset={0.5} lg={3} xl={2}>
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
          {isLoading && (
            <Stack spacing={1}>
              {Array(4)
                .fill()
                .map((_, idx) => (
                  <Stack width='100%' direction='row' key={idx} spacing={2}>
                    {" "}
                    <Skeleton variant='rounded' width={40} height={40} />
                    <Skeleton
                      variant='text'
                      sx={{ fontSize: "1rem", width: "90%" }}
                    />
                    <Skeleton
                      variant='text'
                      sx={{ fontSize: "1rem", width: "10%" }}
                    />
                  </Stack>
                ))}
            </Stack>
          )}
          {!isLoading && (
            <Stack width='100%' direction='row' flexWrap='wrap'>
              <List
                component='nav'
                sx={{
                  display: "flex",
                  flexDirection: { xs: "row", lg: "column" },
                  flexWrap: "wrap",
                }}
              >
                <ListItem disablePadding sx={{ width: 250 }}>
                  <ListItemButton
                    selected={searchParams.has("allTest")}
                    onClick={() => handleClick("allTest=true")}
                  >
                    <ListItemIcon>
                      <Inventory2 />
                    </ListItemIcon>
                    <ListItemText primary='All my content' />
                    <Typography>
                      {
                        testData.filter((item) => item.userId === user.id)
                          .length
                      }
                    </Typography>
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding sx={{ width: 250 }}>
                  <ListItemButton
                    selected={searchParams.has("madeByMe")}
                    onClick={() => handleClick("madeByMe=true")}
                  >
                    <ListItemIcon>
                      <Person />
                    </ListItemIcon>
                    <ListItemText primary='Prepared by me' />
                    <Typography>
                      {
                        testData.filter((item) => item.userId === user.id)
                          .length
                      }
                    </Typography>
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding sx={{ width: 250 }}>
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
                <ListItem disablePadding sx={{ width: 250 }}>
                  <ListItemButton
                    selected={searchParams.has("drafts")}
                    onClick={() => handleClick("drafts=true")}
                  >
                    <ListItemIcon>
                      <TextSnippet />
                    </ListItemIcon>
                    <ListItemText primary='Drafts' />
                    <Typography>
                      {
                        testData.filter(
                          (item) => item.userId === user.id && item.isEditing
                        ).length
                      }
                    </Typography>
                  </ListItemButton>
                </ListItem>
              </List>
            </Stack>
          )}
          <Divider />
          {isLoading && (
            <Stack width='100%' spacing={1}>
              <Stack width='100%' direction='row' spacing={2}>
                <Skeleton
                  variant='text'
                  sx={{ fontSize: "1rem", width: "100%" }}
                />
                <Skeleton variant='rounded' width={60} height={30} />
              </Stack>
              {Array(5)
                .fill()
                .map((_, idx) => (
                  <Stack width='100%' direction='row' key={idx} spacing={2}>
                    {" "}
                    <Skeleton variant='rounded' width={20} height={20} />
                    <Skeleton
                      variant='text'
                      sx={{ fontSize: "1rem", width: "90%" }}
                    />
                    <Skeleton
                      variant='text'
                      sx={{ fontSize: "1rem", width: "10%" }}
                    />
                  </Stack>
                ))}
            </Stack>
          )}
          {!isLoading && (
            <Stack spacing={2} maxWidth={{ xs: "100%" }}>
              <Stack
                direction='row'
                justifyContent='space-between'
                alignItems='center'
                display={{ xs: "none", lg: "flex" }}
              >
                <Typography color='dimgray'>My Collections</Typography>
                <Button
                  startIcon={<CreateNewFolder />}
                  color='success'
                  size='small'
                  variant='outlined'
                  onClick={handleDialogOpen}
                >
                  New
                </Button>
              </Stack>

              <Stack
                spacing={2}
                direction={{ xs: "column", lg: "column-reverse" }}
              >
                <Stack
                  direction={{ xs: "row", lg: "column" }}
                  flexWrap={{ xs: "wrap", lg: "nowrap" }}
                  spacing={{ xs: 0, sm: 1 }}
                  justifyContent='flex-start'
                >
                  {collections
                    .filter((item) => item.userId === user.id)
                    .map((collection, idx) => (
                      <Stack
                        sx={{
                          "&:hover": {
                            boxShadow: 2,
                            bgcolor: "white",
                          },
                          cursor: "pointer",
                          boxShadow: isActive && selected === idx ? 2 : 0,
                          bgcolor:
                            isActive && selected === idx ? "white" : "none",
                        }}
                        key={collection.name}
                        spacing={1}
                        alignItems='center'
                        direction='row'
                        color='#6c757d'
                        p={0.5}
                        px={1}
                        borderRadius={1}
                        justifyContent='space-between'
                        onClick={() => handleSelect(idx)}
                      >
                        <Stack direction='row' spacing={1} alignItems='center'>
                          <FontAwesomeIcon icon={faFolder} />

                          <Typography>{collection.name}</Typography>
                        </Stack>
                        <Typography textAlign='right'>
                          {collection.Tests && collection.Tests.length}
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
                  sx={{
                    display: { xs: "flex", lg: "none" },
                    width: { xs: "150px" },
                  }}
                >
                  Collections
                </Button>
              </Stack>
            </Stack>
          )}
        </Stack>
      </Grid>
      <Grid xs={12} lg={7} xl={8} ml={{ xs: 0, lg: 5, xl: 10 }} height='100%'>
        {isLoading && (
          <Stack mt={10}>
            {Array(5)
              .fill()
              .map((_, idx) => (
                <Stack
                  width='100%'
                  spacing={1}
                  bgcolor='white'
                  p={1.5}
                  borderRadius={1}
                  key={idx}
                  mb={2}
                >
                  <Stack width='100%' direction='row' spacing={1}>
                    <Stack spacing={1}>
                      <Skeleton variant='rounded' width={100} height={100} />
                    </Stack>
                    <Stack width='100%' spacing={1}>
                      <Skeleton variant='text' sx={{ fontSize: "1rem" }} />
                      <Skeleton variant='text' sx={{ fontSize: "1rem" }} />
                      <Skeleton variant='text' sx={{ fontSize: "1rem" }} />
                    </Stack>
                  </Stack>
                  <Stack direction='row' spacing={1} alignItems='center'>
                    <Skeleton variant='circular' width={40} height={40} />
                    <Skeleton
                      variant='text'
                      sx={{ fontSize: "1rem", width: 230 }}
                    />
                    <Skeleton variant='rounded' width={100} height={30} />
                    <Skeleton variant='rounded' width={100} height={30} />
                    <Skeleton variant='rounded' width={100} height={30} />
                  </Stack>
                </Stack>
              ))}
          </Stack>
        )}

        {!isLoading && (
          <Stack
            width='95%'
            height='100%'
            spacing={2}
            ml={{ xs: 0, md: "30px" }}
            mr={{ xs: 0, md: "50px", lg: 0 }}
            mt={10}
            justifyContent='flex-start'
          >
            {testData
              .filter((item) => item.userId === user.id)
              .map((data) => (
                <TestView
                  key={data.id}
                  testData={data}
                  user={data.user}
                  handleDelete={handleDelete}
                  collections={collections}
                  setCollections={setCollections}
                />
              ))}
          </Stack>
        )}
      </Grid>
    </Grid>
  );
}

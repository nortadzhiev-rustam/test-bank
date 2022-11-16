import React from "react";

import {
  Box,
  FormControl,
  InputBase,
  Typography,
  InputAdornment,
  Paper,
  Stack,
  Backdrop,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ChevronRightTwoTone } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { styled, alpha } from "@mui/material/styles";
import Slider from "../components/CardSlider";
import MainDepartments from "../components/MainDepartments";
const Search = styled(Paper)(({ theme }) => ({
  position: "relative",
  height: 70,

  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: 800,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 15,
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#006064",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
  },
}));

const Default = () => {
  const [name, setName] = React.useState("");
  const departments = useSelector((state) => state.department.department);
  const [open, setOpen] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  const handleClick = (name) => {
    setName(name);
    handleToggle();
  };

  React.useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        handleClose();
        setName("");
      }
    });
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",

        paddingTop: 30,
      }}
    >
      <Box width='100%' display='flex' justifyContent='center'>
        <Stack direction='column' justifyContent='center' alignItems='center'>
          <Search
            sx={{ marginTop: 3, marginLeft: 1 }}
            elevation={5}
            onBlur={() => {
              setFocused(false);
              setOpen(false);
              setName("");
            }}
          >
            <StyledInputBase
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              fullWidth
              sx={{ fontSize: "1.3rem" }}
              placeholder='Search for test on any topic'
              inputProps={{ "aria-label": "search" }}
              endAdornment={
                <InputAdornment
                  sx={{ padding: "10px", cursor: "pointer" }}
                  position='end'
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginRight: 5,
                    }}
                  >
                    <ChevronRightTwoTone fontSize='large' />
                  </Box>
                </InputAdornment>
              }
              startAdornment={
                name === "" ? (
                  <InputAdornment position='start'>
                    <SearchIconWrapper>
                      <SearchIcon fontSize='large' />
                    </SearchIconWrapper>
                  </InputAdornment>
                ) : (
                  <Box
                    ml={2}
                    bgcolor='#9a031e'
                    p={1}
                    color='white'
                    borderRadius={3}
                    width={120}
                    justifyContent='center'
                    display='flex'
                  >
                    {name}
                  </Box>
                )
              }
            />
          </Search>

          {open || focused ? (
            <Paper
              elevation={5}
              style={{
                width: 800,
                height: 200,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
                marginTop: 10,
                marginLeft: -8,
              }}
            ></Paper>
          ) : null}
        </Stack>
      </Box>
      {!open && !focused && (
        <Stack
          width='100%'
          justifyContent='center'
          direction='row'
          spacing={2}
          mb={5}
          mt={20}
        >
          {departments.map((item, idx) => (
            <MainDepartments key={idx} name={item.name} onClick={handleClick} />
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default Default;

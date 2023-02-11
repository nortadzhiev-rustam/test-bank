import React, { useRef } from "react";
import "./Default.css";
import { Box, InputBase, InputAdornment, Paper, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ChevronRightTwoTone } from "@mui/icons-material";
import { styled, alpha } from "@mui/material/styles";
import MainDepartments from "../components/MainDepartments";
const mainDepartments = [
  { title: "Computers", id: 1 },
  { title: "Maths", id: 2 },
  { title: "Career ed", id: 3 },
  { title: "English", id: 4 },
  { title: "Social Studies", id: 5 },
  { title: "Languages", id: 6 },
  { title: "Science", id: 7 },
  { title: "Creative Arts", id: 8 },
];

const Search = styled(Paper)(({ theme }) => ({
  position: "relative",
  height: 70,

  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
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
    width: "100%",
  },
}));

const Default = ({ setShowNav, showNav }) => {
  const [name, setName] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  const ref = useRef(null);

  React.useEffect(() => {
    if (showNav === false) setShowNav(true);
    document.title = "Test Generator";
  }, [showNav, setShowNav]);

  const handleClose = () => {
    setOpen(false);
    setFocused(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  const handleClick = (name) => {
    ref.current.focus();
    setName(name);
    handleToggle();
    console.log(ref.current);
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
        justifyContent: { xs: "flex-start", md: "center" },
        alignItems: "center",

        paddingTop: 10,
      }}
    >
      <Box width='100%' display='flex' justifyContent='center'>
        <Stack
          width={{ xs: "85%", md: "65%" }}
          direction='column'
          justifyContent='center'
          alignItems='center'
        >
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
              inputRef={ref}
              onFocus={() => setFocused(true)}
              onBlur={() => (open ? setFocused(false) : null)}
              fullWidth
              sx={{ fontSize: { xs: "1rem", md: "1.3rem" } }}
              placeholder='Search for test on any topic'
              inputProps={{ "aria-label": "search" }}
              endAdornment={
                <InputAdornment
                  position='end'
                  sx={{
                    display: { xs: "none", md: "flex" },
                    padding: "10px",
                    cursor: "pointer",
                  }}
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
                    width={250}
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
              onClick={() => setFocused(true)}
              elevation={10}
              sx={{
                mt: 2,
                marginRight: 1,
                width: "100%",
                height: "200px",
                borderRadius: 3,
              }}
            ></Paper>
          ) : null}
        </Stack>
      </Box>
      {!open && !focused && (
        <Stack
          className='department-stack'
          overflow='scroll'
          height={200}
          width={{ xs: "85%", md: 650, lg: 850, xl: 1200 }}
          justifyContent={{ xs: "flex-start", lg: "center" }}
          alignItems='center'
          direction='row'
          // display={{ xs: "none", md: "flex" }}
          spacing={3}
          mb={5}
          mt={10}
          p={2}
        >
          {mainDepartments.map((item, idx) => (
            <MainDepartments
              key={idx}
              name={item.title}
              onClick={handleClick}
            />
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default Default;

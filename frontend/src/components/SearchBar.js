import { useState, useEffect } from "react";
import { InputBase, InputAdornment,  Paper,Box, Stack, List, ListItem, ListItemText } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ChevronRightTwoTone } from "@mui/icons-material";
import { styled, alpha } from "@mui/material/styles";
const MAX_RECENT_SEARCHES = 10;

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
  

function SearchBar({name, ref,open, setOpen, setFocused, setName, focused}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  // Retrieve the list of recent searches from local storage on mount
  useEffect(() => {
    const storedSearches = JSON.parse(localStorage.getItem("recentSearches"));
    setRecentSearches(storedSearches || []);
  }, []);

  // Add the new search query to the list of recent searches and save to local storage
  function handleSearch(event) {
    event.preventDefault();
    if (searchQuery.trim() !== "") {
      const updatedSearches = [searchQuery, ...recentSearches.slice(0, MAX_RECENT_SEARCHES - 1)];
      setRecentSearches(updatedSearches);
      localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
    }
  }

  // Update searchQuery state as user types
  function handleChange(event) {
    setSearchQuery(event.target.value);
  }

  // Display the list of recent searches when the user clicks on the search bar
  function handleSearchBarClick(event) {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  }

  return (
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
          ref={ref}
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
                  marginRight: 1,
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
  );
}

export default SearchBar;

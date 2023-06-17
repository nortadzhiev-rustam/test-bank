import React, { useState, useEffect } from "react";
import { styled, alpha, useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  InputBase,
  InputAdornment,
  Paper,
  Stack,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Typography,
  FormControl,
  MenuItem,
  Select,
  useMediaQuery,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

const topics = [
  "Integers",
  "Fractions",
  "Decimals",
  "Algebra",
  "Geometry",
  "Genetics",
  "Micro Biology",
  "Artificial Intelligence",
  "Python",
  "Java",
];

const Search = styled("div")(({ theme }) => ({
  height: 40,
  borderRadius: 10,

  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  paddingRight: 10,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "100%",
  },
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  width: "100%",
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

function NavSearchBar({ drawerOpen }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);
  const [searchBarWidth, setSearchBarWidth] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [tests, setTests] = useState([]);
  const [randomElements, setRandomElements] = useState([]);
  const [option, setOption] = React.useState("Test Library");
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const navigate = useNavigate();
  const match1 = useMediaQuery("(min-width:1440px)");
  const match2 = useMediaQuery("(min-width:1200px)");

  useEffect(() => {
    const getRandomElements = (arr, numElements) => {
      const shuffledArray = arr.sort(() => 0.5 - Math.random());
      return shuffledArray.slice(0, numElements);
    };

    const currentDate = new Date();
    const dayOfMonth = currentDate.getDate();

    Math.seed = dayOfMonth;
    Math.random = function () {
      Math.seed = (Math.seed * 9301 + 49297) % 233280;
      return Math.seed / 233280;
    };

    const randomElements = getRandomElements(topics, 4);
    setRandomElements(randomElements);
  }, []);

  useEffect(() => {
    const getRecentSearchesFromStorage = () => {
      const recentSearchesString = localStorage.getItem("recentSearches");
      if (recentSearchesString) {
        return JSON.parse(recentSearchesString);
      }
      return [];
    };

    const saveRecentSearchesToStorage = (searches) => {
      localStorage.setItem("recentSearches", JSON.stringify(searches));
    };

    const recentSearchesFromStorage = getRecentSearchesFromStorage();
    setRecentSearches(recentSearchesFromStorage);

    const storedDate = localStorage.getItem("resetDate");
    const currentDate = new Date().toISOString().split("T")[0];

    if (storedDate !== currentDate) {
      // Clear the recent searches and update the reset date
      setRecentSearches([]);
      localStorage.removeItem("recentSearches");
      localStorage.setItem("resetDate", currentDate);
    }
  }, []);

  useEffect(() => {
    axios
      .get(
        `${
          process.env.NODE_ENV === "production"
            ? "https://backend.rustamnortadzhiev.com"
            : "http://localhost:5000"
        }/api/v1/tests`
      )
      .then((res) => {
        setTests(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {
      setTests([]);
    };
  }, []);

  const addRecentSearch = (query) => {
    const updatedSearches = [query, ...recentSearches.slice(0, 4)];
    setRecentSearches(updatedSearches);
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
  };

  const filterArrayByName = (array, input) => {
    return array.filter((obj) =>
      obj.name.toLowerCase().includes(input.toLowerCase())
    );
  };

  const renderBoldText = (text) => {
    const words = text.split(" ");
    return words.map((word, index) => {
      const isMatch = word.toLowerCase().includes(searchQuery.toLowerCase());
      return isMatch ? (
        <strong key={index}>{word} </strong>
      ) : (
        <span key={index}>{word} </span>
      );
    });
  };

  // Update searchQuery state as user types
  function handleChange(event) {
    setSearchQuery(event.target.value);
  }

  // Display the list of recent searches when the user clicks on the search bar
  function handleSearchBarClick(event) {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    if (!open) {
      setOpen(true);
    }
    const searchBar = document.getElementById("search-bar");
    setSearchBarWidth(searchBar.getBoundingClientRect().width);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // addRecentSearch(searchQuery);
    navigate(`/admin/search/${searchQuery}`);
  };

  return (
    <Stack
      direction='column'
      width='100%'
      spacing={1}
      justifyContent='flex-end'
      alignItems='center'
      component='form'
      onSubmit={handleSubmit}
    >
      <Stack direction='row' width='100%'>
        <Search sx={{ width: "100%", py: "4px" }}>
          <StyledInputBase
            id='search-bar'
            sx={{ width: "100%", zIndex: 10 }}
            placeholder='Search…'
            inputProps={{ "aria-label": "search" }}
            startAdornment={
              <InputAdornment position='start'>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
              </InputAdornment>
            }
            onBlur={() => {
              setTimeout(() => {
                setOpen(false);
              }, 100);
            }}
            onChange={handleChange}
            onClick={handleSearchBarClick}
          />
          <Divider
            orientation='vertical'
            sx={{ display: { xs: "none", lg: "flex" } }}
          />
          <FormControl
            sx={{
              width: 140,
              padding: 1,
              display: { xs: "none", lg: "flex" },
            }}
            size='small'
          >
            <Select
              disableUnderline
              variant='standard'
              value={option}
              sx={{
                padding: 1,
                color: "white",
                boxShadow: "none",
              }}
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              onChange={(e) => setOption(e.target.value)}
            >
              <MenuItem value='Test Library'>Test Library</MenuItem>
              <MenuItem value='Khan Academy'>Khan Academy</MenuItem>
              <MenuItem value='YouTube'>YouTube</MenuItem>
            </Select>
          </FormControl>
        </Search>
      </Stack>
      {open && (
        <Paper
          sx={{
            width: searchBarWidth,
            position: "absolute",
            top: 43,
            right: { lg: 233, xl: 240 },
            p: 0.5,
            transition: "all 0.2s ease-in-out",
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            zIndex: 1,
            
          }}
          elevation={3}
        >
          {recentSearches.length > 0 && searchQuery.length < 3 && (
            <List dense>
              <ListItem>
                <Typography variant='h6' color='initial' fontWeight='bold'>
                  Recent Searches
                </Typography>
              </ListItem>
              <Divider component='li' sx={{ marginBlock: 1 }} />
              {recentSearches.map((recentSearch, index) => (
                <ListItemButton
                  key={index}
                  disablePadding
                  onClick={() => {
                    navigate(`/admin/search/${recentSearch}`);
                  }}
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgba(77,182,172,0.3)", // Customize the hover background color here
                      color: "#00796b",
                    },
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography variant='body2' color='inherit'>
                        {renderBoldText(recentSearch)}
                      </Typography>
                    }
                  />
                </ListItemButton>
              ))}
            </List>
          )}
          {searchQuery.length < 3 && recentSearches.length < 1 && (
            <List dense>
              <ListItem>
                <Typography variant='h5' color='initial' fontWeight='bold'>
                  Popular Topics
                </Typography>
              </ListItem>
              <Divider component='li' sx={{ marginBlock: 1 }} />
              {randomElements.map((topic, index) => (
                <ListItemButton
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgba(77,182,172,0.3)", // Customize the hover background color here
                      color: "#00796b",
                    },
                  }}
                  key={index}
                  onClick={() => {
                    navigate(`/admin/search/${topic}`);
                    setFocused(true);
                  }}
                >
                  <ListItemText primary={topic} />
                </ListItemButton>
              ))}
            </List>
          )}
          {searchQuery.length >= 3 &&
            filterArrayByName(tests, searchQuery).length > 0 && (
              <List
                dense={true}
                sx={{
                  maxHeight: 250,
                  overflowY: "hidden",
                  paddingBlock: 1.5,
                }}
              >
                {filterArrayByName(tests, searchQuery).map((test) => (
                  <ListItemButton
                    sx={{
                      "&:hover": {
                        backgroundColor: "rgba(77,182,172,0.3)", // Customize the hover background color here
                        color: "#00796b",
                      },
                    }}
                    key={test.id}
                    onClick={() => {
                      navigate(`/admin/search/${searchQuery}`);
                      addRecentSearch(searchQuery);
                    }}
                  >
                    <ListItemText>{renderBoldText(test.name)}</ListItemText>
                  </ListItemButton>
                ))}
              </List>
            )}
        </Paper>
      )}
    </Stack>
  );
}

export default NavSearchBar;

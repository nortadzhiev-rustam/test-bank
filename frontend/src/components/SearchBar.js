import { useState, useEffect } from "react";
import {
  InputBase,
  InputAdornment,
  Paper,
  Box,
  Stack,
  List,
  ListItem,
  Typography,
  Divider,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import { ChevronRightTwoTone } from "@mui/icons-material";
import { styled, alpha } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

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

function SearchBar({
  name,
  innerRef,
  open,
  setOpen,
  setFocused,
  setName,
  focused,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [tests, setTests] = useState([]);
  const [randomElements, setRandomElements] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const getRecentSearchesFromStorage = () => {
      const recentSearchesString = localStorage.getItem("recentSearches");
      if (recentSearchesString) {
        return JSON.parse(recentSearchesString);
      }
      return [];
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
  const addRecentSearch = (query) => {
    const updatedSearches = [query, ...recentSearches.slice(0, 4)];
    setRecentSearches(updatedSearches);
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
  };

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
  // Retrieve the list of recent searches from local storage on mount

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
  }

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

  return (
    <Box
      component='form'
      onSubmit={() => navigate(`/admin/search/${searchQuery}`)}
      width='100%'
      display='flex'
      justifyContent='center'
    >
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
            setTimeout(() => {
              setFocused(false);
              setOpen(false);
              setName("");
            }, 100);
          }}
        >
          <StyledInputBase
            inputRef={innerRef}
            onFocus={() => setFocused(true)}
            onBlur={() => (open ? setFocused(false) : null)}
            fullWidth
            sx={{ fontSize: { xs: "1rem", md: "1.3rem" } }}
            placeholder='Search for test on any topic'
            inputProps={{ "aria-label": "search" }}
            value={searchQuery}
            onChange={handleChange}
            onClick={handleSearchBarClick}
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
              name !== "" && (
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

        {open || searchQuery !== "" ? (
          <Paper
            elevation={10}
            sx={{
              mt: 1,
              marginRight: 1,
              width: "100%",

              borderRadius: 3,
            }}
          >
            {recentSearches.length > 0 && searchQuery.length < 3 && (
              <List dense>
                <ListItem>
                  <Typography variant='h5' color='initial' fontWeight='bold'>
                    Recent Searches
                  </Typography>
                </ListItem>
                <Divider component='li' sx={{ marginBlock: 1 }} />
                {recentSearches.map((recentSearch, index) => (
                  <ListItemButton
                    sx={{
                      "&:hover": {
                        backgroundColor: "rgba(77,182,172,0.3)", // Customize the hover background color here
                        color: "#00796b",
                      },
                    }}
                    key={index}
                    disablePadding
                    onClick={() => {
                      navigate(`/admin/search/${recentSearch}`);
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
        ) : null}
      </Stack>
    </Box>
  );
}

export default SearchBar;

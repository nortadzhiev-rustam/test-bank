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
import SearchIcon from "@mui/icons-material/Search";
import { ChevronRightTwoTone } from "@mui/icons-material";
import { styled, alpha } from "@mui/material/styles";
import axios from "axios";
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
  useEffect(() => {
    const storedSearches = JSON.parse(localStorage.getItem("recentSearches"));
    setRecentSearches(storedSearches || []);
  }, []);

  // Add the new search query to the list of recent searches and save to local storage
  function handleSearch(event) {
    event.preventDefault();
    if (searchQuery.trim() !== "") {
      const updatedSearches = [
        searchQuery,
        ...recentSearches.slice(0, MAX_RECENT_SEARCHES - 1),
      ];
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
    setOpen(true);
  }

  useEffect(() => {
    axios
      .get("https://backend.rustamnortadzhiev.com/api/v1/tests")
      .then((res) => {
        setTests(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
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

        {open ? (
          <Paper
            onClick={() => setFocused(true)}
            elevation={10}
            sx={{
              mt: 1,
              marginRight: 1,
              width: "100%",

              borderRadius: 3,
            }}
          >
            {searchQuery.length < 3 && (
              <List dense>
                <ListItem>
                  <Typography variant='h5' color='initial' fontWeight='bold'>
                    Popular Topics
                  </Typography>
                </ListItem>
                <Divider component='li' sx={{ marginBlock: 1 }} />
                {randomElements.map((topic, index) => (
                  <ListItemButton
                    key={index}
                    onClick={() => {
                      setOpen(false);
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
                        setOpen(false);
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

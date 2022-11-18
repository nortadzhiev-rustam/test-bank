import React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import {
  InputBase,
  InputAdornment,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Search = styled(Paper)(({ theme }) => ({
  position: "relative",
  height: 50,

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
  borderRadius: 5,
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

export default function TestEditingPage() {
  return (
    <Box
      sx={{
        flexGrow: 1,
        width: "100%",
        height: "100vh",
        mt: 10,
        justifyContent: "center",
        alignItem: "center",
      }}
    >
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid xs={12} md={8} mdOffset={2}>
          <Item>
            <Stack direction='row' alignItems='center' spacing={2}>
              <Stack
                direction='column'
                justifyContent='center'
                alignItems='flex-start'
                width='100%'
                spacing={1}
              >
                <Typography fontWeight='bold'>
                  Teleport questions from test library
                </Typography>
                <Search elevation={5}>
                  <StyledInputBase
                    fullWidth
                    sx={{ fontSize: "1rem", pr: 1 }}
                    placeholder='Search for test on any topic'
                    inputProps={{ "aria-label": "search" }}
                    endAdornment={
                      <InputAdornment position='end'>
                        <Button variant='contained' size='medium'>
                          Search
                        </Button>
                      </InputAdornment>
                    }
                    startAdornment={
                      <InputAdornment position='start'>
                        <SearchIconWrapper>
                          <SearchIcon fontSize='large' />
                        </SearchIconWrapper>
                      </InputAdornment>
                    }
                  />
                </Search>
              </Stack>
              <Stack
                justifyContent='center'
                alignItems='flex-start'
                width={250}
                spacing={1}
              >
                <Typography fontWeight='bold'>Create test</Typography>
                <Button
                  size='small'
                  variant='contained'
                  sx={{ width: 250, height: 48, alignItems: "center" }}
                >
                  <AddCircleOutline sx={{ mr: 2 }} />
                  Create
                </Button>
              </Stack>
            </Stack>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}

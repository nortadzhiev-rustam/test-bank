import React from "react";
import { styled, alpha } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";

import {
  InputAdornment,
  Divider,
  Drawer,
  Button,
  Avatar,
  Stack,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  Select,
  FormControl,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from "@mui/material";
import Slide from "@mui/material/Slide";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  Explore,
  Folder,
  HowToReg,
  LibraryBooks,
  Logout,
  MeetingRoom,
  Settings,
  AddCircle,
} from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";

import { useSelector, useDispatch } from "react-redux";
import logo from "../logo.svg";
import { withRouter } from "../components/withRouter.js";
import { logout } from "../store/userSlice";
import axios from "axios";
import {
  useNavigate,
  useLocation,
  useParams,
  createSearchParams,
} from "react-router-dom";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import InsertPanel from "../components/InsertPanel";

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

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  backgroundColor: "#006064",
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

const Space = styled("div")(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

const list = [
  {
    text: "Explore",
    icon: <Explore htmlColor='inherit' />,
    id: 0,
    path: { pathname: "/admin" },
  },
  {
    text: "My Library",
    icon: <LibraryBooks htmlColor='inherit' />,
    id: 1,
    path: { pathname: "/admin/private" },
  },
  {
    text: "Settings",
    icon: <Settings htmlColor='inherit' />,
    id: 2,
    path: { pathname: "/settings" },
  },
  {
    text: "Collections",
    icon: <Folder htmlColor='inherit' />,
    id: 3,
    path: {
      pathname: "/profile",
      search: createSearchParams({
        section: "collections",
      }).toString(),
    },
  },

  {
    text: "Profile",
    icon: <AccountCircle htmlColor='inherit' />,
    id: 4,
    path: {
      pathname: "/profile",
      search: createSearchParams({
        section: "library",
      }).toString(),
    },
  },
];

const drawerWidth = 250;
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const NavBar = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(undefined);
  const [option, setOption] = React.useState("Test Library");
  const [isOpen, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("explore");
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const user = useSelector((state) => state.user.user.user);
  const [search, setSearch] = React.useState();
  const dispatch = useDispatch();
  const history = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDialogOpen = () => {
    setOpen(!isOpen);
  };

  const handleLogOut = async () => {
    dispatch(logout());
    const res = await axios.get(
      "https://www.backend.rustamnortadzhiev.com/api/v1/logout",
      {
        withCredentials: true,
      }
    );
    if (res.status === 200) {
      history("/");
    }
  };

  const handleNavigation = (id, path) => {
    setSelected(id);
    history(path);
  };
  const handleChange = (event, newValue) => {
    setValue(location.pathname|| newValue);
  };

  React.useEffect(() => {
    const arr = location.search.split("?");
    setSearch(arr[1]);
  }, [location.search]);

  const drawer = (
    <div style={{ width: "100%", position: "absolute" }}>
      <Toolbar sx={{ backgroundColor: "#15616d", position: "sticky" }}>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            cursor: "pointer",
          }}
          onClick={() => history("/")}
        >
          <img src={logo} width='30' height='30' alt='logo' />
          <Typography
            sx={{ marginLeft: 2 }}
            variant='h6'
            noWrap
            component='div'
            color='white'
          >
            Test Generator
          </Typography>
        </div>
      </Toolbar>
      <Divider />
      {user && (
        <Toolbar disableGutters>
          <Avatar sx={{ bgcolor: "red", mx: 1 }}>
            {user.firstName.charAt(0) + user.lastName.charAt(0)}
          </Avatar>
          <Stack direction='column' justifyContent='flex-start'>
            <Typography fontWeight='bold' fontSize={14}>
              {user.firstName + " " + user.lastName}
            </Typography>
            <Stack direction='row'>
              <Typography fontWeight='bold' variant='caption'>
                {user.role + " - " + user.department.name}
              </Typography>
            </Stack>
          </Stack>
        </Toolbar>
      )}
      <Divider />
      <Toolbar sx={{ height: { xs: "20vh", xl: "30vh" } }} />
      <Divider />
      <Toolbar disableGutters>
        <Button
          sx={{
            paddingX: 1,
            mx: 1,
            bgcolor: "#006064",
            "&:hover": {
              bgcolor: "#15616d",
            },
            justifyContent: "flex-start",
          }}
          size='large'
          fullWidth
          variant='contained'
          onClick={handleDialogOpen}
        >
          <AddCircleOutlineIcon sx={{ mr: 1 }} />
          Create
        </Button>
      </Toolbar>
      <Divider sx={{ mb: 2 }} />
      <Stack
        direction='column'
        justifyContent='space-between'
        overflow='scrroll'
      >
        <Toolbar
          disableGutters
          sx={{
            width: "100%",
            padding: 0,
            display: "flex",
          }}
        >
          <List sx={{ width: "100%", margin: 0 }}>
            {list.map((li, idx) => (
              <ListItem
                sx={{
                  width: "100%",
                  borderRightWidth: 5,
                  borderRightColor: "#006064",
                  borderRightStyle:
                    li.path.search === search &&
                    location.pathname === li.path.pathname
                      ? "solid"
                      : "none",
                  color:
                    li.path.search === search &&
                    location.pathname === li.path.pathname
                      ? "#006064"
                      : "#888888",
                  bgcolor:
                    li.path.search === search &&
                    location.pathname === li.path.pathname
                      ? "rgba(0,100,102,0.1)"
                      : "default",
                }}
                id={li.id}
                key={idx}
                disablePadding
              >
                <ListItemButton
                  onClick={() => handleNavigation(li.id, li.path)}
                >
                  <ListItemIcon
                    color={
                      location.pathname === li.path ? "#006064" : "#888888"
                    }
                  >
                    {li.icon}
                  </ListItemIcon>
                  <ListItemText>
                    <Typography fontWeight='bold'>{li.text}</Typography>
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Toolbar>
        <Toolbar disableGutters>
          <List sx={{ width: "100%", margin: 0 }}>
            <ListItem
              sx={{
                width: "100%",
              }}
              disablePadding
            >
              <ListItemButton onClick={handleLogOut}>
                <ListItemIcon>
                  <Logout />
                </ListItemIcon>
                <ListItemText>
                  <Typography fontWeight='bold'>{"Logout"}</Typography>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          </List>
        </Toolbar>
      </Stack>
    </div>
  );

  return (
    <Stack direction='column'>
      <Dialog
        maxWidth='xs'
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleDialogOpen}
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle>{"Create a Test"}</DialogTitle>
        <DialogContent>
          <InsertPanel setOpen={setOpen} />
        </DialogContent>
      </Dialog>
      <AppBar
        position='fixed'
        sx={{
          width:
            isLoggedIn && location.pathname !== `/test/editor/${id}/edit`
              ? { lg: `calc(100% - ${drawerWidth}px)` }
              : "100%",
          ml: isLoggedIn &&
            location.pathname !== `/test/editor/${id}/edit` && {
              lg: `${drawerWidth}px`,
            },
        }}
        color='secondary'
        elevation={10}
      >
        <Toolbar>
          {isLoggedIn && (
            <IconButton
              color='inherit'
              aria-label='open drawer'
              edge='start'
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { lg: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          )}
          {!isLoggedIn && (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                cursor: "pointer",
              }}
              onClick={() => history("/")}
            >
              <img src={logo} width='30' height='30' alt='logo' />
              <Typography
                sx={{ marginLeft: 2 }}
                variant='h6'
                noWrap
                component='div'
                color='white'
              >
                Test Generator
              </Typography>
            </div>
          )}
          {isLoggedIn ? (
            <Box
              sx={{
                width: "100%",
                display: { xs: "none", md: "flex" },
                alignItems: "center",
              }}
            >
              <Search sx={{ width: "100%", py: "4px" }}>
                <StyledInputBase
                  sx={{ width: "100%" }}
                  placeholder='Search…'
                  inputProps={{ "aria-label": "search" }}
                  startAdornment={
                    <InputAdornment position='start'>
                      <SearchIconWrapper>
                        <SearchIcon />
                      </SearchIconWrapper>
                    </InputAdornment>
                  }
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
                    <MenuItem value='My Library'>My Library</MenuItem>
                  </Select>
                </FormControl>
              </Search>
              <IconButton>
                <Badge
                  badgeContent={5}
                  color='error'
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <NotificationsIcon htmlColor='white' />
                </Badge>
              </IconButton>
            </Box>
          ) : (
            <Stack
              width='100%'
              direction='row'
              spacing={1}
              justifyContent='flex-end'
              display={{ xs: "none", md: "flex" }}
            >
              <Button
                onClick={() => history("/login")}
                size='large'
                variant='outlined'
                color='inherit'
              >
                <MeetingRoom sx={{ mr: 1 }} /> Login
              </Button>
              <Button
                onClick={() => history("/register")}
                size='large'
                variant='outlined'
                color='inherit'
              >
                <HowToReg sx={{ mr: 1 }} /> Sign up
              </Button>
            </Stack>
          )}
        </Toolbar>
      </AppBar>
      {isLoggedIn && location.pathname !== `/test/editor/${id}/edit` && (
        <Box
          component='nav'
          sx={{ width: { lg: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label='mailbox folders'
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            variant='temporary'
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "flex", lg: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                height: "100%",
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant='permanent'
            sx={{
              display: { xs: "none", lg: "flex" },
              height: "100%",
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",

                width: drawerWidth,
                height: "100%",
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
      )}

      <Space />
      {isLoggedIn && (
        <Paper
          sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 10 }}
          elevation={3}
        >
          <BottomNavigation
            showLabels
            sx={{
              display: { xs: "flex", lg: "none" },
              justifyContent: "space-evenly",
              height: "60px",
            }}
            value={value}
            onChange={handleChange}
          >
            <BottomNavigationAction
              onClick={() => history("/")}
              label='Explore'
              value='explore'
              icon={<Explore fontSize='medium' />}
            />
            <BottomNavigationAction
              onClick={() => history("/admin/private")}
              label='Library'
              value='myLibrary'
              icon={<LibraryBooks fontSize='medium' />}
            />
            <BottomNavigationAction
              label='Create'
              onClick={handleDialogOpen}
              icon={<AddCircle color='success' fontSize='medium' />}
            />
            <BottomNavigationAction
              onClick={() =>
                history({
                  pathname: "/profile",
                  search: createSearchParams({
                    section: "collections",
                  }).toString(),
                })
              }
              label='Collections'
              value='collections'
              icon={<Folder fontSize='medium' />}
            />
            <BottomNavigationAction
              onClick={() =>
                history({
                  pathname: "/profile",
                  search: createSearchParams({
                    section: "library",
                  }).toString(),
                })
              }
              label='Profile'
              value='library'
              icon={<AccountCircle fontSize='medium' />}
            />
          </BottomNavigation>
        </Paper>
      )}
    </Stack>
  );
};

export default withRouter(NavBar);

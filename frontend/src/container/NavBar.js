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
} from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";

import { useSelector, useDispatch } from "react-redux";
import logo from "../logo.svg";
import { withRouter } from "../components/withRouter.js";
import { logout } from "../store/userSlice";
import axios from "axios";
import { useNavigate, useLocation, useParams } from "react-router-dom";

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
    path: "/admin",
  },
  {
    text: "My Library",
    icon: <LibraryBooks htmlColor='inherit' />,
    id: 1,
    path: "/admin/private",
  },
  {
    text: "Collections",
    icon: <Folder htmlColor='inherit' />,
    id: 2,
    path: "#",
  },
  {
    text: "Settings",
    icon: <Settings htmlColor='inherit' />,
    id: 3,
    path: "/settings",
  },
  {
    text: "Profile",
    icon: <AccountCircle htmlColor='inherit' />,
    id: 4,
    path: "/profile",
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
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const user = useSelector((state) => state.user.user.user);
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
    const res = await axios.get("http://localhost:5000/api/v1/logout", {
      withCredentials: true,
    });
    if (res.status === 200) {
      history("/");
    }
  };

  

  const handleNavigation = (id, path) => {
    setSelected(id);
    history(path);
  };

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
        height={{ xs: "40vh", xl: "48vh" }}
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
                    idx === selected || location.pathname === li.path
                      ? "solid"
                      : "none",
                  color: location.pathname === li.path ? "#006064" : "#888888",
                  bgcolor:
                    location.pathname === li.path
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
    <Box sx={{ flexGrow: 1 }}>
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
              ? { sm: `calc(100% - ${drawerWidth}px)` }
              : "100%",
          ml: isLoggedIn &&
            location.pathname !== `/test/editor/${id}/edit` && {
              sm: `${drawerWidth}px`,
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
              sx={{ mr: 2, display: { sm: "none" } }}
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
                <Divider orientation='vertical' />
                <FormControl sx={{ width: 180, padding: 0 }} size='small'>
                  <Select
                    variant='outlined'
                    value={option}
                    sx={{
                      paddingInline: 0,
                      color: "white",
                      boxShadow: "none",
                      ".MuiOutlinedInput-notchedOutline": {
                        border: 0,
                      },
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
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
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
              display: { xs: "flex", sm: "none" },
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
              display: { xs: "none", sm: "flex" },
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
    </Box>
  );
};

export default withRouter(NavBar);

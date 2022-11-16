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
import Menu from "@mui/material/Menu";
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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import {
  Explore,
  Folder,
  LibraryBooks,
  MeetingRoom,
  Settings,
} from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";

import { useSelector, useDispatch } from "react-redux";
import logo from "../logo.svg";
import { withRouter } from "../components/withRouter.js";
import { logout } from "../store/userSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  height: 40,
  borderRadius: 10,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
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
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
    cursor: "pointer",
  },
}));

const Space = styled("div")(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

const list = [
  { text: "Explore", icon: <Explore />, id: 0 },
  { text: "My Library", icon: <LibraryBooks />, id: 1 },
  { text: "Collections", icon: <Folder />, id: 2 },
  { text: "Settings", icon: <Settings />, id: 3 },
  { text: "Profile", icon: <AccountCircle />, id: 4 },
];

const drawerWidth = 250;

const NavBar = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(0);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const user = useSelector((state) => state.user.user.user);
  const dispatch = useDispatch();
  const history = useNavigate();
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogOut = async () => {
    dispatch(logout());
    handleMenuClose();
    const res = await axios.get("http://localhost:5000/api/v1/logout", {
      withCredentials: true,
    });
    if (res.status === 200) {
      history("/login");
    }
  };

  const handleOpenProfile = () => {
    history("/profile");
    handleMenuClose();
  };

  const drawer = (
    <div style={{ width: "100%", overflow: "hidden" }}>
      <Toolbar sx={{ backgroundColor: "#15616d" }}>
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
      <Toolbar sx={{ height: 250 }} />
      <Divider />
      <Toolbar disableGutters>
        <Button
          sx={{
            paddingX: 1,
            mx: 1,
            bgcolor: "#006064",
            "&:hover": {
              bgcolor: "#006064",
            },
            justifyContent: "flex-start",
          }}
          size='large'
          fullWidth
          variant='contained'
        >
          <AddCircleOutlineIcon sx={{ mr: 1 }} />
          Create
        </Button>
      </Toolbar>
      <Divider />
      <Toolbar disableGutters sx={{ width: "100%", padding: 0 }}>
        <List sx={{ width: "100%", margin: 0 }}>
          {list.map((li, idx) => (
            <ListItem
              sx={{
                width: "100%",
                borderRightWidth: 5,
                borderRightColor: "#006064",
                borderRightStyle: idx === selected ? "solid" : "none",
                color: idx === selected ? "#006064" : "#888888",
              }}
              id={li.id}
              key={idx}
              disablePadding
            >
              <ListItemButton onClick={() => setSelected(li.id)}>
                <ListItemIcon>{li.icon}</ListItemIcon>
                <ListItemText>
                  <Typography fontWeight='bold'>{li.text}</Typography>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Toolbar>
    </div>
  );

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleOpenProfile}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem
        onClick={() => {
          history("/admin");
          handleMenuClose();
        }}
      >
        Admin
      </MenuItem>
      <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          size='large'
          aria-label='show 17 new notifications'
          color='inherit'
        >
          <Badge badgeContent={0} color='error'>
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      {!isLoggedIn && (
        <MenuItem onClick={() => history("/login")}>
          <IconButton
            size='large'
            aria-label='account of current user'
            aria-controls='primary-search-account-menu'
            aria-haspopup='true'
            color='inherit'
          >
            <MeetingRoom />
          </IconButton>
          <p>Login</p>
        </MenuItem>
      )}
      {isLoggedIn && (
        <MenuItem>
          <IconButton
            size='large'
            aria-label='show 4 new mails'
            color='inherit'
          >
            <Badge badgeContent={0} color='error'>
              <MailIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
      )}
      {isLoggedIn && (
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            size='large'
            aria-label='account of current user'
            aria-controls='primary-search-account-menu'
            aria-haspopup='true'
            color='inherit'
          >
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      )}
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position='fixed'
        sx={{
          width: isLoggedIn ? { sm: `calc(100% - ${drawerWidth}px)` } : "100%",
          ml: isLoggedIn && { sm: `${drawerWidth}px` },
        }}
        color='secondary'
        elevation={10}
      >
        <Toolbar>
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
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ flexGrow: 1 }} />

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
            }}
          >
            <Search onClick={() => props.setOpenSearch(true)}>
              <StyledInputBase
                placeholder='Search…'
                inputProps={{ "aria-label": "search" }}
                endAdornment={
                  <InputAdornment
                    sx={{ padding: "10px", cursor: "pointer" }}
                    position='end'
                  >
                    <Box
                      sx={{
                        bgcolor: "white",
                        borderRadius: 1,
                        paddingInline: "5px",
                        cursor: "pointer",
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
                      Ctrl+K
                    </Box>
                  </InputAdornment>
                }
                startAdornment={
                  <InputAdornment position='start'>
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                  </InputAdornment>
                }
              />
            </Search>

            <IconButton
              size='large'
              aria-label='show 17 new notifications'
              color='inherit'
            >
              <Badge badgeContent={5} color='error'>
                <NotificationsIcon />
              </Badge>
            </IconButton>
            {!isLoggedIn && (
              <IconButton
                size='small'
                aria-label='login'
                color='inherit'
                onClick={() => history("/login")}
              >
                <MeetingRoom />
              </IconButton>
            )}
            {isLoggedIn && (
              <IconButton
                size='large'
                aria-label='show 4 new mails'
                color='inherit'
              >
                <Badge badgeContent={0} color='error'>
                  <MailIcon />
                </Badge>
              </IconButton>
            )}
            {isLoggedIn && (
              <IconButton
                size='large'
                edge='end'
                aria-label='account of current user'
                aria-controls={menuId}
                aria-haspopup='true'
                onClick={handleProfileMenuOpen}
                color='inherit'
              >
                <AccountCircle />
              </IconButton>
            )}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size='large'
              aria-label='show more'
              aria-controls={mobileMenuId}
              aria-haspopup='true'
              onClick={handleMobileMenuOpen}
              color='inherit'
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {isLoggedIn && (
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
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant='permanent'
            sx={{
              display: { xs: "none", sm: "flex" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
      )}

      <Space />

      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
};

export default withRouter(NavBar);

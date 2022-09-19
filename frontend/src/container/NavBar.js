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
import { InputAdornment, useScrollTrigger, Slide } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { MeetingRoom } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import logo from "../logo.svg";
import { withRouter } from "../components/withRouter.js";
import { logout } from "../store/userSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

const drawerWidth = 240;

function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction='down' in={!trigger}>
      {children}
    </Slide>
  );
}

const NavBar = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isFull = useSelector((state) => state.questionsType.isFull);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();
  const history = useNavigate();
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
      {!isFull && (
        <>
          <HideOnScroll {...props}>
            <AppBar position='fixed' color='secondary' elevation={10}>
              <Toolbar>
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
                  >
                    Test Generator
                  </Typography>
                </div>
                
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
          </HideOnScroll>

          <Space />

          {renderMobileMenu}
          {renderMenu}
        </>
      )}
    </Box>
  );
};

export default withRouter(NavBar);

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';


import { useNavigate } from "react-router-dom";
import { useAuth } from '../providers/auth';
import { SuccessfulAlert } from "../utils/AlertMessages";


const pages = ['diseases', 'risks', 'symptoms' ];

const Navbar = () => {

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const { logout, user } = useAuth();

  const navigate = useNavigate();

  console.log(user)

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            ANCESTRALIZE
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
                {pages.map((page) => (
                    <MenuItem key={page} onClick={() => {handleCloseNavMenu();navigate(`/${page}`)}}>
                    <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                ))}
                {
                    user && <MenuItem 
                        key={"logout"} 
                        onClick={() => {
                            handleCloseNavMenu();
                            SuccessfulAlert("You logged out");
                            navigate("/");
                            logout()}
                        }
                    >
                        <Typography textAlign="center">logout</Typography>
                    </MenuItem>
                }
                {
                    !user && <MenuItem 
                        key={"signup"} 
                        onClick={() => {
                            handleCloseNavMenu();
                            navigate("/signup")}
                        }
                    >
                        <Typography textAlign="center">signup</Typography>
                    </MenuItem>
                }
                { 
                    !user && <MenuItem 
                        key={"login"} 
                        onClick={() => {
                            handleCloseNavMenu();
                            navigate("/login")}
                        }
                    >
                        <Typography textAlign="center">login</Typography>
                    </MenuItem>
                }
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          > 
            ANCESTRALIZE
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={()=>{
                    handleCloseNavMenu();
                    navigate(`/${page}`)}
                }
                sx={{ my: 2, color: 'white', display: 'block', textTransform: "uppercase" }}
              >
                {page}
              </Button>
            ))}
            {
                user && <Button
                    key={"welcome"}
                    onClick={()=>navigate("/")}
                    sx={{ my: 2, color: 'white', display: 'block', textTransform: "uppercase", marginLeft:"auto" }}
                >
                    welcome, {user.data.toString()}
                </Button>
            }
            {

                user && <Button
                    key={"logout"}
                    onClick={()=>{
                        SuccessfulAlert("You logged out");
                        navigate("/");
                        logout()}
                    }
                    sx={{ my: 2, color: 'white', display: 'block', textTransform: "uppercase" }}
                >
                    logout
                </Button>
            }

               
            {
                !user && <Button
                    key={"signUp"}
                    onClick={()=>{
                        handleCloseNavMenu();
                        navigate("/signup")}
                    }
                    sx={{ my: 2, color: 'white', display: 'block', textTransform: "uppercase", marginLeft:"auto" }}
                >
                    signUp
                </Button>
            }
            {
                !user && <Button
                    key={"login"}
                    onClick={()=>{
                        handleCloseNavMenu();
                        navigate("/login")}
                    }
                    sx={{ my: 2, color: 'white', display: 'block', textTransform: "uppercase" }}
                >
                    login
                </Button>
            }
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;

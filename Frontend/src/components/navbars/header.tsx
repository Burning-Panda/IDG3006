import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Coins from "../../static/svgs/Icons/Coins.svg";
import PlantLevel from "../svgs/plantLevel";
import {iUser, userStore} from "../../stores/user";
import {useEffect} from "react";
import {Link} from "react-router-dom"
import Button from "@mui/material/Button"
import Blop from "../svgs/Blop";

// @ts-ignore
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#0",
    '&:hover': {
        backgroundColor: "#0",
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

// @ts-ignore
const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,

}));

// @ts-ignore
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    backgroundColor: "#fff",
    borderRadius: "20px",
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

interface iHeaderNavbar {

}


export default function HeaderNavbar(props: iHeaderNavbar) {
    const [user, setUser] = React.useState({} as iUser)

    /* Check if a user is stored in localStorage, if it exists save user as a variable */
    useEffect(() => {
        setUser(userStore.getUser())
    }, []);



    function set(user:iUser) {
        userStore.setUser(user)
        setUser(user)
    }
    function clear() {
        userStore.logout()
        console.log(userStore.getUser())
        setUser(userStore.getUser())
    }

    const testUser = {
        name: 'Test',
        points: 300,
        level: 1,
        isLoggedIn: true,
        plant: '',
        avatar: '',
    };

    const Logo = () => {
        return (
            <Typography component={"span"} sx={{fontSize: 24}}>Plantgrow</Typography>
        )
    }
    const UserContainer = () => {
        return (user.isLoggedIn ?
                <Box sx={{ minWidth:"80px" }} onClick={() => clear()}>
                    <Grid container direction={"row"}>
                        <Grid item>
                            <Box sx={{height:"20px"}}>
                                <Blop size={50} />
                            </Box>
                        </Grid>
                        <Grid item>
                            <Grid container
                                  direction="row"
                                  justifyContent="flex-start"
                                  alignItems="baseline"
                            >
                                <Grid item>
                                    <Grid container alignItems={"center"}>
                                        <PlantLevel level={1} size={20} />
                                        <Typography sx={{
                                            fontWeight:500,
                                            fontSize: "12px",
                                        }}>Beginner</Typography>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Grid container alignItems={"center"}>
                                        <img src={Coins} height={20} />
                                        <Typography sx={{
                                            fontWeight:500,
                                            fontSize: "12px",
                                        }}>300 p</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
                : <Box sx={{minWidth:"80px"}}>
                    <Button
                        onClick={() => set(testUser)}
                    >Login</Button>
                </Box>
        )
    }




//<Button component={Link} variant={"contained"} to={"/login"}>LogIn</Button>


    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
        React.useState<null | HTMLElement>(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
            <MenuItem onClick={() => {
                userStore.logout()
            }}>
                <IconButton
                    size="large"
                    aria-label="Log the current user out"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Logout</p>
            </MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed"
                    sx={{borderRadius:"0px 0px 20px 20px !important"}}
            >
                <Box position={"absolute"} top={-2} left={10}>
                    <Logo />
                </Box>
                <Box position={"absolute"} left={20} bottom={0}>
                    <UserContainer />
                </Box>
                <Toolbar  >

                    <Box sx={{ flexGrow: 1 }} />



                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </Box>


                    <Box sx={{
                        display: { xs: 'flex', md: 'none' },
                        gap: { xs: '1.5rem', md: '1.5rem' }
                    }}>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            {/* <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        /> */}
                        </Search>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
}


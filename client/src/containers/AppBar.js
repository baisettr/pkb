import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import { Button, Tabs, Tab } from '@material-ui/core';
import { graphql, withApollo } from 'react-apollo';
import { Link } from 'react-router-dom';
import query from '../queries/User';
import mutation from '../mutations/logout';

const useStyles = makeStyles(theme => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        color: 'black',
        paddingRight: '20px',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    link: {
        color: 'black',
        textDecoration: 'none'
    },
    navItem: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    }
}));

function PrimarySearchAppBar(props) {
    //console.log(props);
    //let user = undefined;

    //props ? user = props.data.user : user = undefined;
    const { loading, user } = props.data;
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    function handleProfileMenuOpen(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleMobileMenuClose() {
        setMobileMoreAnchorEl(null);
    }

    function handleMenuClose() {
        setAnchorEl(null);
        handleMobileMenuClose();
    }

    function handleMobileMenuOpen(event) {
        setMobileMoreAnchorEl(event.currentTarget);
    }
    const onLogoutClick = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
        props.mutate({
            refetchQueries: [{ query }]
        }).then(() => {
            props.client.cache.reset();
        });
    }
    const renderMenu = (
        <Menu key={1}
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >

            <MenuItem onClick={handleMenuClose}>
                <Link to="/view" className={classes.link}>
                    View Parkings
                        </Link>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
                <Link to="/bookings" className={classes.link}>
                    View Bookings
                        </Link>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
                <Link to="/dashboard" className={classes.link}>
                    My Account
                        </Link>
            </MenuItem>
            <MenuItem onClick={onLogoutClick}>Logout</MenuItem>
        </Menu>
    );
    const renderMobileMenu = (
        <Menu key={2}
            color="black"
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>
                <Link to="/view" className={classes.link}>
                    View Parkings
                        </Link>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
                <Link to="/bookings" className={classes.link}>
                    View Bookings
                        </Link>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
                <Link to="/dashboard" className={classes.link}>
                    My Account
                        </Link>
            </MenuItem>
            <MenuItem onClick={onLogoutClick}>Logout</MenuItem>
        </Menu>
    );

    return (
        <div className={classes.grow}>
            <AppBar position="static" style={{ backgroundColor: "white" }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        /* color="inherit" */
                        aria-label="Open drawer"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography className={classes.title} variant="h6" noWrap>
                        <Link to="/" className={classes.link}>
                            Parking Space
                        </Link>
                    </Typography>
                    {/* <MenuItem className={classes.menuButton}>
                        <Link to="/add" className={classes.link}>
                            Add Parking
                        </Link>
                    </MenuItem>

                    <MenuItem >
                        <Link to="/view" className={classes.link}>
                            View Parkings
                        </Link>
                    </MenuItem>
                    <MenuItem>
                        <Link to="/bookings" className={classes.link}>
                            View Bookings
                        </Link>
                    </MenuItem> */}

                    <div className={classes.grow} />
                    <MenuItem>
                        <Link to="/search" className={classes.link}>
                            Search Parkings
                        </Link>
                    </MenuItem>
                    {user ?
                        <div className={classes.sectionDesktop}>
                            {/* <IconButton color="inherit">
                                <Badge badgeContent={0} color="secondary">
                                    <MailIcon />
                                </Badge>
                            </IconButton>
                            <IconButton color="inherit">
                                <Badge badgeContent={0} color="secondary">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton> */}
                            <IconButton
                                edge="end"
                                aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}

                            >
                                <AccountCircle />
                            </IconButton>
                        </div>
                        :
                        <MenuItem >
                            <Link to="/login" className={classes.link}>
                                Login
                            </Link>
                        </MenuItem>}
                    <div className={classes.sectionMobile}>
                        <IconButton aria-haspopup="true" onClick={handleMobileMenuOpen} >
                            <MoreIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {user ? [renderMenu, renderMobileMenu] : ""}
        </div>
    );
}

export default graphql(mutation)(
    graphql(query)(withApollo(PrimarySearchAppBar))
);
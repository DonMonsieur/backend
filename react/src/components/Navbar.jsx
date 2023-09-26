import React, { Fragment, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { Link, useLocation } from "react-router-dom";
import {
    Box,
    Typography,
    List,
    Toolbar,
    Divider,
    IconButton,
    ListItem,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import { Dashboard, ChevronLeft } from "@mui/icons-material";
import GroupIcon from "@mui/icons-material/Group";

const drawerWidth = 230;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
    }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const NavigationBar = () => {
    const [open, setOpen] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [currentUrl, setCurrentUrl] = useState("");
    const location = useLocation();

    const handleLinkClick = () => {
        setIsButtonDisabled(true);
    };

    useEffect(() => {
        setCurrentUrl(location.pathname);
        const cooldownTimeout = setTimeout(() => {
            setIsButtonDisabled(false);
        }, 500);
        return () => {
            clearTimeout(cooldownTimeout);
        };
    }, [location]);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Fragment>
            <AppBar>
                <Toolbar>
                    <Box
                        sx={{
                            height: 10,
                        }}
                    />

                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        margin="10px"
                        fontWeight="bold"
                    >
                        {currentUrl == "/dashboard"
                            ? "Dashboard"
                            : currentUrl == "/users"
                            ? "Users"
                            : ""}
                    </Typography>
                </Toolbar>
            </AppBar>

            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeft />
                    </IconButton>
                </DrawerHeader>
                <Box>
                    <Divider />
                    <List
                        onMouseOver={handleDrawerOpen}
                        onMouseOut={handleDrawerClose}
                    >
                        <ListItem
                            button
                            id="dashboard"
                            component={Link}
                            to="/dashboard"
                            onClick={handleLinkClick}
                            disabled={isButtonDisabled}
                        >
                            <ListItemIcon>
                                <Dashboard />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItem>

                        <ListItem
                            button
                            id="users"
                            component={Link}
                            to="/users"
                            onClick={handleLinkClick}
                            disabled={isButtonDisabled}
                        >
                            <ListItemIcon>
                                <GroupIcon />
                            </ListItemIcon>
                            <ListItemText primary="Users" />
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </Fragment>
    );
};
export default NavigationBar;

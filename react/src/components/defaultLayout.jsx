import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Box, CssBaseline, createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

const DefaultLayout = () => {
    const myDarktheme = createTheme({
        palette: {
            mode: "dark",
            primary: {
                main: "#ff4545",
            },
            secondary: {
                main: "#2a3647",
            },
            tertiary: {
                main: "#ffffff",
            },
            background: {
                paper: "#1C2833",
                default: "#1C2833",
            },
            success: {
                main: "#28B463",
            },
            error: {
                main: "#E74C3C",
            },
            warning: {
                main: "#ff9800",
            },
            white: {
                main: "#ffffff",
            },
            info: {
                main: "#3498DB",
            },
            text: {
                primary: "#fff",
                secondary: "#D6B4B5",
                tertiary: "#4A4A4A",
                disabled: "#C7C7C7",
            },
            switch: {
                main: "#4d9b51",
            },
        },
        components: {},
    });

    return (
        <ThemeProvider theme={myDarktheme}>
            <CssBaseline />
            <Navbar />
            <Box
                sx={{
                    width: {
                        xs: "88%",
                        sm: "91%",
                        md: "91%",
                        lg: "92%",
                        xl: "92%",
                    },
                    margin: {
                        xs: "7vh",
                        sm: "8vh",
                        md: "10vh",
                        lg: "11vh",
                        xl: "12vh",
                    },
                    paddingTop: {
                        xs: "1vh",
                        sm: "0vh",
                        md: "0vh",
                        lg: "0vh",
                        xl: "0vh",
                    },
                }}
            >
                <Outlet />
            </Box>
        </ThemeProvider>
    );
};

export default DefaultLayout;

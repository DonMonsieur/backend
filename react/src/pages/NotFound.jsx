import { Box, Button } from "@mui/material";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <Fragment>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "100vh",
                }}
            >
                <h1>404 - Page Not Found</h1>
                <Button variant="contained" component={Link} to="/dashboard">
                    Go back to Dashboard
                </Button>
            </Box>
        </Fragment>
    );
};

export default NotFound;

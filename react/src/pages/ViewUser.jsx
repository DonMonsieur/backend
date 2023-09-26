import {
    Button,
    DialogActions,
    DialogContent,
    Grid,
    Input,
    TextField,
} from "@mui/material";
import React, { Fragment, useEffect } from "react";
import api from "../config/api";
import { useState } from "react";

const ViewUser = (selectedUser) => {
    const username = selectedUser.selectedUser.row.username;
    const firstName = selectedUser.selectedUser.row.first_name;
    const lastName = selectedUser.selectedUser.row.last_name;
    const email = selectedUser.selectedUser.row.email;

    return (
        <Fragment>
            <DialogContent>
                <Grid container direction={"column"} spacing={3} paddingTop={2}>
                    <Grid item>
                        <TextField
                            id="username"
                            name="username"
                            label="Username"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            InputProps={{ readOnly: true }}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="first_name"
                            name="first_name"
                            label="First name"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={firstName}
                            onChange={(e) => setFirstname(e.target.value)}
                            InputProps={{ readOnly: true }}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="last_name"
                            name="last_name"
                            label="Last name"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={lastName}
                            onChange={(e) => setLastname(e.target.value)}
                            InputProps={{ readOnly: true }}
                        />
                    </Grid>
                    <Grid item>
                        <Grid item>
                            <TextField
                                id="email"
                                name="email"
                                type="email"
                                label="Email"
                                variant="outlined"
                                size="small"
                                fullWidth
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>
                        <Grid item></Grid>
                    </Grid>
                    <Grid item></Grid>
                </Grid>
            </DialogContent>
        </Fragment>
    );
};

export default ViewUser;

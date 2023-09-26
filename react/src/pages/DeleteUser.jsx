import {
    Avatar,
    Button,
    DialogActions,
    DialogContent,
    Grid,
    TextField,
} from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import api from "../config/api";

const DeleteUser = ({ selectedUser, onClose, snackBarData }) => {
    const userId = selectedUser.id;
    const username = selectedUser.username;
    const firstName = selectedUser.first_name;
    const lastName = selectedUser.last_name;
    const email = selectedUser.email;

    const deleteUser = async () => {
        const response = await api.delete(`/users/delete/${userId}`);
        if (response.status === 200) {
            onClose();
            alert(response.data.message);
        }
    };

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
                            InputProps={{ readOnly: true }}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="first_name"
                            name="first_name"
                            label="First Name"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={firstName}
                            InputProps={{ readOnly: true }}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="last_name"
                            name="last_name"
                            label="Last Name"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={lastName}
                            InputProps={{ readOnly: true }}
                        />
                    </Grid>
                    <Grid item>
                        <Grid item>
                            <TextField
                                id="email"
                                name="email"
                                label="Email"
                                variant="outlined"
                                size="small"
                                fullWidth
                                value={email}
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>
                        <Grid item></Grid>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button
                    color="error"
                    variant="contained"
                    sx={{
                        mr: 1,
                    }}
                    onClick={deleteUser}
                >
                    Delete
                </Button>
            </DialogActions>
        </Fragment>
    );
};

export default DeleteUser;

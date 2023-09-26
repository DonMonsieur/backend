import {
    Button,
    DialogActions,
    DialogContent,
    Grid,
    Input,
    TextField,
} from "@mui/material";
import React, { Fragment } from "react";
import api from "../config/api";
import { useState } from "react";

const CreateUsers = ({ onClose }) => {
    const [username, setUsername] = useState("");
    const [firstName, setFirstname] = useState("");
    const [lastName, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setImage(selectedImage);
    };

    const createUser = async () => {
        try {
            const response = await api.post("/users/create", {
                username: username,
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: password,
                password_confirmation: passwordConfirmation,
            });

            if (response.status === 201) {
                onClose();
                alert(response.data.message);
            } else {
                throw new Error("An unexpected error occurred.");
            }
        } catch (error) {
            if (error.response && error.response.status === 422) {
                const validationErrors = error.response.data.errors;
                const errorMessage = Object.keys(validationErrors)
                    .map(
                        (field) =>
                            `${field}: ${validationErrors[field].join(", ")}`
                    )
                    .join("\n");
                alert(errorMessage);
            } else {
                console.error(error);
                alert("An unexpected error occurred.");
            }
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
                            label="Enter username"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="first_name"
                            name="first_name"
                            label="Enter first name"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={firstName}
                            onChange={(e) => setFirstname(e.target.value)}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="last_name"
                            name="last_name"
                            label="Enter last name"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={lastName}
                            onChange={(e) => setLastname(e.target.value)}
                        />
                    </Grid>
                    <Grid item>
                        <Grid item>
                            <TextField
                                id="email"
                                name="email"
                                type="email"
                                label="Enter email"
                                variant="outlined"
                                size="small"
                                fullWidth
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item></Grid>
                    </Grid>
                    <Grid item></Grid>
                    <Grid item>
                        <Grid item>
                            <TextField
                                id="password"
                                name="password"
                                type="password"
                                label="Enter password"
                                variant="outlined"
                                size="small"
                                fullWidth
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Grid>
                        <Grid item></Grid>
                    </Grid>
                    <Grid item>
                        <Grid item>
                            <TextField
                                id="password_confirmation"
                                name="password_confirmation"
                                type="password"
                                label="Confirm password"
                                variant="outlined"
                                size="small"
                                fullWidth
                                value={passwordConfirmation}
                                onChange={(e) =>
                                    setPasswordConfirmation(e.target.value)
                                }
                            />
                        </Grid>
                        <Grid item></Grid>
                    </Grid>
                </Grid>
                <DialogActions>
                    <Button
                        color="success"
                        variant="contained"
                        sx={{
                            mr: 1,
                        }}
                        onClick={createUser}
                    >
                        Create
                    </Button>
                </DialogActions>
            </DialogContent>
        </Fragment>
    );
};

export default CreateUsers;

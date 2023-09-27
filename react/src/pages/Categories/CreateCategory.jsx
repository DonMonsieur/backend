import {
    Autocomplete,
    Button,
    DialogActions,
    DialogContent,
    Grid,
    Input,
    TextField,
} from "@mui/material";
import React, { Fragment, useEffect } from "react";
import api from "../../config/api";
import { useState } from "react";

const CreateCategories = ({ onClose }) => {
    const [categoryName, setCategoryName] = useState("");
    const [categoryDescription, setCategoryDescription] = useState("");
    const [productManager, setProductManager] = useState([]);
    const [productManagerId, setProductManagerId] = useState();

    const getProductManager = async () => {
        const response = await api.get("/users/product-manager");

        if (response.status == 200) {
            setProductManager(response.data.data);
        }
    };

    useEffect(() => {
        getProductManager();
    }, []);

    const createCategory = async () => {
        try {
            const response = await api.post("/categories/create", {
                category_name: categoryName,
                category_description: categoryDescription,
                product_manager: productManagerId,
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
    const handleProductManagerChange = (event, newValue) => {
        setProductManagerId(newValue.id);
    };

    return (
        <Fragment>
            <DialogContent>
                <Grid container direction={"column"} spacing={3} paddingTop={2}>
                    <Grid item>
                        <TextField
                            id="category_name"
                            name="category_name"
                            label="Enter category name"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="category_description"
                            name="category_description"
                            label="Enter category description"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={categoryDescription}
                            onChange={(e) =>
                                setCategoryDescription(e.target.value)
                            }
                        />
                    </Grid>
                    <Grid item>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={productManager}
                            getOptionLabel={(option) => option.username}
                            onChange={handleProductManagerChange}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Select Product Manager"
                                    fullWidth
                                />
                            )}
                        />
                    </Grid>
                </Grid>
                <DialogActions>
                    <Button
                        color="success"
                        variant="contained"
                        sx={{
                            mr: 1,
                        }}
                        onClick={createCategory}
                    >
                        Create
                    </Button>
                </DialogActions>
            </DialogContent>
        </Fragment>
    );
};

export default CreateCategories;

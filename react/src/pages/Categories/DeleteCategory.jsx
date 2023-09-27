import {
    Avatar,
    Button,
    DialogActions,
    DialogContent,
    Grid,
    TextField,
} from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import api from "../../config/api";

const DeleteCategory = ({ selectedCategory, onClose }) => {
    const categoryId = selectedCategory.id;
    const categoryName = selectedCategory.category_name;
    const categoryDescription = selectedCategory.category_description;
    const productManager = selectedCategory.product_manager;

    const deleteUser = async () => {
        const response = await api.delete(`/categories/delete/${categoryId}`);
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
                            id="category_name"
                            name="category_name"
                            label="Category Name"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={categoryName}
                            InputProps={{ readOnly: true }}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="category_description"
                            name="category_description"
                            label="Category Description"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={categoryDescription}
                            InputProps={{ readOnly: true }}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="product_manager"
                            name="product_manager"
                            label="Product Manager"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={productManager}
                            InputProps={{ readOnly: true }}
                        />
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

export default DeleteCategory;

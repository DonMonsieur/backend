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

const DeleteProduct = ({ selectedProduct, onClose }) => {
    const image = selectedProduct.product_image;
    const productId = selectedProduct.id;
    const productName = selectedProduct.product_name;
    const productSku = selectedProduct.product_sku;
    const productCategory = selectedProduct.product_category;
    const productDescription = selectedProduct.product_description;

    const deleteProduct = async () => {
        const response = await api.delete(`/products/delete/${productId}`);
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
                        <Avatar
                            src={"http://localhost:8000/" + image}
                            sx={{
                                height: "200px",
                                width: "200px",
                                margin: "auto",
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="product_name"
                            name="product_name"
                            label="Product Name"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={productName}
                            InputProps={{ readOnly: true }}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="product_sku"
                            name="product_sku"
                            label="Product SKU"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={productSku}
                            InputProps={{ readOnly: true }}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="product_category"
                            name="product_category"
                            label="Product Category"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={productCategory}
                            InputProps={{ readOnly: true }}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="product_description"
                            name="product_description"
                            label="Product Description"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={productDescription}
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
                    onClick={deleteProduct}
                >
                    Delete
                </Button>
            </DialogActions>
        </Fragment>
    );
};

export default DeleteProduct;

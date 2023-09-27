import {
    Autocomplete,
    Button,
    CardMedia,
    DialogActions,
    DialogContent,
    Grid,
    Input,
    TextField,
} from "@mui/material";
import React, { Fragment, useEffect } from "react";
import api from "../../config/api";
import { useState } from "react";

const UpdateProduct = ({ selectedProduct, onClose }) => {
    const [productId, setProductId] = useState();
    const [productImage, setProductImage] = useState("");
    const [productImagePreview, setProductImagePreview] = useState(
        "http://localhost:8000/" + selectedProduct.row.product_image
    );
    const [productName, setProductName] = useState("");
    const [productSku, setProductSku] = useState("");
    const [productCategory, setProductCategory] = useState("");
    const [getAllProductCategory, setGetAllProductCategory] = useState([]);
    const [productCategoryId, setProductCategoryId] = useState();
    const [productDescription, setProductDescription] = useState("");

    useEffect(() => {
        setProductId(selectedProduct.row.id);
        setProductImage(selectedProduct.row.product_image);
        setProductName(selectedProduct.row.product_name);
        setProductSku(selectedProduct.row.product_sku);
        setProductCategory(selectedProduct.row.product_category);
        setProductDescription(selectedProduct.row.product_description);
    }, []);

    const getProduct = async () => {
        const response = await api.get("/categories/product-category");

        if (response.status == 200) {
            setGetAllProductCategory(response.data.data);
        }
    };

    useEffect(() => {
        getProduct();
    }, []);

    const updateProduct = async () => {
        try {
            const formData = new FormData();
            formData.append("product_name", productName);
            formData.append("product_sku", productSku);
            formData.append("product_description", productDescription);
            formData.append("product_image", productImage);

            if (productCategoryId !== undefined && productCategoryId !== null) {
                formData.append("product_category_id", productCategoryId);
            }

            const response = await api.post(
                `/products/update/${productId}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response.status === 200) {
                onClose();
                alert(response.data.message);
                console.log(response);
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
                console.log(productImage);
            } else {
                console.error(error);
                alert("An unexpected error occurred.");
            }
        }
    };

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];

        if (selectedImage) {
            const imageUrl = URL.createObjectURL(selectedImage);
            setProductImage(selectedImage);
            setProductImagePreview(imageUrl);
        } else {
            setProductImage(null);
            setProductImagePreview(
                "http://localhost:8000/" + selectedProduct.row.product_image
            );
        }
    };

    const handleProductCategoryChange = (event, newValue) => {
        newValue ? setProductCategoryId(newValue.id) : null;
    };

    return (
        <Fragment>
            <DialogContent>
                <Grid container direction={"column"} spacing={3} paddingTop={2}>
                    <Grid item>
                        <CardMedia
                            component="img"
                            image={productImagePreview}
                            sx={{
                                height: "200px",
                                width: "200px",
                                margin: "auto",
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <Input
                            type="file"
                            id="image"
                            name="image"
                            fullWidth
                            onChange={handleImageChange}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="product_name"
                            name="product_name"
                            label="Enter new product name"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="product_sku"
                            name="product_sku"
                            label="Enter new product sku"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={productSku}
                            onChange={(e) => setProductSku(e.target.value)}
                        />
                    </Grid>
                    <Grid item>
                        <Autocomplete
                            disablePortal
                            options={getAllProductCategory}
                            getOptionLabel={(option) =>
                                option.category_name || productCategory
                            }
                            value={productCategory}
                            isOptionEqualToValue={(option, value) =>
                                option.category_name === value
                            }
                            onChange={handleProductCategoryChange}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Select Product Category"
                                    fullWidth
                                    helperText={`Current Product Category: ${productCategory}`}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="product_description"
                            name="product_description"
                            label="Enter new product description"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={productDescription}
                            onChange={(e) =>
                                setProductDescription(e.target.value)
                            }
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
                        onClick={updateProduct}
                    >
                        Update
                    </Button>
                </DialogActions>
            </DialogContent>
        </Fragment>
    );
};

export default UpdateProduct;

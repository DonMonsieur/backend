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

const CreateProduct = ({ onClose }) => {
    const [productImage, setProductImage] = useState(null);
    const [productName, setProductName] = useState("");
    const [productSku, setProductSku] = useState([]);
    const [productCategory, setProductCategory] = useState([]);
    const [productCategoryId, setProductCategoryId] = useState();
    const [productDescription, setProductDescription] = useState("");

    const getProduct = async () => {
        const response = await api.get("/categories/product-category");

        if (response.status == 200) {
            setProductCategory(response.data.data);
        }
    };

    useEffect(() => {
        getProduct();
    }, []);

    const createProduct = async () => {
        try {
            const formData = new FormData();
            formData.append("product_image", productImage),
                formData.append("product_name", productName),
                formData.append("product_sku", productSku),
                formData.append("product_category_id", productCategoryId),
                formData.append("product_description", productDescription);

            const response = await api.post("/products/create", formData);

            if (response.status === 201) {
                console.log(productImage);
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

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setProductImage(selectedImage);
    };

    const handleProductCategoryChange = (event, newValue) => {
      setProductCategoryId(newValue.id);
    };

    return (
        <Fragment>
            <DialogContent>
                <Grid container direction={"column"} spacing={3} paddingTop={2}>
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
                            label="Enter product name"
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
                            label="Enter product sku"
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
                            id="combo-box-demo"
                            options={productCategory}
                            getOptionLabel={(option) => option.category_name}
                            onChange={handleProductCategoryChange}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Select Product Category"
                                    fullWidth
                                />
                            )}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="product_description"
                            name="product_description"
                            label="Enter product description"
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
                        onClick={createProduct}
                    >
                        Create
                    </Button>
                </DialogActions>
            </DialogContent>
        </Fragment>
    );
};

export default CreateProduct;

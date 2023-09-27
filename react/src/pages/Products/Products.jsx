import React, { Fragment, useEffect } from "react";
import { useState } from "react";
import api from "../../config/api";
import { Box, Button, CardMedia, IconButton, Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
    Visibility as VisibilityIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Close as CloseIcon,
} from "@mui/icons-material";
import CreateProduct from "../Products/CreateProduct";
import UpdateProduct from "../Products/UpdateProduct";
import DeleteProduct from "../Products/DeleteProduct";
import DialogBox from "../../components/Dialogbox";

const Products = () => {
    const [products, setProducts] = useState([]);

    const [updateSelectedProduct, setUpdateSelectedProduct] = useState();
    const [deleteSelectedProduct, setDeleteSelectedProduct] = useState();

    const [openDialogBox, setOpenDialogBox] = useState(false);
    const [dialogType, setDialogType] = useState();

    const getProducts = async () => {
        const response = await api.get("/products/data");

        if (response.status == 200) {
            setProducts(response.data.data);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    const handleCreateProduct = (type) => {
        setOpenDialogBox(true);
        setDialogType(type);
    };

    const handleUpdateProduct = (rowData, type) => {
        setUpdateSelectedProduct(rowData);
        setOpenDialogBox(true);
        setDialogType(type);
    };

    const handleDeleteProduct = (rowData, type) => {
        setDeleteSelectedProduct(rowData.row);
        setOpenDialogBox(true);
        setDialogType(type);
    };

    const handleClose = () => {
        setOpenDialogBox(false);
        getProducts();
    };

    const columns = [
        {
            field: "product_image",
            headerName: "Product Image",
            flex: 1,
            type: "text",
            headerAlign: "center",
            align: "center",
            renderCell: (cellValues) => {
                const baseUrl = "http://localhost:8000/";
                const imageSrc = baseUrl + cellValues.row.product_image;
                return (
                    <CardMedia
                        component="img"
                        src={imageSrc}
                        onClick={() =>
                            handleImageClick(cellValues.row.image, "View Image")
                        }
                        sx={{
                            height: 50,
                            width: 50,
                            borderRadius: "20px",
                            border: "1px solid white",
                        }}
                    />
                );
            },
        },
        {
            field: "product_name",
            headerName: "Product Name",
            flex: 1,
            type: "text",
            headerAlign: "left",
            align: "left",
        },
        {
            field: "product_sku",
            headerName: "Product SKU",
            flex: 1,
            type: "text",
            headerAlign: "left",
            align: "left",
        },
        {
            field: "product_category",
            headerName: "Product Category",
            flex: 1,
            type: "text",
            headerAlign: "left",
            align: "left",
        },
        {
            field: "product_description",
            headerName: "Product Description",
            flex: 1,
            type: "text",
            headerAlign: "left",
            align: "left",
        },
        {
            field: "action",
            headerName: "Action",
            sortable: false,
            headerAlign: "center",
            flex: 1,
            renderCell: (cellValues) => {
                return (
                    <Box sx={{ margin: "auto" }}>
                        <Tooltip title="Update Product">
                            <IconButton
                                color="info"
                                onClick={(e) =>
                                    handleUpdateProduct(
                                        cellValues,
                                        "Update Product"
                                    )
                                }
                            >
                                <EditIcon />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Delete Product">
                            <IconButton
                                color="error"
                                onClick={(e) =>
                                    handleDeleteProduct(
                                        cellValues,
                                        "Delete Product"
                                    )
                                }
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                );
            },
        },
    ];

    return (
        <Fragment>
            <Button
                variant="contained"
                onClick={() => handleCreateProduct("Create Product")}
            >
                Add Product
            </Button>
            <Box sx={{ height: 700, width: "100%" }}>
                <DataGrid
                    rows={products}
                    columns={columns}
                    pageSize={15}
                    pagination
                    pageSizeOptions={[10, 25, 50, 100]}
                    disableSelectionOnClick
                />
            </Box>

            {/* --DIALOG BOX--*/}
            <DialogBox
                open={openDialogBox}
                maxWidth="md"
                onClose={handleClose}
                title={dialogType}
            >
                {dialogType === "Create Product" ? (
                    <CreateProduct onClose={handleClose} />
                ) : dialogType === "Update Product" ? (
                    <UpdateProduct
                        selectedProduct={updateSelectedProduct}
                        onClose={handleClose}
                    />
                ) : dialogType === "Delete Product" ? (
                    <DeleteProduct
                        selectedProduct={deleteSelectedProduct}
                        onClose={handleClose}
                    />
                ) : null}
            </DialogBox>
        </Fragment>
    );
};

export default Products;

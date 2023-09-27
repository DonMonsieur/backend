import React, { Fragment, useEffect } from "react";
import { useState } from "react";
import api from "../../config/api";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
    Visibility as VisibilityIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Close as CloseIcon,
} from "@mui/icons-material";
import CreateCategory from "../Categories/CreateCategory";
import UpdateCategory from "../Categories/UpdateCategory";
import DeleteCategory from "../Categories/DeleteCategory";
import DialogBox from "../../components/Dialogbox";

const Categories = () => {
    const [categories, setCategories] = useState([]);

    const [updateSelectedCategory, setUpdateSelectedCategory] = useState();
    const [deleteSelectedCategory, setDeleteSelectedCategory] = useState();

    const [openDialogBox, setOpenDialogBox] = useState(false);
    const [dialogType, setDialogType] = useState();

    const getCategories = async () => {
        const response = await api.get("/categories/list");

        if (response.status == 200) {
            setCategories(response.data.data);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    const handleCreateCategory = (type) => {
        setOpenDialogBox(true);
        setDialogType(type);
    };

    const handleUpdateCategory = (rowData, type) => {
        setUpdateSelectedCategory(rowData);
        setOpenDialogBox(true);
        setDialogType(type);
    };

    const handleDeleteCategory = (rowData, type) => {
        setDeleteSelectedCategory(rowData.row);
        setOpenDialogBox(true);
        setDialogType(type);
    };

    const handleClose = () => {
        setOpenDialogBox(false);
        getCategories();
    };

    const columns = [
        {
            field: "category_name",
            headerName: "Category Name",
            flex: 1,
            type: "text",
            headerAlign: "left",
            align: "left",
        },
        {
            field: "category_description",
            headerName: "Category Description",
            flex: 1,
            type: "text",
            headerAlign: "left",
            align: "left",
        },
        {
            field: "product_manager",
            headerName: "Product Manager",
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
                        <Tooltip title="Update Category">
                            <IconButton
                                color="info"
                                onClick={(e) =>
                                    handleUpdateCategory(
                                        cellValues,
                                        "Update Category"
                                    )
                                }
                            >
                                <EditIcon />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Delete Category">
                            <IconButton
                                color="error"
                                onClick={(e) =>
                                    handleDeleteCategory(
                                        cellValues,
                                        "Delete Category"
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
                onClick={() => handleCreateCategory("Create Category")}
            >
                Add Category
            </Button>
            <Box sx={{ height: 700, width: "100%" }}>
                <DataGrid
                    rows={categories}
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
                {dialogType === "Create Category" ? (
                    <CreateCategory onClose={handleClose} />
                ) : dialogType === "Update Category" ? (
                    <UpdateCategory
                        selectedCategory={updateSelectedCategory}
                        onClose={handleClose}
                    />
                ) : dialogType === "Delete Category" ? (
                    <DeleteCategory
                        selectedCategory={deleteSelectedCategory}
                        onClose={handleClose}
                    />
                ) : null}
            </DialogBox>
        </Fragment>
    );
};

export default Categories;

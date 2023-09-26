import React, { useState, useEffect, Fragment } from "react";
import {
    Grid,
    Box,
    Typography,
    Paper,
    TablePagination,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from "@mui/material";
import api from "../config/api";

export default function Dashboard() {
    const [products, setProducts] = useState([]);
    const [totalProducts, setTotalProducts] = useState(0);
    const [sortDirection, setSortDirection] = useState("asc");
    const [categoryNames, setCategoryNames] = useState([]);
    const [initialValue, setInitialValue] = useState({
        selectedCategory: "Show all categories",
        pagination: {
            currentPage: 0,
            pageSize: 25,
        },
    });

    const handleCategoryChange = (event) => {
        const selectedCategory = event.target.value;

        setInitialValue((prevInitialValue) => ({
            ...prevInitialValue,
            selectedCategory: selectedCategory,
            pagination: {
                ...prevInitialValue.pagination,
                currentPage: 0,
            },
        }));
    };

    const handleSortChange = (event) => {
        setSortDirection(event.target.value);

        setInitialValue((prevInitialValue) => ({
            ...prevInitialValue,
            pagination: {
                ...prevInitialValue.pagination,
                currentPage: 0,
            },
        }));
    };

    const handlePaginationChange = (event, newPage) => {
        setInitialValue((prevInitialValue) => ({
            ...prevInitialValue,
            pagination: {
                ...prevInitialValue.pagination,
                currentPage: newPage,
            },
        }));
    };

    const handleRowsPerPageChange = (event) => {
        const newPageSize = event.target.value;

        setInitialValue((prevInitialValue) => ({
            ...prevInitialValue,
            pagination: {
                ...prevInitialValue.pagination,
                pageSize: newPageSize,
                currentPage: 0,
            },
        }));
    };

    const getProducts = async () => {
        const { currentPage, pageSize } = initialValue.pagination;
        const selectedCategory = initialValue.selectedCategory;
        let apiUrl = `/products/list?page=${
            currentPage + 1
        }&perPage=${pageSize}&sortDirection=${sortDirection}`;
        if (selectedCategory !== "") {
            apiUrl += `&sortCategory=${selectedCategory}`;
        }

        const response = await api.get(apiUrl);

        if (response.status === 200) {
            setProducts(response.data.data);
            setTotalProducts(response.data.meta.pagination.total);
        } else {
        }
    };

    const getCategories = async () => {
        const response = await api.get("/categories/list");

        if (response.status === 200) {
            const categoryName = response.data.data.map(
                (category) => category.category_name
            );
            setCategoryNames(["Show all categories", ...categoryName]);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    useEffect(() => {
        getProducts();
    }, [initialValue.pagination, sortDirection, initialValue.selectedCategory]);

    return (
        <Fragment>
            <Box>
                <Grid container spacing={1}>
                    <Grid item xs={4} sm={3} md={3} lg={2} xl={2}>
                        <FormControl fullWidth>
                            <InputLabel>Filter by Category</InputLabel>
                            <Select
                                value={initialValue.selectedCategory}
                                onChange={handleCategoryChange}
                            >
                                {categoryNames.map((categoryName, index) => (
                                    <MenuItem key={index} value={categoryName}>
                                        {categoryName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={8} sm={9} md={9} lg={10} xl={10}>
                        <Select
                            value={sortDirection}
                            onChange={handleSortChange}
                        >
                            <MenuItem value="asc">Ascending</MenuItem>
                            <MenuItem value="desc">Descending</MenuItem>
                        </Select>
                    </Grid>
                </Grid>
            </Box>

            <Box>
                <Paper
                    elevation={3}
                    sx={{
                        padding: 1,
                        height: "67vh",
                        overflow: "auto",
                        borderRadius: "10px",
                    }}
                >
                    <Grid container spacing={1}>
                        {products.map((product) => (
                            <Grid
                                item
                                xs={6}
                                md={4}
                                lg={2.4}
                                key={product.product_id}
                            >
                                <Paper elevation={3} sx={{ padding: 1 }}>
                                    <Typography variant="h6">
                                        {product.product_name}
                                    </Typography>
                                    <Typography variant="body2">
                                        Category: {product.category_name}
                                    </Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Paper>
            </Box>

            <Box>
                <TablePagination
                    sx={{ height: 700, width: "100%" }}
                    component={Box}
                    count={totalProducts || 0}
                    page={initialValue.pagination.currentPage}
                    rowsPerPage={initialValue.pagination.pageSize}
                    onPageChange={handlePaginationChange}
                    onRowsPerPageChange={handleRowsPerPageChange}
                    labelRowsPerPage="Products Per Page"
                />
            </Box>
        </Fragment>
    );
}

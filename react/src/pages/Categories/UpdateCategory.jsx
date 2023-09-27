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

const DeleteCategory = ({ selectedCategory, onClose }) => {
  const [categoryId, setCategoryId] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [UpdateProductManager, setUpdateProductManager] = useState("");
  const [productManager, setProductManager] = useState([]);
  const [productManagerId, setProductManagerId] = useState();

  useEffect(() => {
      setCategoryName(selectedCategory.row.category_name);
      setCategoryDescription(selectedCategory.row.category_description);
      setUpdateProductManager(selectedCategory.row.product_manager);
      setCategoryId(selectedCategory.row.id);
  }, [
      setProductManagerId,
      selectedCategory.row.category_name,
      selectedCategory.row.category_description,
      selectedCategory.row.product_manager,
  ]);

  const getProductManager = async () => {
      const response = await api.get("/users/product-manager");

      if (response.status == 200) {
          setProductManager(response.data.data);
      }
  };

  useEffect(() => {
      getProductManager();
  }, []);

  const updateCategory = async () => {
      try {
          const response = await api.put(`/categories/update/${categoryId}`, {
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
                          label="Enter new category name"
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
                          label="Enter new category description"
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
                          getOptionLabel={(option) => option.username || ""}
                          isOptionEqualToValue={(option, value) =>
                              option.username === value
                          }
                          onChange={handleProductManagerChange}
                          value={UpdateProductManager} // Set the value to match UpdateProductManager
                          renderInput={(params) => (
                              <TextField
                                  {...params}
                                  label="Select Product Manager"
                                  fullWidth
                                  helperText={`Current Product Manager: ${UpdateProductManager}`}
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
                      onClick={updateCategory}
                  >
                      Delete
                  </Button>
              </DialogActions>
          </DialogContent>
      </Fragment>
  );
};

export default DeleteCategory;

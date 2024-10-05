import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoriesQuery,
} from "../../redux/api/categoryApiSlice";

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AdminMenu from "./AdminMenu";

const CategoryList = () => {
  const { data: categories, refetch } = useFetchCategoriesQuery();
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // To track create or update modal

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleCreateCategory = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Category name is required");
      return;
    }

    try {
      const result = await createCategory({ name }).unwrap();
      setName("");
      toast.success(`${result.name} is created.`);
      setModalVisible(false)
      refetch(); // Refetch categories after creation
    } catch (error) {
      console.error(error);
      toast.error("Creating category failed, try again.");
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();

    if (!updatingName.trim()) {
      toast.error("Category name is required");
      return;
    }

    try {
      const result = await updateCategory({
        categoryId: selectedCategory._id,
        updatedCategory: { name: updatingName },
      }).unwrap();

      toast.success(` Category  is updated.`);
      setSelectedCategory(null);
      setUpdatingName("");
      setModalVisible(false);
      refetch(); // Refetch categories after update
    } catch (error) {
      console.error(error);
      toast.error("Updating category failed, try again.");
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await deleteCategory(categoryId).unwrap();
      toast.success("Category successfully deleted.");
      setModalVisible(false);
      refetch(); // Refetch categories after deletion
    } catch (error) {
      console.error(error);
      toast.error("Category deletion failed. Try again.");
    }
  };
  

  const openCreateModal = () => {
    setIsEditing(false);
    setModalVisible(true);
  };

  const openEditModal = (category) => {
    setIsEditing(true);
    setSelectedCategory(category);
    setUpdatingName(category.name);
    setModalVisible(true);
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        backgroundColor: "rgb(34, 33, 33)",
        color: "white",
        padding: "2rem",
        borderRadius: "8px",
        mt: 10,
      }}
    >
         <AdminMenu/>
      {/* Toast Container for notifications */}
      <ToastContainer />

      <Box mt={4} mb={4}>
        <Typography variant="h4" gutterBottom>
          Manage Categories
        </Typography>

        {/* Create Category Button */}
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Button variant="contained" color="inherit" onClick={openCreateModal} sx={{color:"white",backgroundColor:"darkgreen"}}>
            Create Category
          </Button>
        </Box>

        {/* Category List */}
        <Grid container spacing={3}>
          {categories?.map((category) => (
            <Grid item xs={12} sm={6} md={4} key={category._id}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  backgroundColor: "black",
                  padding: "1rem",
                  borderRadius: "8px",
                }}
              >
                <Typography variant="h6" sx={{ color: "lightgray" }}>
                  {category.name}
                </Typography>
                <Box>
                  <IconButton
                    variant="outlined"
                    color="info"
                    onClick={() => openEditModal(category)}
                    sx={{
                      marginRight: "8px",
                      color: "blue",
                    }}
                  >
                    <EditIcon/>
                  </IconButton>
                  <IconButton
                    variant="outlined"
                    color="error"
                    onClick={() => handleDeleteCategory(category._id)}
                    sx={{ color: "red", borderColor: "red" }}
                  >
                    <DeleteIcon/>
                  </IconButton>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Create/Update Modal */}
        <Dialog
          open={modalVisible}
          onClose={() => setModalVisible(false)}
          fullWidth
          maxWidth="sm"
          PaperProps={{
            style: {
              backgroundColor: "#13101f",
              color: "white",
              borderRadius:"10px"
            },
          }}
        >
          <DialogTitle sx={{ color: "lightblue" }}>
            {isEditing ? "Update Category" : "Create Category"}
          </DialogTitle>
          <br /><br />
          <DialogContent>
            <TextField
              fullWidth
              label="Category Name"
              variant="outlined"
              value={isEditing ? updatingName : name}
              onChange={(e) =>
                isEditing ? setUpdatingName(e.target.value) : setName(e.target.value)
              }
              autoFocus
              InputLabelProps={{
                style: { color: "lightgray" },
              }}
              InputProps={{
                style: { color: "white", borderColor: "lightgray" },
              }}
              sx={{ mb: 2 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setModalVisible(false)} color="primary">
              Cancel
            </Button>
            {isEditing ? (
              <Button onClick={handleUpdateCategory} color="primary">
                Update
              </Button>
            ) : (
              <Button onClick={handleCreateCategory} color="primary">
                Create
              </Button>
            )}
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default CategoryList;

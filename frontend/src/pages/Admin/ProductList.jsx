import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import {
  Box,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import AdminMenu from "./AdminMenu";

const ProductList = () => {
  const [images, setImages] = useState([]); // To store multiple image URLs
  const [imageLink, setImageLink] = useState(""); // For the image link text field
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const navigate = useNavigate();

  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();

  // Handle submitting the form
 // Inside handleSubmit function
const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("Submit");

  try {
    const productData = new FormData();
    // Append the regular fields
    productData.append("name", name);
    productData.append("description", description);
    productData.append("price", price);
    productData.append("category", category);
    productData.append("quantity", quantity);
    productData.append("brand", brand);
    productData.append("countInStock", stock);
    
    // Append the images array as a JSON string
    productData.append("images", JSON.stringify(images));

    console.log("Product Data:", productData);

    // Make the API call
    const { data } = await createProduct(productData).unwrap();

    console.log("Response:", data);

    if (data.error) {
      toast.error("Product creation failed. Try again.");
    } else {
      toast.success(`${data.name} is created`);
      navigate('/admin/allproductslist')
      window.location.reload();
    }
  } catch (error) {
    console.error("Error caught in catch:", error);
    toast.error("Product creation failed. Try again.");
  }
};

  
  // Handle adding an image link
  const addImageLinkHandler = () => {
    if (imageLink) {
      setImages((prevImages) => [...prevImages, imageLink]); // Add new URL to the list
      setImageLink(""); // Clear the input field
    }
  };

  return (
    <Box sx={{ backgroundColor: "black", p: 3, borderRadius: 2, margin: "70px 200px" }}>
      <AdminMenu/>
      <Typography variant="h4" color="white" mb={3}>
        Create Product
      </Typography>

      {/* Display added image URLs */}
      {images.length > 0 && (
        <Box display="flex" flexWrap="wrap" mb={3}>
          {images.map((imgUrl, index) => (
            <Box key={index} display="flex" alignItems="center" mr={2} mb={2}>
                <img
              src={imgUrl}
              alt={`product-${index}`}
              style={{ maxHeight: "200px", margin: "auto", display: "block", marginBottom: "10px" }}
            />
            </Box>
          ))}
        </Box>
      )}

      {/* Input for image link */}
      <Box display="flex" flexDirection="row" mb={2}>
        <TextField
          label="Image URL"
          variant="filled"
          value={imageLink}
          onChange={(e) => setImageLink(e.target.value)}
          sx={{ flex: 1, marginRight: 2, backgroundColor: "white" }}
        />
        <Button onClick={addImageLinkHandler} variant="contained" color="primary">
          Add Image
        </Button>
      </Box>

      <Box display="flex" flexDirection="row" flexWrap="wrap" mb={3}>
        <TextField
          label="Name"
          variant="filled"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ marginRight: 2, flex: 1, marginBottom: 2, backgroundColor: "white" }}
        />
        <TextField
          label="Price"
          variant="filled"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          sx={{ flex: 1, marginBottom: 2, backgroundColor: "white" }}
        />
      </Box>

      <Box display="flex" flexDirection="row" flexWrap="wrap" mb={3}>
        <TextField
          label="Quantity"
          variant="filled"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          sx={{ marginRight: 2, flex: 1, marginBottom: 2, backgroundColor: "white" }}
        />
        <TextField
          label="Brand"
          variant="filled"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          sx={{ flex: 1, marginBottom: 2, backgroundColor: "white" }}
        />
      </Box>

      <TextField
        label="Description"
        variant="filled"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        multiline
        rows={4}
        sx={{ marginBottom: 2, width: '100%', backgroundColor: "white" }}
      />

      <Box display="flex" flexDirection="row" flexWrap="wrap" mb={3}>
        <TextField
          label="Count In Stock"
          variant="filled"
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          sx={{ marginRight: 2, flex: 1, marginBottom: 2, backgroundColor: "white" }}
        />

        <FormControl sx={{ flex: 1, marginBottom: 2 }}>
          <InputLabel color="white">Category</InputLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            sx={{ backgroundColor: "white" }}
            label="Category"
          >
            {categories?.map((c) => (
              <MenuItem key={c._id} value={c._id}>
                {c.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Button onClick={handleSubmit} variant="contained" color="primary" sx={{ mt: 2 }}>
        Submit
      </Button>
    </Box>
  );
};

export default ProductList;

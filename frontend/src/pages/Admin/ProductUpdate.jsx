import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
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
  IconButton,
} from "@mui/material";
import AdminMenu from "./AdminMenu";
import DeleteIcon from "@mui/icons-material/Delete";

const ProductUpdate = () => {
  const params = useParams();
  const { data: productData ,refetch} = useGetProductByIdQuery(params._id);
  const navigate = useNavigate();

  // Define states
  const [images, setImages] = useState(productData?.images || []);
  const [imageLink, setImageLink] = useState("");
  const [name, setName] = useState(productData?.name || "");
  const [description, setDescription] = useState(productData?.description || "");
  const [price, setPrice] = useState(productData?.price || "");
  const [category, setCategory] = useState(productData?.category || "");
  const [quantity, setQuantity] = useState(productData?.quantity || "");
  const [brand, setBrand] = useState(productData?.brand || "");
  const [stock, setStock] = useState(productData?.countInStock || "");

  const { data: categories = [] } = useFetchCategoriesQuery();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  useEffect(() => {
    if (productData) {
      setImages(productData.images || []);
      setName(productData.name);
      setDescription(productData.description);
      setPrice(productData.price);
      setCategory(productData.category?._id || "");
      setQuantity(productData.quantity);
      setBrand(productData.brand);
      setStock(productData.countInStock);
    }
  }, [productData]);

  // Add a new image URL to the list
  const addImageLinkHandler = () => {
    if (imageLink) {
      setImages((prevImages) => [...prevImages, imageLink]);
      setImageLink("");
    }
  };

  // Remove an image URL from the list
  const removeImageHandler = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  // Handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("quantity", quantity);
      formData.append("brand", brand);
      formData.append("countInStock", stock);
      formData.append("images", JSON.stringify(images));

      const data = await updateProduct({ productId: params._id, formData }).unwrap();
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("Product successfully updated");
        refetch();
        navigate("/admin/allproductslist");
      }
    } catch (err) {
      toast.error("Product update failed. Try again.");
    }
  };

  // Handle product deletion
  const handleDelete = async () => {
    try {
      if (window.confirm("Are you sure you want to delete this product?")) {
        const { data } = await deleteProduct(params._id);
        toast.success(`"${data.name}" is deleted`);
        // After updating the product, navigate back to the products list with a "refetch" signal
        navigate("/admin/allproductslist", { state: { updated: true } });

      }
    } catch (err) {
      toast.error("Delete failed. Try again.");
    }
  };

  return (
    <Box sx={{ padding: 3, margin: "70px 300px", color: "white" }}>
      <AdminMenu />
      <Typography variant="h4" mb={3}>
        Update / Delete Product
      </Typography>

      {/* Display current images in a horizontal row */}
      {images.length > 0 && (
        <Box display="flex" flexWrap="wrap" mb={3}>
          {images.map((imgUrl, index) => (
            <Box key={index} display="flex" alignItems="center" mr={2} mb={2}>
              <img
                src={imgUrl}
                alt={`product-${index}`}
                style={{ maxHeight: "150px", marginRight: "10px" }}
              />
              <IconButton
                color="error"
                aria-label="delete"
                onClick={() => removeImageHandler(index)}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
        </Box>
      )}

      {/* Add image URL */}
      <Box display="flex" mb={3}>
      <TextField
                label="Image URL"
                variant="outlined"
                value={imageLink}
                onChange={(e) => setImageLink(e.target.value)}
                fullWidth
                sx={{backgroundColor:"#000000"}}
                InputProps={{
                    style: { color: 'white' }, // Text color
                }}
                InputLabelProps={{
                    style: { color: 'yellow' }, // Label color
                }}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={addImageLinkHandler}
          sx={{ marginLeft: 2 }}
        >
          Add Image
        </Button>
      </Box>

      {/* Product form fields */}
      <Box display="flex" flexDirection="row" flexWrap="wrap" mb={3}>
        <Box flex={3} mr={2}>
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          fullWidth
          onChange={(e) => setName(e.target.value)}
          InputProps={{
            style: { color: 'white' }, // Text color
          }}
          InputLabelProps={{
            style: { color: 'yellow' }, // Label color
          }}
          sx={{backgroundColor:"#000000"}}
        />
        </Box>
        <Box flex={1}>
        <TextField
          label="Price"
          variant="outlined"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          type="number"
          sx={{backgroundColor:"#000000"}}
          InputProps={{
            style: { color: 'white' }, // Text color
          }}
          InputLabelProps={{
            style: { color: 'yellow' }, // Label color
          }}
        />
        </Box>
      </Box>

      <Box display="flex" flexDirection="row" flexWrap="wrap" mb={3}>
        <Box flex={1} mr={2}>
          <TextField
            label="Quantity"
            variant="outlined"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            type="number"
            fullWidth
            sx={{backgroundColor:"#000000"}}
            InputProps={{
              style: { color: 'white' }, // Text color
            }}
            InputLabelProps={{
              style: { color: 'yellow' }, // Label color
            }}
          />
        </Box>
        
        <Box flex={1}>
          <TextField
            label="Brand"
            variant="outlined"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            fullWidth
            sx={{backgroundColor:"#000000"}}
            InputProps={{
              style: { color: 'white' }, // Text color
            }}
            InputLabelProps={{
              style: { color: 'yellow' }, // Label color
            }}
          />
        </Box>
      </Box>

     <Box mb={2}>
     <TextField
        label="Description"
        variant="outlined"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        multiline
        rows={4}
        InputProps={{
            style: { color: 'white' }, // Text color
          }}
          InputLabelProps={{
            style: { color: 'yellow' }, // Label color
          }}
          sx={{backgroundColor:"#000000"}}
      />
     </Box>

      <Box display="flex" flexDirection="row" flexWrap="wrap" mb={3}>
        <Box flex={1} mr={2}>
        <TextField
          label="Count In Stock"
          variant="outlined"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          fullWidth
          InputProps={{
            style: { color: 'white' }, // Text color
          }}
          InputLabelProps={{
            style: { color: 'yellow' }, // Label color
          }}
          sx={{backgroundColor:"#000000"}}
        />
        </Box>
        <Box flex={1}>
        <FormControl fullWidth sx={{ marginBottom: 2 ,backgroundColor:"#000000"}} >
          <InputLabel sx={{color:"white"}} >Category</InputLabel>
          <Select
             sx={{ color: "white" }} 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((c) => (
              <MenuItem key={c._id} value={c._id}>
                {c.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        </Box>
      </Box>

      {/* Update and Delete buttons */}
      <Box display="flex" justifyContent="space-between">
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ marginRight: 2 }}
        >
          Update
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={handleDelete}
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
};

export default ProductUpdate;

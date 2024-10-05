import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { useAllProductsQuery, useDeleteProductMutation } from "../../redux/api/productApiSlice";
import { toast } from "react-toastify";
import { Box, Button, Card, CardContent, CardMedia, Typography, Grid, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AdminMenu from "./AdminMenu";

const AllProducts = () => {

  const { data: products, isLoading, isError, refetch } = useAllProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();
  const navigate = useNavigate();

  const handleDelete = async (id, name) => {
    try {
      let answer = window.confirm(`Are you sure you want to delete "${name}"?`);
      if (!answer) return;

      const { data } = await deleteProduct(id);
      refetch();
      toast.success(`"${data.name}" is deleted`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      navigate("/admin/allproductslist");
    } catch (err) {
      console.log(err);
      toast.error("Delete failed. Try again.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading products</div>;
  }

  return (
    <>
      <Box sx={{ 
        mt:"70px",
          pl: "150px",
          pr:"50px",
        width: "100%",
        maxWidth: "100vw",  // Constrain width to 100% of the viewport width
        overflowX: "hidden" }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Typography variant="h4" gutterBottom className="text-white">
              All Products ({products.length})
            </Typography>
            <Grid container spacing={5}>
              {products.map((product) => (
                <Grid item xs={12} sm={6} md={3} key={product._id} sx={{borderRadius:"50px"}}>
                  <Card sx={{backgroundColor:"#f7fcc7"}}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={product.images?.[0] || "https://via.placeholder.com/200"}
                      alt={product.name}
                    />
                    <CardContent>
                      <Box display="flex" justifyContent="space-between">
                        <Typography variant="h6" gutterBottom>
                          {product.name}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {moment(product.createdAt).format("MMMM Do YYYY")}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="textSecondary">
                        {product.description?.substring(0, 100)}...
                      </Typography>
                      <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                        <Typography variant="h6" color="primary">
                        ₹{product.price}
                        </Typography>
                        <Box>
                          <Button
                            component={Link}
                            to={`/admin/allproductslist/update/${product._id}`}
                            variant="contained"
                            color="primary"
                            size="small"
                          >
                            Update
                          </Button>
                          <IconButton
                            color="secondary"
                            onClick={() => handleDelete(product._id, product.name)}
                            size="small"
                            sx={{ ml: 1 }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12} md={3}>
            <AdminMenu />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default AllProducts;

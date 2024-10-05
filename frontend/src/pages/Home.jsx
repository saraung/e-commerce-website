import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
// import Message from "../components/Message";
import Product from "./Products/Product";
import ProductCarousel from "./Products/ProductCarousel";
import { Box, CircularProgress, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import ErrorMsg from "../components/ErrorMsg";

const Home = () => {
  const { keyword } = useParams();
  const [searchQuery, setSearchQuery] = useState(keyword || "");
  const { data, isLoading, isError, refetch } = useGetProductsQuery({ keyword: searchQuery });

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    if (searchQuery) {
      refetch(); // This will fetch data whenever the search query changes
    }
  }, [searchQuery, refetch]);

  return (
    <>
      {!keyword ? (
        <Box sx={{ mt: 4 }}>
          <ProductCarousel />
        </Box>
      ) : null}

      <Box sx={{ mt: 3, mx: { xs: 2, sm: 3, md: 40 } }}>
        <TextField
          label="Search Products"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            style: { color: 'white' }, // Text color
          }}
          InputLabelProps={{
            style: { color: '#FFD700' }, // Label color
          }}
          sx={{
            backgroundColor: "black", // Dark background for the search field
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#888", // Light border color
              },
              "&:hover fieldset": {
                borderColor: "yellow", // Yellow border on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "yellow", // Yellow border when focused
              },
              "&.Mui-focused": {
                boxShadow: 'none', // Remove the box shadow
              },
            },
          }}
        />
      </Box>

      <Box sx={{ mt: 4, mx: { xs: 2, sm: 3, md: 40 }, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" color="#FFD700" gutterBottom textAlign={{ xs: 'center', md: 'left' }}>
          Discover Trending Products
        </Typography>
        <Link
          to="/shop"
          style={{
            backgroundColor: '#FFD700',
            color: 'black',
            fontWeight: 'bold',
            borderRadius: '25px',
            padding: '10px 20px',
            textDecoration: 'none',
            textAlign: 'center',
            width: { xs: '100%', md: 'auto' }, // Full width on mobile
            marginTop: { xs: 1, md: 0 }, // Add margin on mobile
          }}
        >
          Shop
        </Link>
      </Box>

      {isLoading ? (
        <Loader/>
      ) : isError ? (
       <ErrorMsg/>
      ) : (
        <div>
          {data.products.length === 0 ? (
           <Box sx={{marginTop:"100px",marginBottom:"200px"}}>
             <Typography variant="h6" color="white" align="center" sx={{ mt: 4 }}>
              No products found matching your search.
            </Typography>
           </Box>
          ) : (
            <div className="flex justify-center flex-wrap mt-[2rem]">
              {data.products.map((product) => (
                <div key={product._id}>
                  <Product product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Home;

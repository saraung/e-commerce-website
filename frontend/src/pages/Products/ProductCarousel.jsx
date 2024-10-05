import React from "react";
import Slider from "react-slick";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { FaBox, FaClock, FaShoppingCart, FaStar, FaStore } from "react-icons/fa";
import moment from "moment";
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import HeartIcon from "./HeartIcon";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';


const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Show 1 slide on mobile
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 768, // For tablet and smaller screens
        settings: {
          slidesToShow: 1, // Show 1 slide
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024, // For medium screens
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1280, // For larger screens
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box sx={{ bgcolor: "", py: 3, px: {xs:"25px",md:"150px"},}}>
      {isLoading ? null : error ? (
        // <Box>
        //   {error?.data?.message || error.error}
        // </Box>
        null
      ) : (
        <Box>
          <Typography variant="h6" sx={{ color: "#FFD700" }}>Top Selling Products</Typography>
          <Slider {...settings}>
            {products.map((product) => (
              <div key={product._id} style={{ padding: "0 5px" }}>
                {/* Banner Style for Web View */}
                <Box sx={{
                  display: { xs: 'block', md: 'flex' },
                  justifyContent: 'space-between',
                  background: '#FFD700',
                  color: "black",
                  borderRadius: 2,
                  boxShadow: 4,
                  height: { xs: "480px", md: "270px" }, // Increased height for mobile
                  width: "100%",
                  cursor: "pointer",
                  p: { xs: 3, md: 1 }, // Adjusted padding for mobile
                }}>
                  <Box sx={{ flex: 1 }}>
                    <Link to={`/product/${product._id}`} style={{ textDecoration: "none", color: "white" }}>
                      <CardMedia
                        component="img"
                        height="100%"
                        image={product.images?.[0] || "https://via.placeholder.com/150"}
                        alt={product.name}
                        sx={{
                          objectFit: "cover",
                          borderRadius: "10px",
                          objectPosition: "center center",
                          height: "100%", // Ensures it takes full height in banner view
                        }}
                      />
                    </Link>
                  </Box>
                  <CardContent sx={{ flex: 2, padding: "8px" }}>
                    <Typography variant="h6" gutterBottom  sx={{ fontSize: { xs: '1rem', md: '1.5rem' },fontWeight:"bold"}}>
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="black" sx={{ fontSize: { xs: '0.8rem', md: '1.5rem' }}}>
                      {product.description?.substring(0, 60)}...
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                      <Box>
                        <Typography variant="body2" color="darkblue" sx={{ fontSize: { xs: '0.7rem', md: '1.5rem' }}}>
                          <FaStore /> {product.brand}
                        </Typography>
                        <Typography variant="body2" color="gray" sx={{ fontSize: { xs: '0.7rem', md: '1.1rem' }}}>
                          <FaClock /> {moment(product.createdAt).fromNow()}
                        </Typography>
                        <Typography variant="body2" color="black" sx={{ fontSize: { xs: '1.5rem', md: '2.5rem' },fontWeight:"bold",fontStyle:"italic",fontFamily:'monospace'}}>
                          <CurrencyRupeeIcon /> {product.price}
                        </Typography>
                      </Box>
                      <Box>
                        <Box display="flex" alignItems="center" sx={{ fontSize: { xs: '1rem', md: '2.5rem' }}}>
                          <Typography variant="body2" color="black" sx={{ fontSize: { xs: '1rem', md: '2.5rem' }}}>
                            {Math.round(product.rating)}
                          </Typography>&nbsp;
                          <FaStar color="#000000" style={{ marginLeft: "4px" }} />
                        </Box><br /><br />
                        <Typography variant="body2" color={product.countInStock === 0 ? "red" : "green"} fontSize="0.7rem">
                          <FaBox /> In Stock: {product.countInStock}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Box>
              </div>
            ))}
          </Slider>
        </Box>
      )}
    </Box>
  );
};

export default ProductCarousel;

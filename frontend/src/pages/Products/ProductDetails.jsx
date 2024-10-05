import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useGetProductDetailsQuery, useCreateReviewMutation } from '../../redux/api/productApiSlice';
import {
  Container,
  Grid,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Box,
  Rating,
  IconButton
} from '@mui/material';
import { FaStore, FaClock, FaShoppingCart, FaBox, FaStar } from 'react-icons/fa';
import moment from 'moment';
import HeartIcon from './HeartIcon';
import ProductTabs from './ProductTabs';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Ratings from './Ratings';
import { addToCart } from "../../redux/features/cart/cartSlice"

const ProductDetails = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [mainImage, setMainImage] = useState(''); // State for main image

  const { data: product, isLoading, refetch, error } = useGetProductDetailsQuery(productId);
  const { userInfo } = useSelector(state => state.auth);

  const [createReview, { isLoading: loadingProductReview }] = useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({ productId, rating, comment }).unwrap();
      refetch();
      toast.success('Review created successfully');
    } catch (error) {
      toast.error(error?.data.error || error.message);
    }
  };

  // Set the initial main image when the product data is loaded
  useEffect(() => {
    if (product && product.images && product.images.length > 0) {
      setMainImage(product.images[0]); // Automatically set the first image as the main image
    }
  }, [product]);


  const navigate=useNavigate()

    const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 2,
        bgcolor: 'black',
        color: 'white',
        borderRadius: 2,
        p: 4,
        marginTop:"60px"
      }}
    >
      {isLoading ? (
        <CircularProgress sx={{ color: 'white' }} />
      ) : error ? (
        <Typography color="error">{error?.data?.message || error.message}</Typography>
      ) : (
        <>
          <Link to="/" style={{ textDecoration: 'none', color: '#FF4081', fontWeight: 'bold' }}>
            <ArrowBackIcon />
          </Link>

          <Grid container spacing={4} sx={{ mt: 2 }}>
            {/* Left: Product Image and Thumbnails */}
            <Grid item xs={12} md={6}>
              <Box component="img" src={mainImage} alt={product.name} sx={{ width: '100%', borderRadius: 2 }} />

              {/* Thumbnails */}
              <Box sx={{ display: 'flex', mt: 2 }}>
                {product.images.map((img, index) => (
                  <Box
                    key={index}
                    component="img"
                    src={img}
                    alt={`Thumbnail ${index}`}
                    sx={{
                      width: 64,
                      height: 64,
                      objectFit: 'cover',
                      borderRadius: 1,
                      border: img === mainImage ? '2px solid #FF4081' : '2px solid transparent',
                      cursor: 'pointer',
                      mx: 0.5,
                      '&:hover': { border: '2px solid #FF4081' },
                    }}
                    onClick={() => setMainImage(img)} // Set the main image on click
                  />
                ))}
              </Box>
            </Grid>

            {/* Right: Product Info */}
            <Grid item xs={12} md={6}>
              <Typography variant="h4" component="h1" sx={{ color: 'white' }} gutterBottom>
                {product.name}
              </Typography>

              <Typography variant="body1" sx={{ color: '#B0B0B0' }} paragraph>
                {product.description}
              </Typography>

              <Typography variant="h5" component="h2" sx={{ color: 'yellow' }} gutterBottom>
                ₹{product.price}
              </Typography>

              <Box my={2}>
                <Typography
                  variant="body2"
                  sx={{ color: 'white', display: 'flex', alignItems: 'center' }}
                >
                  <FaStore style={{ marginRight: 8 }} /> Brand: {product.brand}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: 'white', display: 'flex', alignItems: 'center' }}
                >
                  <FaClock style={{ marginRight: 8 }} /> Added: {moment(product.createdAt).fromNow()}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: 'white', display: 'flex', alignItems: 'center' }}
                >
                  <FaStar style={{ marginRight: 8 }} /> Reviews: {product.numReviews}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ display: 'flex', alignItems: 'center' }}
                  color={product.countInStock == 0 ? "red" : "green"}
                >
                  <FaBox style={{ marginRight: 8 }} /> In Stock: {product.countInStock}
                </Typography>
                <br />
                <Ratings value={product.rating} text={`${product.numReviews} reviews`} />
                <br />
              </Box>

              {product.countInStock > 0 && (
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel id="qty-label" sx={{ color: 'white' }}>
                    Quantity
                  </InputLabel>
                  <Select
                    labelId="qty-label"
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                    label="Quantity"
                    sx={{
                      color: 'white',
                      '.MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#FF4081',
                      },
                    }}
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <MenuItem key={x + 1} value={x + 1}>
                        {x + 1}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}

              <Button
                variant="contained"
                color="secondary"
                size="large"
                fullWidth
                disabled={product.countInStock === 0}
                sx={{ mt: 2,backgroundColor:"orange",color:"black",fontWeight:"bold"}}
                onClick={addToCartHandler}
              >
                Add to Cart
              </Button>
            </Grid>
          </Grid>

          {/* Product Tabs (Reviews, etc.) */}
          <Box mt={5}>
            <ProductTabs
              loadingProductReview={loadingProductReview}
              userInfo={userInfo}
              submitHandler={submitHandler}
              rating={rating}
              setRating={setRating}
              comment={comment}
              setComment={setComment}
              product={product}
            />
          </Box>
        </>
      )}
    </Container>
  );
};

export default ProductDetails;

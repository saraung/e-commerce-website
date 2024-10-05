import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, TextField, FormControl, Tabs, Tab, Rating } from '@mui/material';
import { useGetTopProductsQuery } from '../../redux/api/productApiSlice';
import SmallProduct from './SmallProduct';
import Loader from '../../components/Loader';
import Ratings from './Ratings';
import Product from './Product';

const ProductTabs = ({
  loadingProductReview,
  userInfo,
  submitHandler,
  rating,
  setRating,
  comment,
  setComment,
  product,
}) => {
  const { data, isLoading } = useGetTopProductsQuery();
  const [activeTab, setActiveTab] = useState(1);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        textColor="secondary"
        indicatorColor="secondary"
        variant="scrollable"
        scrollButtons="auto"
        sx={{ borderBottom: '1px solid #444', color: 'white' }}
      >
        <Tab label="Write Your Review" value={1} sx={{ color: 'white' }} />
        <Tab label="All Reviews" value={2} sx={{ color: 'white' }} />
        <Tab label="Related Products" value={3} sx={{ color: 'white' }} />
      </Tabs>

      {/* Tab Content */}
      <Box sx={{ mt: 2 }}>
        {activeTab === 1 && (
          <Box mt={4}>
            {userInfo ? (
              <form onSubmit={submitHandler}>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <Typography sx={{ color: 'white', mb: 1 }}>Rating</Typography>
                  <Rating
                    name="product-rating"
                    value={rating}
                    onChange={(event, newValue) => setRating(newValue)}
                    precision={0.5} // Allows half stars
                    sx={{
                      color: '#FFEB3B',
                      '& .MuiRating-iconEmpty': { color: '#666' }, // Color for empty stars
                    }}
                  />
                </FormControl>

                <TextField
                  id="comment"
                  label="Comment"
                  variant="outlined"
                  fullWidth
                //   multiline
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  sx={{
                    mb: 2,
                    bgcolor: '#333',
                    color: 'white',
                    '.MuiOutlinedInput-root': {
                      color: 'white',
                    },
                    '.MuiInputLabel-root': { color: 'white' },
                    '.MuiOutlinedInput-notchedOutline': {
                      borderColor: 'white',
                    },
                  }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  disabled={loadingProductReview}
                //   fullWidth
                  sx={{ py: 1.5, mt: 2,backgroundColor:"yellow",color:"black",fontWeight:"bold" }}
                >
                  Submit
                </Button>
              </form>
            ) : (
              <Typography color="secondary">
                Please <Link to="/login">sign in</Link> to write a review
              </Typography>
            )}
          </Box>
        )}

        {activeTab === 2 && (
          <Box>
            {product.reviews.length === 0 ? (
              <Typography>No Reviews</Typography>
            ) : (
              product.reviews.map((review) => (
                <Box
                  key={review._id}
                  sx={{
                    bgcolor: '#1A1A1A',
                    p: 3,
                    mb: 2,
                    borderRadius: 2,
                    color: 'white',
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography sx={{ color: '#B0B0B0' }}>
                      <strong>{review.name}</strong>
                    </Typography>
                    <Typography sx={{ color: '#B0B0B0' }}>
                      {review.createdAt.substring(0, 10)}
                    </Typography>
                  </Box>
                  <Typography>{review.comment}</Typography>
                  <Ratings value={review.rating} />
                </Box>
              ))
            )}
          </Box>
        )}

        {activeTab === 3 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 2 }}>
            {!data ? (
              <Loader />
            ) : (
              data.map((product) => (
                <Box key={product._id} sx={{ m: 1 }}>
                  <Product product={product} />
                </Box>
              ))
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ProductTabs;

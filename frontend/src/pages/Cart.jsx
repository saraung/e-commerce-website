import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";
import { Box, Grid, Typography, Button, IconButton, Select, MenuItem, Link } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme(); // Get theme for dynamic styling

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <Box sx={{ bgcolor: 'matteblack', color: 'white', minHeight: '100vh', p: 4 ,marginTop:"60px"}}>
      {cartItems.length === 0 ? (
        <Typography variant="h5" align="center" sx={{ color: theme.palette.grey[400] }}>
          Your cart is empty <Link component={RouterLink} to="/shop" sx={{ color: "yellow" }}>Go To Shop</Link>
        </Typography>
      ) : (
        <Grid container spacing={3} justifyContent="space-between">
          {/* Cart Items */}
          <Grid item xs={12} md={8}>
            <Typography variant="h4" fontWeight="bold" mb={3} sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}>
              Shopping Cart
            </Typography>
            {cartItems.map((item) => (
  <Grid
    container
    key={item._id}
    alignItems="center"
    mb={2}
    sx={{
      borderBottom: `1px solid ${theme.palette.divider}`,
      pb: 2,
      flexDirection: 'row', // Force horizontal layout
      overflowX: 'auto', // Allow horizontal scrolling on mobile
    }}
  >
    {/* Product Image */}
    <Grid item xs={3}>
      <Box
        component="img"
        src={item.images[0]}
        alt={item.name}
        sx={{
          width: "5rem",
          height: "5rem",
          borderRadius: "8px",
          objectFit: "cover",
        }}
      />
    </Grid>

    {/* Product Details */}
    <Grid item xs={5}>
      <Link
        component={RouterLink}
        to={`/product/${item._id}`}
        sx={{ color: "yellow", textDecoration: "none", fontSize: "1.2rem" }}
      >
        {item.name}
      </Link>
      <Typography sx={{ color: theme.palette.grey[400], mt: 1 }}>
        {item.brand}
      </Typography>
      <Typography fontWeight="bold" sx={{ mt: 1 }}>
        ${item.price}
      </Typography>
    </Grid>

    {/* Quantity Select */}
    <Grid item xs={2}>
      <Select
        value={item.qty}
        onChange={(e) => addToCartHandler(item, Number(e.target.value))}
        sx={{
          color: theme.palette.text.primary,
          bgcolor: theme.palette.background.paper,
          width: '100%',
        }}
      >
        {[...Array(item.countInStock).keys()].map((x) => (
          <MenuItem key={x + 1} value={x + 1}>
            {x + 1}
          </MenuItem>
        ))}
      </Select>
    </Grid>

    {/* Remove from Cart */}
    <Grid item xs={2} sx={{ textAlign: 'right' }}>
      <IconButton
        onClick={() => removeFromCartHandler(item._id)}
        sx={{ color: theme.palette.error.main }}
      >
        <FaTrash />
      </IconButton>
    </Grid>
  </Grid>
))}

          </Grid>
            
          {/* Cart Summary */}
          <Grid item xs={12} md={12}>
            <Box sx={{ bgcolor: theme.palette.grey[900], p: 3, borderRadius: 2 }}>
              <Typography variant="h5" fontWeight="bold" mb={2}>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
              </Typography>
              <Button
                variant="contained"
                fullWidth
                onClick={checkoutHandler}
                sx={{ mt: 3 ,backgroundColor:"#FFD700",color:"black",fontWeight:"bold"}}
                disabled={cartItems.length === 0}
              >
                Proceed To Checkout
              </Button>
            </Box>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Cart;

import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Card, CardContent, Grid, Button, Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Paper, CircularProgress, Box } from "@mui/material";
import ProgressSteps from "../../components/ProgressSteps";
import Loader from "../../components/Loader";
import { useCreateOrderMutation } from "../../redux/api/orderApiSlice";
import { clearCartItems } from "../../redux/features/cart/cartSlice";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
        paymentResult: {
          id: "",
          status: "",
          update_time: "",
          email_address: ""
        }
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error(error.data?.message || error.message);
    }
  };

  return (
    <>
      <ProgressSteps step1 step2 step3 />

      <Grid container spacing={2} sx={{ marginTop: 4, padding: 2 }}>
        {/* Order Items */}
        <Grid item xs={12} md={8}>
          {cart.cartItems.length === 0 ? (
            <Box sx={{ml:"100px",color:"red",fontSize:20,fontWeight:"bold"}}>Your order is empty</Box>
          ) : (
            <TableContainer component={Paper} sx={{ backgroundColor: "transparent" }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: "white" }}>Image</TableCell>
                    <TableCell sx={{ color: "white" }}>Product</TableCell>
                    <TableCell sx={{ color: "white" }}>Quantity</TableCell>
                    <TableCell sx={{ color: "white" }}>Price</TableCell>
                    <TableCell sx={{ color: "white" }}>Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cart.cartItems.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          style={{ width: "50px", height: "50px", objectFit: "cover" }}
                        />
                      </TableCell>
                      <TableCell>
                        <Link to={`/product/${item.product}`} style={{ color: "lightblue", textDecoration: "none" }}>
                          {item.name}
                        </Link>
                      </TableCell>
                      <TableCell sx={{ color: "white" }}>{item.qty}</TableCell>
                      <TableCell sx={{ color: "white" }}>₹{item.price.toFixed(2)}</TableCell>
                      <TableCell sx={{ color: "white" }}>₹{(item.qty * item.price).toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} md={4}>
          <Card sx={{ backgroundColor: "#1e1e1e", color: "white" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>
              <Typography>Items: ₹{cart.itemsPrice}</Typography>
              <Typography>Shipping: ₹{cart.shippingPrice}</Typography>
              <Typography>Tax: ₹{cart.taxPrice}</Typography>
              <Typography>Total: ₹{cart.totalPrice}</Typography>

              {error && <h1>{error.data.message}</h1>}

              <div style={{ marginTop: "16px" }}>
                <Typography variant="h6">Shipping</Typography>
                <Typography>
                  <strong>Address:</strong> {cart.shippingAddress.address}, {cart.shippingAddress.city}{" "}
                  {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                </Typography>
              </div>

              <div style={{ marginTop: "16px" }}>
                <Typography variant="h6">Payment Method</Typography>
                <Typography>
                  <strong>Method:</strong> {cart.paymentMethod}
                </Typography>
              </div>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={placeOrderHandler}
                disabled={cart.cartItems.length === 0}
                sx={{ marginTop: "16px" ,backgroundColor:"#FFD700",color:"black",fontWeight:"bold"}}
              >
                Place Order
              </Button>

              {isLoading && <CircularProgress/>}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default PlaceOrder;

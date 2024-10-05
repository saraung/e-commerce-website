import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  useGetPaypalClientIdQuery,
  usePayOrderMutation,
} from "../../redux/api/orderApiSlice";
import {
  Card,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Grid,
  Paper,
  Divider,
  CircularProgress,
  Box,
} from "@mui/material";
import moment from "moment";

const Order = () => {
  const { id: orderId } = useParams();
  const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId);
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const { data: paypal, isLoading: loadingPayPal, error: errorPayPal } = useGetPaypalClientIdQuery();

  const handlePayment = async () => {
    try {
      if (!userInfo) throw new Error("User is not logged in");

      const paymentDetails = {
        payer: {
          name: { given_name: userInfo.firstName || "John", surname: userInfo.lastName || "Doe" },
          email_address: userInfo.email,
        },
        status: "COMPLETED",
        id: "REAL1234567890",
      };

      await payOrder({ orderId, details: paymentDetails });
      refetch();
      toast.success("Order is paid");
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  const deliverHandler = async () => {
    await deliverOrder(orderId);
    refetch();
  };

  // Ensure order is defined before accessing properties
  if (isLoading) return <Loader />;
  if (error) return <Box variant="danger">{error.data.message}</Box>;
  if (!order) return <Box variant="danger">Order not found</Box>;

  const formattedDate = moment(order.paidAt).format("MMMM Do YYYY, h:mm A");

  return (
    <Grid container spacing={2} sx={{ marginTop: "2rem", padding: "1rem" }}>
      <Grid item xs={12} md={8}>
        <Card sx={{ padding: "1.5rem", marginBottom: "1rem", backgroundColor: "#1c1c1c" }}>
          <Typography variant="h5" gutterBottom color="white">
            Order Details
          </Typography>
          {order.orderItems.length === 0 ? (
            <Box sx={{ color: "red", fontSize: 20, fontWeight: "bold" }}>Your order is empty</Box>
          ) : (
            <TableContainer component={Paper}>
              <Table sx={{ backgroundColor: "#FFD700" }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>Product</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.orderItems.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <img src={item.images[0]} alt={item.name} style={{ width: "60px", height: "60px" }} />
                      </TableCell>
                      <TableCell>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </TableCell>
                      <TableCell>{item.qty}</TableCell>
                      <TableCell>${item.price.toFixed(2)}</TableCell>
                      <TableCell>${(item.qty * item.price).toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Card>
      </Grid>

      <Grid item xs={12} md={4}>
        <Card sx={{ padding: "1.5rem", backgroundColor: "#1c1c1c" }}>
          <Typography variant="h5" gutterBottom color="white">
            Order Summary
          </Typography>
          <Divider sx={{ marginY: "1rem" }} />
          <Typography variant="body1" color="white">
            <strong>Order ID:</strong> {order._id}
          </Typography>
          <Typography variant="body1" color="white">
            <strong>Customer:</strong> {order.user.username}
          </Typography>
          <Typography variant="body1" color="white">
            <strong>Email:</strong> {order.user.email}
          </Typography>
          <Typography variant="body1" color="white">
            <strong>Address:</strong> {`${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.postalCode}, ${order.shippingAddress.country}`}
          </Typography>
          <Typography variant="body1" color="white">
            <strong>Payment Method:</strong> {order.paymentMethod}
          </Typography>
          <Typography variant="body1" sx={{ marginY: "1rem" }} color="white">
            <strong>Total Amount:</strong> ${order.totalPrice}
          </Typography>

          {!order.isPaid ? (
            <>
              <Divider sx={{ marginY: "1rem" }} />
              {loadingPay && <CircularProgress />}
              {isPending ? (
                <Loader />
              ) : (
                <PayPalButtons onClick={handlePayment} style={{ width: "100%" }} />
              )}
            </>
          ) : (
            <Box sx={{ color: "green", fontSize: 20, fontWeight: "bold" }}>Paid on {formattedDate}</Box>
          )}

          {loadingDeliver && <CircularProgress />}
          {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
            <Button
              variant="contained"
              color="success"
              fullWidth
              sx={{ marginTop: "1rem" }}
              onClick={deliverHandler}
            >
              Mark As Delivered
            </Button>
          )}
        </Card>
      </Grid>
    </Grid>
  );
};

export default Order;

import React from 'react';
// import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/api/orderApiSlice";
import AdminMenu from "./AdminMenu";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Button,
  Typography,
  Paper,
  Box,
  CircularProgress,
} from '@mui/material';

const OrderList = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <>
      {isLoading ? (
        <Box
        sx={{
          display: 'flex',
          justifyContent: 'center', // Center horizontally
          alignItems: 'center', // Center vertically
          height: '50vh', // Use full viewport height, adjust as needed
        }}
      >
        <CircularProgress />
      </Box>
      ) : error ? (
        // <Message variant="danger">
        //   {error?.data?.message || error.error}
        // </Message>
        <h1>Error</h1>
      ) : (
        <TableContainer component={Paper} sx={{ bgcolor: '#121212', color: 'white' ,padding:"40px",mt:2}}>
          <AdminMenu />
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: 'white' }}>ITEMS</TableCell>
                <TableCell sx={{ color: 'white' }}>ID</TableCell>
                <TableCell sx={{ color: 'white' }}>USER</TableCell>
                <TableCell sx={{ color: 'white' }}>DATE</TableCell>
                <TableCell sx={{ color: 'white' }}>TOTAL</TableCell>
                <TableCell sx={{ color: 'white' }}>PAID</TableCell>
                <TableCell sx={{ color: 'white' }}>DELIVERED</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {orders.map((order) => (
                <TableRow key={order._id} sx={{ bgcolor: '#1c1c1c' }}>
                  <TableCell>
                    <img
                      src={order.orderItems[0].images[0]}
                      alt={order._id}
                      className="w-[5rem] pt-4"
                    />
                  </TableCell>
                  <TableCell  sx={{ color: 'white' }}>{order._id}</TableCell>
                  <TableCell  sx={{ color: 'white' }}>{order.user ? order.user.username : "N/A"}</TableCell>
                  <TableCell  sx={{ color: 'white' }}>{order.createdAt ? order.createdAt.substring(0, 10) : "N/A"}</TableCell>
                  <TableCell  sx={{ color: 'white' }}>$ {order.totalPrice}</TableCell>

                  <TableCell>
                    {order.isPaid ? (
                      <Typography variant="body2" sx={{ bgcolor: 'green', color: 'white', textAlign: 'center', borderRadius: '16px', padding: '4px' }}>
                        Completed
                      </Typography>
                    ) : (
                      <Typography variant="body2" sx={{ bgcolor: 'red', color: 'white', textAlign: 'center', borderRadius: '16px', padding: '4px' }}>
                        Pending
                      </Typography>
                    )}
                  </TableCell>

                  <TableCell>
                    {order.isDelivered ? (
                      <Typography variant="body2" sx={{ bgcolor: 'green', color: 'white', textAlign: 'center', borderRadius: '16px', padding: '4px' }}>
                        Completed
                      </Typography>
                    ) : (
                      <Typography variant="body2" sx={{ bgcolor: 'red', color: 'white', textAlign: 'center', borderRadius: '16px', padding: '4px' }}>
                        Pending
                      </Typography>
                    )}
                  </TableCell>

                  <TableCell>
                    <Link to={`/order/${order._id}`}>
                      <Button variant="outlined" sx={{ color: 'white', borderColor: 'white' }}>
                        More
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default OrderList;

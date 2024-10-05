import React from 'react';
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetMyOrdersQuery } from "../../redux/api/orderApiSlice";
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
  CircularProgress,
  Box,
} from '@mui/material';

const UserOrder = () => {
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  return (
    <div className="container mx-auto">
      <Typography variant="h4" component="body" className="mb-4 " sx={{ color: '#FFD700',marginTop:"60px" }}>
        My Orders
      </Typography>

      {isLoading ? (
        <Loader/>
      ) : error ? (
        <Box>{error.message}</Box>
      ) : (
        <TableContainer component={Paper} sx={{ bgcolor: '#121212', color: 'white' ,p:6}}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: 'white' }}>IMAGE</TableCell>
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
                      alt={order.user}
                      className="w-[6rem]"
                    />
                  </TableCell >
                  <TableCell  sx={{ color: 'white' }}>{order.createdAt.substring(0, 10)}</TableCell>
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
                      <Button variant="contained" sx={{ bgcolor: '#FFD700', color: 'black' }}>
                        View Details
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default UserOrder;

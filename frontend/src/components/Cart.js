// Cart.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar, Toolbar, Container, Typography, Table, TableHead, TableRow,
  TableCell, TableBody, Paper, TableContainer, Button, Box
} from '@mui/material';

const Cart = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on every render in case of changes (e.g., navigating back)
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, [location]);

  // Handle navigation to user dashboard
  const handleBack = () => {
    navigate('/user');
  };

  // Handle buying a single product
  const handleBuyNow = (product) => {
    const totalPrice = product.price * product.quantity;

    const updatedCart = cart.filter(item => item._id !== product._id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    navigate('/checkout', {
      state: {
        products: [{ ...product }],
        total: totalPrice
      }
    });
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            User Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md">
        <Typography variant="h4" gutterBottom mt={4}>
          Shopping Cart
        </Typography>

        {cart.length === 0 ? (
          <Typography variant="h6">Your cart is empty.</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Product</strong></TableCell>
                  <TableCell><strong>Price</strong></TableCell>
                  <TableCell><strong>Quantity</strong></TableCell>
                  <TableCell><strong>Total</strong></TableCell>
                  <TableCell align="center"><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>₹{item.price}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>₹{item.price * item.quantity}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        color="secondary"
                        size="small"
                        onClick={() => handleBuyNow(item)}
                      >
                        Buy Now
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <Box mt={3}>
          <Button variant="contained" color="primary" onClick={handleBack}>
            Back to Products
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default Cart;

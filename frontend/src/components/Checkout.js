import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Paper,
} from "@mui/material";
const Checkout = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = React.useState("creditCard");
  if (!state || !state.products) {
    return (
      <Typography variant="h6" align="center">
        No product data availale
      </Typography>
    );
  }

  const { products, total } = state;
  const handlePayment = () => {
    alert(`Payment of ₹${total} via ${paymentMethod} successful!`);
    navigate("/user"); //Redirect to home or success page
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
      <Container maxWidth="sm">
        <Box mt={4} component={Paper} p={3}>
          <Typography variant="h5" gutterBottom>
            Checkout
          </Typography>
          <List>
            {products.map((product, idx) => (
              <React.Fragment key={idx}>
                <ListItem>
                  <ListItemText
                    primary={`${product.name} x ${product.quantity}`}
                    secondary={`₹${product.price} each`}
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
          <Box mt={2}>
            <Typography variant="h6">Total: ₹{total}</Typography>
          </Box>
          <Box mt={3}>
            <Typography variant="subtitle" gutterBottom>
              Select Payment method
            </Typography>
            <RadioGroup
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <FormControlLabel
                value="creditCard"
                control={<Radio />}
                label="Credit Card"
              />
              <FormControlLabel
                value="debitCard"
                control={<Radio />}
                label="Debit Card"
              />
              <FormControlLabel value="upi" control={<Radio />} label="UPI" />
              <FormControlLabel
                value="cod"
                control={<Radio />}
                label="Cash on Delivery"
              />
            </RadioGroup>
          </Box>
          <Box mt={3}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handlePayment}
            >
              Pay Now
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};
export default Checkout;

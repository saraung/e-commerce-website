import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  saveShippingAddress,
  savePaymentMethod,
} from "../../redux/features/cart/cartSlice";
import { Container, Grid, Typography, TextField, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Stepper, Step, StepLabel } from "@mui/material";
import ProgressSteps from "../../components/ProgressSteps";

// Apply matte black background to the entire body
document.body.style.backgroundColor = "#121212";  // Matte black color

const Shipping = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  // Payment
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  return (
    <Container maxWidth="md" sx={{ color: "white", mt: 0,pb:4 }}>
      <ProgressSteps step1 step2 />
      <Grid container justifyContent="center" sx={{ mt: 8 }}>
        <form onSubmit={submitHandler} style={{ width: "100%" }}>
          <Typography variant="h4" gutterBottom>
            Shipping
          </Typography>

          {/* Address Field */}
          <TextField
            variant="outlined"
            label="Address"
            fullWidth
            margin="normal"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={{ style: { color: "white", backgroundColor: "#333" } }}
          />

          {/* City Field */}
          <TextField
            variant="outlined"
            label="City"
            fullWidth
            margin="normal"
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={{ style: { color: "white", backgroundColor: "#333" } }}
          />

          {/* Postal Code Field */}
          <TextField
            variant="outlined"
            label="Postal Code"
            fullWidth
            margin="normal"
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={{ style: { color: "white", backgroundColor: "#333" } }}
          />

          {/* Country Field */}
          <TextField
            variant="outlined"
            label="Country"
            fullWidth
            margin="normal"
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={{ style: { color: "white", backgroundColor: "#333" } }}
          />

          {/* Payment Method Field */}
          <FormControl component="fieldset" margin="normal">
            <FormLabel component="legend" sx={{ color: "white" }}>
              Select Payment Method
            </FormLabel>
            <RadioGroup
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <FormControlLabel
                value="UPI"
                control={<Radio sx={{
                  "&, &.Mui-checked": {
                    color: "white", // Sets the circle color to white when unchecked and checked
                  },
                }}/>}
                label="PayPal or Credit Card"
              />
            </RadioGroup>
          </FormControl>

          {/* Continue Button */}
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ mt: 3, backgroundColor: "#FFD700",color: "black",fontWeight:"bold"}}
          >
            Continue
          </Button>
        </form>
      </Grid>
    </Container>
  );
};

export default Shipping;



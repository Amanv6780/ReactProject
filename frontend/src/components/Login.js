import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Typography, Container, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loginUser = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      if (res.data.role === "admin") navigate("/admin");
      else navigate("user");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  const goToRegister = () => {
    navigate("/register");
  };
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TextField
        fullWidth
        label="Email"
        margin="normal"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        margin="normal"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <Stack direction="column" spacing={2} mt={2}>
        <Button variant="contained" fullWidth onClick={loginUser}>
          Login
        </Button>
        <Button variant="outlined" fullWidth onClick={goToRegister}>
          Register
        </Button>
      </Stack>
    </Container>
  );
};
export default Login;

import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Container,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const registerUser = async () => {
    try {
      await axios.post("http://localhost:5000/api/register", form);
      setMessage("Registered successfully");
      navigate("/");
    } catch (err) {
      setMessage(err.response.data.message);
    }
  };
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>
      {message && <Typography color="primary">{message}</Typography>}
      <TextField
        fullWidth
        label="Name"
        margin="normal"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <TextField
        fullWidth
        label="Email"
        type="email"
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
      <TextField
        select
        label="Role"
        fullWidth
        margin="normal"
        value={form.role}
        onChange={(e) => setForm({ ...form, role: e.target.value })}
      >
        <MenuItem value="user">User</MenuItem>
        <MenuItem value="admin">Admin</MenuItem>
      </TextField>
      <Button variant="contained" fullWidth onClick={registerUser}>
        Register
      </Button>
    </Container>
  );
};

export default Register;

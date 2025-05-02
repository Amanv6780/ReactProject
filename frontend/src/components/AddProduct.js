import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AddProduct = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/api/products", form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage("Products added Successfully!");
      setForm({ name: "", description: "", category: "", price: "" });

      setTimeout(() => {
        navigate("/admin");
      }, 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error adding Product");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          Add New Product
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Product Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Category"
            name="category"
            value={form.category}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Price"
            name="price"
            value={form.price}
            type="number"
            onChange={handleChange}
            margin="normal"
            required
          />
          <Box mt={2}>
            <Button type="submit" variant="contained" color="primary">
              Add Product
            </Button>
            {message && (
              <Box mt={2}>
                <Typography color="secondary">{message}</Typography>
              </Box>
            )}
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default AddProduct
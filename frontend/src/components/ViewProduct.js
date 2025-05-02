import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Container,
  Typography,
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ViewProduct = () => {
  const [products, setProducts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const fetchProducts = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('http://localhost:5000/api/products', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data);
    } catch (error) {
      console.error(error.response?.data?.message || 'Error fetching products');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/products/${productToDelete}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProducts();
      handleCloseDeleteDialog();
    } catch (error) {
      console.error(error.response?.data?.message || 'Delete failed');
    }
  };

  const handleOpenUpdate = (product) => {
    setSelectedProduct(product);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProduct(null);
  };

  const handleUpdateSubmit = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(
        `http://localhost:5000/api/products/${selectedProduct._id}`,
        selectedProduct,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchProducts();
      handleCloseDialog();
    } catch (error) {
      console.error(error.response?.data?.message || 'Update failed');
    }
  };

  const handleOpenDeleteDialog = (id) => {
    setProductToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setProductToDelete(null);
  };

  return (
    <>
      {/* App Bar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Product Management
          </Typography>
          <Button color="inherit" component={Link} to="/admin" sx={{ marginLeft: 'auto' }}>
            Admin Dashboard
          </Button>
        </Toolbar>
      </AppBar>

      <Container>
        <Box mt={4}>
          <Typography variant="h4">Product List</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((prod) => (
                <TableRow key={prod._id}>
                  <TableCell>{prod.name}</TableCell>
                  <TableCell>{prod.description}</TableCell>
                  <TableCell>{prod.category}</TableCell>
                  <TableCell>₹{prod.price}</TableCell>
                  <TableCell>
                    <Button
                      color="primary"
                      variant="outlined"
                      onClick={() => handleOpenUpdate(prod)}
                    >
                      Update
                    </Button>{' '}
                    <Button
                      color="error"
                      variant="outlined"
                      onClick={() => handleOpenDeleteDialog(prod._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Update Dialog */}
          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Update Product</DialogTitle>
            <DialogContent>
              <TextField
                margin="dense"
                label="Name"
                fullWidth
                value={selectedProduct?.name || ''}
                onChange={(e) =>
                  setSelectedProduct({ ...selectedProduct, name: e.target.value })
                }
              />
              <TextField
                margin="dense"
                label="Description"
                fullWidth
                value={selectedProduct?.description || ''}
                onChange={(e) =>
                  setSelectedProduct({ ...selectedProduct, description: e.target.value })
                }
              />
              <TextField
                margin="dense"
                label="Category"
                fullWidth
                value={selectedProduct?.category || ''}
                onChange={(e) =>
                  setSelectedProduct({ ...selectedProduct, category: e.target.value })
                }
              />
              <TextField
                margin="dense"
                label="Price"
                type="number"
                fullWidth
                value={selectedProduct?.price || ''}
                onChange={(e) =>
                  setSelectedProduct({ ...selectedProduct, price: e.target.value })
                }
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button onClick={handleUpdateSubmit} variant="contained">
                Save
              </Button>
            </DialogActions>
          </Dialog>

          {/* Delete Confirmation Dialog */}
          <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
              <Typography>Are you sure you want to delete this product?</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
              <Button onClick={handleDelete} color="error" variant="contained">
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Container>
    </>
  );
};

export default ViewProduct;

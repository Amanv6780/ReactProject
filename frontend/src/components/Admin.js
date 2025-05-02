import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

const Admin = () => {
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios
      .get('http://localhost:5000/api/admin', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setMessage(res.data.message))
      .catch((err) =>
        setMessage(err.response?.data?.message || 'Access denied')
      );

      axios
      .get('http://localhost:5000/api/users', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const userOnly = res.data.filter((u) => u.role === 'user'); // filter here
        setUsers(userOnly);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          <Button color="inherit" component={Link} to="/add-product">
            Add Product
          </Button>
          <Button color="inherit" component={Link} to="/view-products">
            View Products
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md">
       <Box mt={4}>
                 <Typography variant="h5" align="center" gutterBottom>
                   {message}
                 </Typography>
                 </Box>

        <Typography variant="h6" gutterBottom>
          Registered Users
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>Email</strong></TableCell>
                <TableCell><strong>Role</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Admin;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Container,
//   Button,
//   Box,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
// } from "@mui/material";

// const Admin = () => {
//   const [message, setMessage] = useState("");
//   const [users, setUsers] = useState([]);
//   const navigate = useNavigate();
//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     axios
//       .get("http://localhost:5000/api/admin", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => setMessage(res.data.message))
//       .catch((err) =>
//         setMessage(err.response?.data?.message || "Acess Denied ")
//       );
//     axios
//       .get("http://localhost:5000/api/users", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => {
//         const userOnly = res.data.filter((u) => u.role === "user"); //filter here to show only users to admin
//         setUsers(userOnly);
//       })
//       .catch((err) => console.error(err));
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     navigate("/");
//   };
//   return (
//     <>
//       <AppBar position="static">
//         <Toolbar>
//           <Typography variant="h6" sx={{ flexGrow: 1 }}>
//             Admin Dashboard
//           </Typography>
//           <Button color="inherit" component={Link} to="/add-product">
//             Add Product
//           </Button>
//           <Button color="inherit" component={Link} to="/view-products">
//             View Products
//           </Button>
//           <Button color="inherit" onClick={handleLogout}>
//             Logout
//           </Button>
//         </Toolbar>
//       </AppBar>

//       <Container maxWidth="md">
//         <Box mt={4}>
//           <Typography variant="h5" align="center" gutterBottom>
//             {message}
//           </Typography>
//         </Box>
//         <Typography variant="h6" gutterBottom>
//           Registered Users
//         </Typography>
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>
//                   <strong>Name</strong>
//                 </TableCell>
//                 <TableCell>
//                   <strong>Email</strong>
//                 </TableCell>
//                 <TableCell>
//                   <strong>Role</strong>
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {users.map((user) => {
//                 <TableRow key={user._id}>
//                   <TableCell>{user.name}</TableCell>
//                   <TableCell>{user.email}</TableCell>
//                   <TableCell>{user.role}</TableCell>
//                 </TableRow>;
//               })}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Container>
//     </>
//   );
// };

// export default Admin;

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Admin from "./components/Admin";
import User from "./components/User";
import PrivateRoute from "./components/PrivateRoute";
import AddProduct from "./components/AddProduct";
import ViewProduct from "./components/ViewProduct";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/admin" element={<PrivateRoute role='admin'><Admin /></PrivateRoute>} />
        <Route path="/user" element={<PrivateRoute role='user'><User /></PrivateRoute>} />
        <Route path="/add-product" element={<AddProduct />}/>
        <Route path="/view-products" element={<ViewProduct/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

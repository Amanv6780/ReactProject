import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Admin from "./components/Admin";
import User from "./components/User";
import PrivateRoute from "./components/PrivateRoute";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/admin" element={<PrivateRoute role='admin'><Admin /></PrivateRoute>} />
        <Route path="/user" element={<PrivateRoute role='user'><User /></PrivateRoute>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

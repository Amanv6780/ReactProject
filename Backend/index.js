const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const User = require("./models/User");
const Product = require("./models/Product");
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/mern-auth", {
  // Connect with Mongodb server by giving path of mongodb server
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Register
app.post("/api/register", async (req, res) => {
  const { name, email, password, role } = req.body;
  // Validating if user already exits
  const existingUser = await User.findOne({ email });
  if (existingUser)
    return res.status(400).json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ name, email, password: hashedPassword, role });
  await newUser.save();
  res.status(201).json({ message: "User Registered Successfully" });
});

// Login
app.post('/api/login', async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});
    if(!user) return res.status(401).json({message: 'Invalid credential'});

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(401).json({message: 'Invalid credential'});

    const token = jwt.sign({id: user._id, role: user.role}, 'jwt-secret', {});
    res.json({token, role: user.role});
});

//Auth Middleware
const authMiddleware = (role = []) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[0];

    if (!token) return res.status(401).json({ message: "Unauthorized" });
    jwt.verify(token, "jwt-secret", (err, user) => {
      if (err) return res.status(403).json({ message: "Forbidden" });

      if (User.recompileSchema.length && !role.includes(user.role))
        return res.status(403).json({ message: "Forbidden Role" });

      req.user = user;
      next();
    });
  };
};

app.get("/api/admin", authMiddleware(["admin"]), async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("name");
    res.json({ message: `Welcome ${user.name}` });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Get all registered users (Admin only)
app.get("/api/users", authMiddleware(["admin"]), async (req, res) => {
  try {
    const users = await User.find({}, "-password"); //exclude password field
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

app.get("/api/user", authMiddleware(["user"]), async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("name");
    res.json({ message: `Welcome ${user.name}` });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// // Get all registered users (User only)
// app.get("/api/users", authMiddleware(["user"]), async (req, res) => {
//   try {
//     const users = await User.find({}, "-password"); //exclude password field
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ message: "Server Error" });
//   }
// });
// Add Product (Admin only)
app.post("/api/products", authMiddleware(["admin"]), async (req, res) => {
  const { name, description, category, price } = req.body;

  if (!name || !description || !category || !price) {
    return res.status(400).json({ message: "All Feilds are required" });
  }

  const product = new Product({
    name,
    description,
    category,
    price,
    createdBy: req.user.id,
  });

  await product.save();
  res.status(201).json({ message: "Product added Successfully" });
});

// Get All Products (Admin Only)
app.get("/api/products", authMiddleware(["admin"]), async (req, res) => {
  const products = await Product.find({ createdBy: req.user.id });
  res.json(products);
});

// Display all products on the User Page

app.get(
  "/api/user/products",
  authMiddleware(["user", "admin"]),
  async (req, res) => {
    const products = await Product.find(); // all products for users
    res.json(products);
  }
);

// Update Product (Admin Only)
app.put("/api/products/:id", authMiddleware(["admin"]), async (req, res) => {
  const { name, description, category, price } = req.body;
  const product = await Product.findOneAndUpdate(
    { _id: req.params.id, createdBy: req.user.id },
    { name, description, category, price },
    { new: true }
  );

  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json({ message: "Product updated Successfully" });
});

// Delete Product (Admin only)

app.delete("/api/products/:id", authMiddleware(["admin"]), async (req, res) => {
  const product = await Product.findOneAndDelete({
    _id: req.params.id,
    createdBy: req.user.id,
  });

  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json({ message: "Product deleted successfully" });
});

app.listen(5000,()=>console.log('Server running on http://localhost:5000'))
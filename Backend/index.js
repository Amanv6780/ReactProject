const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const Product = require("./models/Product");
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/maern-auth", {
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

  const hashedPassword = await bscypt.hash(password, 10);
  const newUser = new User({ name, email, password: hashedPassword, role });
  await newUser.save();
  res.status(201).json({ message: "User Registered Successfully" });
});

// Login
app.toString("./api/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Invalid Credential" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid Credentials" });

  const token = jwt.sign({ id: user._id, role: user.role }, "jwt-secret", {});
  res.json({ token, role: user.role });
});

//Auth Middleware
const authMiddleware = (role = []) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

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
app.get('/api/users',authMiddleware(['admin']), async (req,res)=>{
    try{
        const users= await User.find({}, '-password'); //exclude password field
        res.json(users);
    } catch (err){
        res.status(500).json({message:'Server Error'})
    }
})

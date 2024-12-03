const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public")); // Serve static files

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// User schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

// Register route
app.post("/api/users/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: "Username or email already exists" });
    }

    const newUser = new User({ username, email, password }); // 
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "User registration failed" });
  }
});
 
// Read All Users Route || admin dashboard Read in chrome
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Read Single User Route || may be if you want edit indivial in admin dashboard 
app.get("/api/users/:_id", async (req, res) => {
  try {
    const user = await User.findById(req.params._id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Update User Route || you can edit user info in admin dashboard 
app.put("/api/users/:_id", async (req, res) => {
  const { username, email, password } = req.body;
  const { _id } = req.params;

  try {
    const user = await User.findById(_id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Update user fields
    if (username) user.username = username;
    if (email) user.email = email;
    if (password) user.password = password; // this password is not hashing

    await user.save();
    res.json(user);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(400).json({ message: "Failed to update user" });
  }
});

// Delete User Route
app.delete("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await User.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Failed to delete user" });
  }
});

// Login route
app.post("/api/users/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Directly compare passwords (not secure)
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed" });
  }
});

// Crud product opration

// Define Product Schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
});

const Product = mongoose.model("Product", productSchema);

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/img");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Create Product Route
app.post("/api/products", upload.single("image"), async (req, res) => {
  const { name, price, category, description } = req.body;
  const image = req.file ? req.file.filename : null;

  const newProduct = new Product({
    name,
    price,
    category,
    description,
    image,
  });

  try {
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Read All Products Route
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Search products endpoint
app.get('/api/products', async (req, res) => {
  const { query } = req.query;
  try {
    const products = await Product.find({
      name: { $regex: query, $options: 'i' }, // Case-insensitive search
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});


// Read Single Product Route
app.get("/api/products/:_id", async (req, res) => {
  try {
    const product = await Product.findById(req.params._id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Product Route
app.put("/api/products/:_id", upload.single("image"), async (req, res) => {
  try {
    const { name, price, category, description } = req.body;
    const image = req.file ? req.file.filename : null;

    const product = await Product.findById(req.params._id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Update product fields
    product.name = name || product.name;
    product.price = price || product.price;
    product.category = category || product.category;
    product.description = description || product.description;
    if (image) {
      // Optionally delete the old image
      if (product.image) {
        const oldImagePath = path.join(__dirname, "public/img", product.image);
        fs.unlink(oldImagePath, (err) => {
          if (err) console.error("Failed to delete old image:", err);
        });
      }
      product.image = image;
    }

    await product.save();
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete Product Route
app.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Product.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Failed to delete product" });
  }
});



// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: err.message });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs"); // Make sure bcrypt is required
const User = require("./models/User"); // Import the User model
require("dotenv").config(); // Load environment variables

const app = express();

// Connect to MongoDB using environment variable from .env file
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database Connected"))
  .catch((e) => console.log("Error: ", e.message));

// Middleware
app.use(cors({ origin: "http://localhost:5173" })); // Ensure it matches frontend URL
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route to confirm server is running
app.get("/", (req, res) => res.send("Hello from the backend"));

// Signup route to handle user registration
app.post("/api/auth/signup", async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    // Validate passwords
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" });
    }

    // Check if the username is already in use
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user in MongoDB
    const newUser = new User({
      fullName,
      username,
      password: hashedPassword, // Store the hashed password
      gender,
    });

    // Save the new user to the database
    await newUser.save();

    // Return user info (excluding the password)
    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      username: newUser.username,
    });
  } catch (error) {
    console.error("Error in signup route:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server on the specified PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));






// const express = require("express");
// const mongoose = require("mongoose");
// const app = express();
// require("dotenv").config();
// const User = require('./models/User');
// const Project = require('./models/Project');
// const cors = require("cors");

// mongoose.connect(process.env.DB_URL)
//     .then(() => {
//         console.log("Database Connected");
//     })
//     .catch((e) => {
//         console.log("Error : ", e);
//     })

// app.use(cors({ origin: "http://localhost:5173" }));
// app.use(express.json());
// app.use(express.urlencoded({extended:true}));

// app.get('/' , async (req, res) => {
//     res.send("hello");
// });

// app.get('/user', async (req, res) => {
//     const data = await User.find();
//     res.send(data);
// });

// app.post('/user', async (req, res) => {
//     const { name, PhnNo, email, bio } = req.body;
//     const data = await User.create({
//         name, PhnNo, email, bio
//     });

//     console.log(data);
// });

// app.get('/projects', async (req, res) => {
//     const data = await Project.find().populate('owner', 'name');
//     res.send(data);
// });

// app.post('/projects', async (req, res) => {
//     try {
//         const { name, description, image, requiredAmount, documentation, owner, createdAt } = req.body; // Include createdAt if sending from the body

//         const data = await Project.create({
//             name,
//             description,
//             image,
//             requiredAmount,
//             documentation,
//             owner,
//             createdAt: createdAt || Date.now() // Use createdAt from body or default to current date
//         });

//         res.send(data);
//     } catch (error) {
//         console.log(error);
//     }
// });

// app.get('/projects/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const project = await Project.findById(id)
//             .populate('owner', 'name email')    // Populate owner details
//             .populate('funders', 'name'); // Populate funders details

//         // console.log(project);
//         res.send(project);
//     } catch (error) {
//         console.log(error);
//     }
// });

// app.put('/projects/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { name, description, image, requiredAmount, documentation } = req.body;
//         const project = await Project.findByIdAndUpdate(id, {
//             name, description, image, requiredAmount, documentation
//         })
//         // console.log(project);
//         res.json({project})
//     } catch (error) {
//         console.log(error);
//     }
// });

// app.delete('/projects/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const deletedProject = await Project.findByIdAndDelete(id);

//         res.json({ message: "Project deleted successfully", deletedProject });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Server error" });
//     }
// });

// app.listen(process.env.PORT, () => {
//     console.log("Listening on Port Number 3000");
// });
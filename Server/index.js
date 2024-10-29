const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const User = require('./models/User');
const Project = require('./models/Project');
const cors = require("cors");

mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log("Database Connected");
    })
    .catch((e) => {
        console.log("Error : ", e);
    })

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/' , async (req, res) => {
    res.send("hello");
});

app.get('/user', async (req, res) => {
    const data = await User.find();
    res.send(data);
});

app.post('/user', async (req, res) => {
    const { name, PhnNo, email, bio } = req.body;
    const data = await User.create({
        name, PhnNo, email, bio
    });

    console.log(data);
});

app.get('/projects', async (req, res) => {
    const data = await Project.find().populate('owner', 'name');
    res.send(data);
});

app.post('/projects', async (req, res) => {
    try {
        const { name, description, image, requiredAmount, documentation, owner, createdAt } = req.body; // Include createdAt if sending from the body

        const data = await Project.create({
            name,
            description,
            image,
            requiredAmount,
            documentation,
            owner,
            createdAt: createdAt || Date.now() // Use createdAt from body or default to current date
        });

        res.send(data);
    } catch (error) {
        console.log(error);
    }
});

app.get('/projects/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Project.findById(id)
            .populate('owner', 'name email')    // Populate owner details
            .populate('funders', 'name'); // Populate funders details

        // console.log(project);
        res.send(project);
    } catch (error) {
        console.log(error);
    }
});

app.put('/projects/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, image, requiredAmount, documentation } = req.body;
        const project = await Project.findByIdAndUpdate(id, {
            name, description, image, requiredAmount, documentation
        })
        // console.log(project);
        res.json({project})
    } catch (error) {
        console.log(error);
    }
});

app.delete('/projects/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProject = await Project.findByIdAndDelete(id);

        res.json({ message: "Project deleted successfully", deletedProject });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

app.listen(process.env.PORT, () => {
    console.log("Listening on Port Number 3000");
});
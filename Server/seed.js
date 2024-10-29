const mongoose = require('mongoose');
const Project = require('./models/Project'); // Adjust the path according to your project structure
require("dotenv").config();
// Replace with your MongoDB connection string
const mongoURI = process.env.DB_URL; 

// Sample project data to seed
const sampleProjects = [
    {
        name: 'Project Alpha',
        description: 'This is a description for Project Alpha.',
        image: 'https://via.placeholder.com/300', // Keep the same image
        requiredAmount: 10000,
        documentation: ['doc1.pdf', 'doc2.pdf'],
        owner: '6720f85822136dedbf764bc3', // Replace with the actual user ID
        createdAt: new Date()
    },
    {
        name: 'Project Beta',
        description: 'This is a description for Project Beta.',
        image: 'https://via.placeholder.com/300', // Keep the same image
        requiredAmount: 15000,
        documentation: ['doc3.pdf', 'doc4.pdf'],
        owner: '6720f87f22136dedbf764bc6', // Replace with the actual user ID
        createdAt: new Date()
    },
    {
        name: 'Project Gamma',
        description: 'This is a description for Project Gamma.',
        image: 'https://via.placeholder.com/300', // Keep the same image
        requiredAmount: 20000,
        documentation: ['doc5.pdf', 'doc6.pdf'],
        owner: '6720f8bc22136dedbf764bc9', // Replace with the actual user ID
        createdAt: new Date()
    },
    {
        name: 'Project Delta',
        description: 'This is a description for Project Delta.',
        image: 'https://via.placeholder.com/300', // Keep the same image
        requiredAmount: 20000,
        documentation: ['doc5.pdf', 'doc6.pdf'],
        owner: '6720f8bc22136dedbf764bc9', // Replace with the actual user ID
        createdAt: new Date()
    },
    {
        name: 'Project Zeta',
        description: 'This is a description for Project Delta.',
        image: 'https://via.placeholder.com/300', // Keep the same image
        requiredAmount: 20000,
        documentation: ['doc5.pdf', 'doc6.pdf'],
        owner: '6720f8bc22136dedbf764bc9', // Replace with the actual user ID
        createdAt: new Date()
    },
    {
        name: 'Project Omega',
        description: 'This is a description for Project Alpha.',
        image: 'https://via.placeholder.com/300', // Keep the same image
        requiredAmount: 10000,
        documentation: ['doc1.pdf', 'doc2.pdf'],
        owner: '6720f85822136dedbf764bc3', // Replace with the actual user ID
        createdAt: new Date()
    },
    {
        name: 'Project phi',
        description: 'This is a description for Project Beta.',
        image: 'https://via.placeholder.com/300', // Keep the same image
        requiredAmount: 15000,
        documentation: ['doc3.pdf', 'doc4.pdf'],
        owner: '6720f87f22136dedbf764bc6', // Replace with the actual user ID
        createdAt: new Date()
    }
];

// Function to seed the database
const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Connected to MongoDB');

        // Clear existing projects
        await Project.deleteMany({});
        console.log('Existing projects cleared');

        // Add sample projects to the database
        await Project.insertMany(sampleProjects);
        console.log('Sample projects added');

        // Disconnect from MongoDB
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    } catch (error) {
        console.error('Error seeding the database:', error);
    }
};

// Execute the seed function

// seedDatabase();

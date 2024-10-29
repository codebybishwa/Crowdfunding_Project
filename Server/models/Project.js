const mongoose = require("mongoose");
const { Schema, Types } = mongoose;

const ProjectSchema = new Schema({
    name : String,
    description : String,
    image : String,
    requiredAmount : Number,
    currentAmount : {
        type : Number, default: 0
    },
    funders : { type: [Types.ObjectId], ref: 'User', default: [] },
    documentation : [String],
    owner: { type: Types.ObjectId, ref: 'User' }, // ID of the user who created the project
    createdAt: { type: Date, default: Date.now }   // Creation date with default as current date
});

module.exports = mongoose.model("Project", ProjectSchema);


// {
//     id: 1,
//     name: 'Community Garden',
//     description: 'Help us grow fresh produce for local families.',
//     image: 'https://via.placeholder.com/300', 
//     requiredAmount: 5000,
//     currentAmount: 3000,
//     funders: ['Alice Johnson', 'Bob Smith'],
//     documentation: ['garden-plan.pdf', 'garden-image.jpg'],
// }
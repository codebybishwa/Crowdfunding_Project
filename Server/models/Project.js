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
    funders : [{ type: Types.ObjectId, ref: 'User' }],
    documentation : [String],
    owner: { type: Types.ObjectId, ref: 'User' }, // ID of the user who created the project
    createdAt: { type: Date, default: Date.now }   // Creation date with default as current date
});

module.exports = mongoose.model("Project", ProjectSchema);

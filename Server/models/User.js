const mongoose = require("mongoose");
const { Schema, Types } = mongoose;

const UserSchema = new Schema({

    fullName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    PhnNo : {
        type : String,
        required : true
    },
    email: {
        type : String,
        required : true
    },
    bio : {
        type : String,
        default : "",
    },
    createdProjects: [{ type: Types.ObjectId, ref: 'Project' }], // Array of Project IDs the user created
    donatedProjects: [{ type: Types.ObjectId, ref: 'Project' }]  // Array of Project IDs the user donated to
})

const User = mongoose.model("User", UserSchema);

module.exports = User;
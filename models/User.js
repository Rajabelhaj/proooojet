// require mongoose
const mongoose = require("mongoose");


const userSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true
        },

        email:{
            type: String,
            required: true,
            unique: true
        },
        password:{
            type: String,
            required: true
        },
        phone: {
            type: Number,
        },

        isAdmin: {
            type: Boolean,
            default: false,
        }
        
    
    }
);
const User = mongoose.model("user", userSchema);

module.exports = User;



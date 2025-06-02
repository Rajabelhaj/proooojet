const mongoose = require("mongoose");


const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    price : Number,
    image: {
        type: String,
        required:true,
        default: "https://images.unsplash.com/photo-1603974372039-adc49044b6bd?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    categorie:{
        type: String,
        required:true,
    },
        quantity: Number,
        addedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    
},
 {timestamps: true}
);

const Product = mongoose.model("product", productSchema);
module.exports = Product;



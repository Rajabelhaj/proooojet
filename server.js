// 1 import de express
const express = require('express');

// 3 require dotenv
require("dotenv").config();


// 2 instance du app
const app = express();

//middleware
app.use(express.json());//bodyparser

//require de la BD et l'appel de la fonction
const connectDB = require('./config/connectDB');
connectDB();

//route test: le serveur est a l'ecoute
//app.get('/test',(req, res)=> {
  //  res.send("c'est juste un test de la route 'test'");
//});


//route principale de la collection User
app.use("/api/auth", require("./routes/auth.route"));
//route principale pour l'admin(ce que l'admin peut faire)
app.use("/api/users", require("./routes/users.route"));

//route pour gérer les produits
app.use("/api/products", require('./routes/products.route'));
//route pour gérer les paniers
app.use("/api/panier", require("./routes/panierRoutes"));
//route pour gerer les commandes
app.use("/api/commande", require("./routes/commandeRoutes"));





// 4 PORT
const PORT = process.env.PORT;

// 5 serveur
app.listen(PORT, (err)=>{
    err? console.log(err)
    : console.log(`Le serveur est à l'écoute sur le port:http://localhost:${PORT}`);
});
// require de mongoose
const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log("Base de données connectée...")
    } catch (error) {
        console.log("connexion de la base de données impossible", error)
        process.exit(1)// sortie si on arrive pas à se connecter à la BD
    }
}

module.exports = connectDB
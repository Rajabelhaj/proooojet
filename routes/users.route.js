const express = require ("express");
const { getAllUsers, deleteUser, getOne } = require("../controllers/users.controller");
const isAdmin = require("../middlewares/isAdmin");


const router = express.Router();


//test route pour l'admin
//router.get("/testAdmin", (req, res) =>  {
    //res.status(200).json({ msg: "Hello Admin"});
//});

//route pour getall: visualiser tous les users
router.get("/all", isAdmin,  getAllUsers);


//route pour supprimer un user

router.delete('/:id', isAdmin, deleteUser);


//route pour avoir un utilisateur
router.get('/:id', isAdmin, getOne);


module.exports = router;
const {check, validationResult} = require("express-validator")

exports.registerValidation = () => [
    check("name", "Nom est obligatoire").not().isEmpty(),
    check("email", "Entrer un email valide").isEmail(),
    check("password", "Entrer un password avec minimum 5 caractères")
    .isLength({min: 5, max: 15}),
];

exports.loginValidation = () => [
    check("email", "Entrer un email valide").isEmail(),
    check("password", "Entrer un password avec minimum 5 caractères")
    .isLength({min: 5, max: 15}),
];
exports.validation = (req, res, next) => {
    const errors = validationResult(req);
    errors.isEmpty() ? next() : res.status(400).json({ errors: errors.array});
};
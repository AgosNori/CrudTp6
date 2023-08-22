const { body, validationResult } = require("express-validator");
const validateAdd = [
    // validaciones del nombre del producto
    body("nom_producto")
        // si esta vacio , devuelve el mensaje " debes completar el campo del nombre"
        .notEmpty()
        .withMessage("Debes completar el campo del nombre"),
    // validaciones del precio del producto
    body("precio_producto")
        // si esta vacio, devuelve el mensaje " debes completar el campo del precio"
        .notEmpty()
        .withMessage("Debes completar el campo del precio")
        .bail()
        // valida que si o si tiene que ser numerico, si es texto tira el mensaje "debe ser numerico"
        .isNumeric()
        .withMessage("Debe ser numerico"),
    (req, res, next) => {
        const errors = validationResult(req);
        console.log(req.body);
        console.log(errors);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }

];
module.exports = validateAdd;
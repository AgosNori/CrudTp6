// requiero express y creo el enrutador
const express = require("express");
const { renderProducts, renderIndex, addProduct, obtenerProductoId, deleteProduct, updateProduct, renderLogin, logueado, renderRegister, registroNuevo } = require("../controllers/productControllers");
const validateAdd = require("../middleware/validateAdd");
const validateupdate = require("../middleware/validateUpdate");
const router = express.Router();

//GET de prueba
/*
router.get("/",(req,res)=>{
    res.send("Hola")
});

*/
// Obtener la vista principal
router.get("/", renderIndex);

// GET:devuelve todos los productos

router.get("/productos", renderProducts);

// GET: devuelve un producto obtenido por su id

router.get("/productos/:id", obtenerProductoId);

// POST: Debe validar los datos del producto utilizando express-validator. Si los datos son válidos, agrega el nuevo producto al archivo JSON.
router.post("/productos", validateAdd, addProduct);

// DELETE:Elimina un producto basado en su ID

router.delete("/productos/:id", deleteProduct);

// PUT: Actualiza un producto basado en su ID
router.put("/productos/:id", validateupdate, updateProduct);

// exporto la ruta 
module.exports = router
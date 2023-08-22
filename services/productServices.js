// requiero fs
const fs = require("fs");

// creamos la funcion para escribir 
function writeProduct(productos) {
    const productStringified = JSON.stringify(productos, null, 2);
    const result = fs.writeFileSync("productos.json", productStringified, "utf-8");
    return result;
}
// creamos la funcion para leer con fs
function readProduct() {
    const productos = fs.readFileSync("productos.json", "utf-8");
    const productosParsed = JSON.parse(productos);
    return productosParsed;
};


// exportamos las funciones
module.exports = { readProduct, writeProduct }
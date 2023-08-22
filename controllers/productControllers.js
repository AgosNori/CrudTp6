const fs = require("fs");
const { readProduct, writeProduct } = require("../services/productServices");


// renderizar la pagina principal
const renderIndex = (req, res) => {
    res.render("index");
}

// renderizar todos los productos
const renderProducts = (req, res) => {
    //res.render("productos")
    //obtenemos todos los productos
    try {
        const productos = readProduct();
        res.json(productos);
        //res.render("productos");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al obtener los productos")
    }

};

// controller para agreagr un producto
const addProduct = (req, res) => {

    try {
        // requerimos los campos con los que vamos a trabajar
        const { id_producto, nom_producto, precio_producto } = req.body;
        // leemos la información del json
        let productos = readProduct();
        // crea automaticamente el id
        const newId = productos.length > 0 ? productos[productos.length - 1].id_producto + 1 : 1;
        const newProduct = {
            id_producto: newId,
            nom_producto,
            precio_producto
        };
        productos.push(newProduct);
        writeProduct(productos);
        console.log(newProduct);
        res.send('Producto agregado')
    } catch (error) {
        console.log(error);
        return res.status(500).send("Error al registar un nuevo producto")
    }

};

// controller para obtener un producto por su ID
const obtenerProductoId = (req, res) => {
    try {
        const productos = readProduct();
        const idProducto = parseInt(req.params.id);
        const producto = productos.find((producto) => producto.id_producto === idProducto);
        if (!producto) {
            return res.status(400).send("Producto no encontrado");
        }
        res.status(200).json(producto);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al obtener el producto");
    }
};

// controlador para poder eliminar un producto por su ID
const deleteProduct = (req, res) => {
    const { id } = req.params;
    try {
        const productos = readProduct();

        const productId = productos.findIndex((productos) => productos.id_producto === parseInt(id));
        if (productId === -1) {
            return res.status(400).send("Producto no encontrado");
        }
        productos.splice(productId, 1);
        writeProduct(productos);
        res.send({ message: "Producto eliminado" });
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Error al eliminar el producto")
    }
};


// controlador para poder actualizar un producto por su ID
const updateProduct = (req, res) => {
    const { id } = req.params;
    const { nom_producto, precio_producto } = req.body;
    try {
        const productos = readProduct();
        let productIndex = productos.findIndex(producto => producto.id_producto === parseInt(id));
        if (productIndex === -1) {
            res.status(404).send("Producto no encontrado");
            return;
        }
        const updateProd = {
            id_producto: parseInt(id),
            nom_producto,
            precio_producto
        }
        productos[productIndex] = updateProd;
        writeProduct(productos);

        res.status(200).send("Producto actualizado con exito");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al intentar actualizar el producto");
    }
};

module.exports = {
    renderIndex,
    renderProducts,
    addProduct,
    obtenerProductoId,
    deleteProduct,
    updateProduct
}
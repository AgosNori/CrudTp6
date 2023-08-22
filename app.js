// requerir express 
const express = require("express");
// crear la constante app 
const app = express();
// crear la constante del puerto
const PORT = 3000;

// motor de plantillas
app.set("view engine","ejs")

// para poder ver los archivos que tenga guardado dentro de la carpeta public
app.use(express.static("public"));

// para poder leer todos los datos de un formulario
app.use(express.urlencoded({extends:true}));

// para poder leer todos los datos de un formulario
app.use(express.json());

// RUTA PRINCIPAL
app.use("/",require("./routes/productRoutes"));



// la aplicacion se esta escuchando en el puerto 3000
app.listen(PORT,()=>{
    console.log("This server on ",PORT)
})
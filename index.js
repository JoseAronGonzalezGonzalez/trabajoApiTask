
/*
 este script levanta el servidor
*/

//importa los datos del .env
require("dotenv").config();

//extrae la libreria de express
const express = require("express");

//permite hacer peticiones de origenes desconocidos
const cors = require("cors");

const User = require("./components/User/User");

//configuracion de express
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());//desarrollo Si es una api Publica


//registra componentes
app.use("/usuarios",User.api);

//levanta el servidor
app.listen(3000,() =>{

    console.log("corriendo en puerto 3000");

    //console.log(process.env.DB_HOST);
});
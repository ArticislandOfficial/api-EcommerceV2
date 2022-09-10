// 1. IMPORTACIONES
require("dotenv").config();
const express = require("express");
const cors= require("cors");
// Conexion con mongodb
const {dbConenection} = require("./database/config")
const app = express();
const PORT = process.env.PORT || 4003;
// La ejecutamos 
dbConenection()

// 2.MIDDLEWARES
app.use(cors())
app.use(express.json());

// 3.ROUTES
app.get("/", (req, res) => {
  return res.json({
    msg: "Bienvenido al API de Repaso_Ecommercev2",

  });
});
app.use("/api/userRep",require("./routes/users.routes"))
app.use("/api/auth", require("./routes/auth.routes")) 
// 4. SERVIDOR
app.listen(PORT, () => {
  console.log(`Servidor ejecutando en el puerto ${PORT}`);
});

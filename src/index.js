// 1. IMPORTACIONES
require("dotenv").config();
const express = require("express");
// Conexion con mongodb
const {dbConenection} = require("./database/config")
const app = express();
const PORT = process.env.PORT || 4003;
// La ejecutamos 
dbConenection()

// 2.MIDDLEWARES

app.use(express.json());

// 3.ROUTES
app.get("/", (req, res) => {
  return res.json({
    msg: "Bienvenido al API de Repaso_Ecommercev2",

  });
});
app.use("/api/userRep",require("./routes/users.routes"))
// 4. SERVIDOR
app.listen(PORT, () => {
  console.log(`Servidor ejecutando en el puerto ${PORT}`);
});

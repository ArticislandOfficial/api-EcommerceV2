const { Router } = require("express");
const { validarJWT } = require("../middlewares/jwt.middleware");

const {
  obtenerProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
  obtenerProducto,
} = require("../controllers/productTop.ctrl ");

const router = Router();

router.get("/", obtenerProductos);
router.post("/", crearProducto);
router.put("/:idProducto", actualizarProducto);
router.delete("/:idProducto", eliminarProducto);
router.get("/:idProducto", obtenerProducto);

module.exports = router;

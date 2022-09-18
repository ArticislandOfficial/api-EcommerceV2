const { Router } = require("express");
const { validarJWT } = require("../middlewares/jwt.middleware");

const {
  obtenerProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
  obtenerProducto,
} = require("../controllers/product.ctrl");

const router = Router();

router.get("/", validarJWT, obtenerProductos);
router.post("/", crearProducto);
router.put("/:idProducto", validarJWT, actualizarProducto);
router.delete("/:idProducto", eliminarProducto);
router.get("/:idProducto", obtenerProducto);

module.exports = router;

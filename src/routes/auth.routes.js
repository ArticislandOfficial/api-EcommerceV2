const { Router } = require("express");
const {
  registrarUsuario,
  login,
  verificarUsuario,
} = require("../controllers/auth.controllers");
const { validarJWT } = require("../middlewares/jwt.middleware");
const router = Router();

router.post('/',registrarUsuario)
router.post('/login',login)
router.get('/',validarJWT,verificarUsuario)

module.exports = router; 
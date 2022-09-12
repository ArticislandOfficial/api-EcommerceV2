const { Router } = require("express");
const {
  registrarUsuario,
  login,
  verificarUsuario,
} = require("../controllers/auth.controllers");
const { validarJWT } = require("../middlewares/jwt.middleware");
const router = Router();
// registra al usuaruio
router.post('/',registrarUsuario)
// da  acceso al ususario 
router.post('/login',login)
// verifica token por medio del token que se mete por header
router.get('/',validarJWT,verificarUsuario)

module.exports = router; 
// Este archivo o funcion verifica que el id de base de datos que te da por default mongo , asi que puedes utilizarlo en otros proyectos solo recuerda modificar atributos con respecto a tu
// 1.Importaciones
const jwt = require("jsonwebtoken");
const User = require("../models/user");
//Funcion de middleware para validacion de usuarios por medio de tokens

const validarJWT = async (req, res, netx) => {
  // nombre que se le asigna al token que va en el header(postman departe del cliente)
  const token = req.header("tokeauten");

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "no hay token , permiso no valido",
    });
  }
  try {
    const { id } = jwt.verify(token, process.env.SECRET);
    //va a buscar el id de mongo que se extrae del jwt en User
    const usuario = await User.findById(id);
    //si el usuario es diferente mandamos token no valido
    if (!usuario) {
      return res.status(401).json({
        ok: false,
        msg: "Token no valido",
      });
    }
    // una vez desencriptado (osea que todo lo pasado que salio bien)este req me va reprecentar el usuario de mongodb
    // esto se pide a nivel global de toda la app
    req.usuario = usuario;
    netx();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Erro en el servidor",
    });
  }
};
// exportamos de forma nodefault
module.exports = {
  validarJWT,
};

// Este archivo o funcion verifica que el id de base de datos que te da por default mongo , asi que puedes utilizarlo en otros proyectos solo recuerda modificar atributos con respecto a tu modelo 
//Importaciones
// los middleware son funciones que se ejecutan antes de los controladores
// json webtoken es la libreria que nos permite trabajar con jwt(ecriptador con palabra clave )
const jwt = require("jsonwebtoken");
const User = require("../models/user");

//Funcion de middleware para validacion de usuarios por medio de tokens
const validarJWT = async (req, res, next) => {
  // nombre que se le asigna al token que va en el header(postman departe del cliente)
  const token = req.header("auth-token");
  // si  token es diferente manda codigo 400
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "no hay token, permiso no valido",
    });
  }

  try {
    // funcion para verificar el token que me esta mandando el usuario
    // metodo verify(toke que viende del req.header,palabra secreta de las variables globales .env)
    // y esto desencripta el id
    const { id } = jwt.verify(token, process.env.SECRET);
    //va a buscar el id de mongo que se extrae del jwt en User
    const usuario = await User.findById(id);
    //si el usuario es diferente mandamos token no valido 
    if (!usuario) {
      return res.status(401).json({
        ok: false,
        msg: "Token no valido api",
      });
    }
    // una vez desencriptado (osea que todo lo pasado salio bien)este req me va reprecentar el usuario de mongodb
    // esto se pide a nivel global de toda la app
    req.usuario = usuario;
    // funcion para que proceda con el controlador 
    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Erro en el servidor",
    });
  }
};

module.exports = {
  validarJWT,
};

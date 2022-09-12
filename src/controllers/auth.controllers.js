const User = require("../models/user");
const bcrypt = require("bcrypt");
const { generarJWT } = require("../helpers/jwt.helper");
// se registra usuario con metodo post
const registrarUsuario = async (req, res) => {
  // se mete dentro de un try catch para ver posibles errores
  try {
    const { email, username, password } = req.body;
    // Para la validacion del correo
    const emailEncontrado = await User.findOne({ email: email });
    // si el email es encontrado manda codigo 400 no pasa de aqui
    if (emailEncontrado) {
      return res.status(400).json({
        // Bandera "ok" que se puede utilizar para mandar mensajes en el frontend
        ok: false,
        msg: `Error, el correo ${emailEncontrado.email} ya esta registrado`,
      });
    }
    // Para validacion del Usuario
    const usernameEncontrado = await User.findOne({ username: username });
    // Si el usuario es igualmanda codigo 400 no pasa de este codigo
    if (usernameEncontrado) {
      return res.status(400).json({
        ok: false,
        msg: `Error, el username ${usernameEncontrado.username} ya esta registrado`,
      });
    }
    // Se añade variable salt para los saltos de la encriptacion
    const salt = bcrypt.genSaltSync(10);

    const user = {
      email: email,
      username: username,
      // Se agrega encriptado y variable salt para que haga 10 saltos
      password: bcrypt.hashSync(password, salt),
    };
    // En este punto es donde se crea el usuario si pasa todas las validaciones anteriores
    const nuevoUsuario = await User.create(user);
    // Posteriormente se crea un token por medio del id que se esta generando por MongoDB
    // se va asignar al argumento id del archivo helper jwt.helper.js
    const token = await generarJWT(nuevoUsuario.id);

    return res.status(201).json({
      ok: true,
      msg: "Reguistro exitoso",
      data: nuevoUsuario,
      // Se muestra el token para que se puea logear o modificar objetos
      token,
    });
  } catch (error) {
    // sI OCURRE UN ERROR mnadara codigo 500 porque de  parte del desarrollo esta bien ya se probo
    return res.status(500).json({
      ok: false,
      msg: "Problemas del lado del servidor",
      data: [],
    });
  }
};
// Se agrega funcion para login
const login = async (req, res) => {
  try {
    // 1.esto es lo va a mandar el usuario por medio del formulario
    const { username, password } = req.body;
    // buscamos el usuario solo uno
    const user = await User.findOne({ username });
    // 2.si el usuario es diferente manda 404
    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: "Error al iniciar sesion - no se encontro el usuario",
      });
    }
    // 3.validamos contrasena
    // parametros del metodo bcrypt.compareSync (paswwor del req.body, user.password alamacenada en mogo )
    const validarPassword = bcrypt.compareSync(password, user.password);
    // si validarPassword es diferente manda 400
    if (!validarPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Error al iniciar sesion - contrasenia incorrecta",
      });
    }
    // si no manda error vamos a generar token como lo hicimos arriba
    const token = await generarJWT(user.id);
    //despues de eso mandamos respuesta del usuario creado con su token
    return res.json({
      // ok;true bandera para react
      ok: true,
      msg: "Acceso otorgado",
      data: user,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Problemas del lado del servidor",
      data: [],
    });
  }
};

const verificarUsuario = async (req, res) => {
  // de req me va a traer el usuario porque a si lo nombramos en req.usuario = usuario; en el middlewares y lo busca en mongodb
  const { usuario } = req;
  // le creamos token por medio del id que viene en mongobd
  const token = await generarJWT(usuario.id);

  return res.status(200).json({
    ok: true,
    msg: "usuario validado por token REP API",
    data: usuario,
    token,
  });
};

module.exports = {
  registrarUsuario,
  login,
  verificarUsuario,
};

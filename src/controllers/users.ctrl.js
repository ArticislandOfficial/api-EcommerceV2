const User = require("../models/user");

const getUsuarios = async (req, res) => {
  const usuarios = await User.find();
  return res.json({
    ok: true,
    msg: "Se obtuvieron los usuarios ",
    data: usuarios,
  });
};
const crearUsuario = async (req, res) => {
  const { email, username, password } = req.body;
  const user = {
    email,
    username,
    password,
  };
const newUser = await User.create(user)
  return res.json({
    msg: `Se creo un nuevo usuario llamado ${username} `,
    data: newUser,
  });
};

// const updateUser = (req, res) => {
//   const { idUser } = req.params;
//   const { user_name, password } = req.body;

//   const usuarioEncontrado = users.find((user) => {
//     return user.id === idUser;
//   });

//   usuarioEncontrado.user_name = user_name;
//   usuarioEncontrado.password = password;

//   return res.json({
//     ok: true,
//     msg: "Usuario actualizado",
//     data: usuarioEncontrado,
//   });
// };


module.exports = {
  getUsuarios,
  crearUsuario,
};

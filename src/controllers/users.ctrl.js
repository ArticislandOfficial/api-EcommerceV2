
const User = require("../models/user");

const getUsuarios = async (req, res) => {
  const usuarios = await User.find()
  return res.json({
    ok: true,
    msg: "Se obtuvieron los usuarios ",
    data: usuarios,
  });
};
// const postUsuarios = (req, res) => {
//   const { name, id, pd } = req.body;
//   const nuevaPersona = {};

//   return res.json({
//     msg: `Se creo un nuevo usuario llamado ${name}`,
//     data: nuevaPersona,
//   });
// };
module.exports = {
  getUsuarios,
  // postUsuarios,
};

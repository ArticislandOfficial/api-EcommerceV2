// importacion para crear tokern dinamicos 
// el archivo/funcion se crea para poder generar un token por usuario 
const jwt = require("jsonwebtoken");
// Funcion para establecer id=tokens 
// nuevoUsuario.id 
const generarJWT = (id = "") => {
  // se crea promesa para ver que todo salga bien
  return new Promise((resolve, reject) => {
    // se crea variable con objeto 
    const payload = { id };
// metodo de jsonwebtoken
    jwt.sign(
      // parametros que recibe el metodo:
      // PAYLOAD = TODA LA INFO ENCRIPTADA 
      payload,
      // 1.palabra secreta para desencriptar .env
      process.env.SECRET,
      // se le agrega tiempo de expiracion esto viene en la libreria jwt
      {
        
        expiresIn: "4h",
      },
      // respuesta del promise con funcion callback y tan pronto llegue ahi se va a ejecutar 
      (err, token) => {
        if (err) {
          reject("Nose puedo generar el token");
        } else {
          resolve(token);
        }
      }
    );
  });
};
// se exporta la funcion 
module.exports = {
  generarJWT,
};

const productEV2 = require("../models/productsEV2");

const obtenerProductos = async (req, res) => {
  const productos = await productEV2.find();

  return res.json({
    msg: "Lista de productos obtenida",
    data: productos,
  });
};

const crearProducto = async (req, res) => {
  const { name, description, price, img } = req.body;

  const producto = {
    name,
    description,
    price,
    img,
  };

  const nuevoProducto = await productEV2.create(producto);

  return res.json({
    msg: "Producto creado",
    data: nuevoProducto,
  });
};

const actualizarProducto = async (req, res) => {
  const { idProducto } = req.params;
  const { name, description, price, img } = req.body;

  const producto = {
    name,
    description,
    price,
    img,
  };

  const productoActualizado = await productEV2.findByIdAndUpdate(
    idProducto,
    producto,
    { new: true }
  );

  return res.json({
    msg: "Producto actualizado",
    data: productoActualizado,
  });
};

const eliminarProducto = async (req, res) => {
  const { idProducto } = req.params;

  const productoEliminado = await productEV2.findByIdAndRemove(idProducto);

  return res.json({
    msg: "Producto eliminado",
    data: productoEliminado,
  });
};
const obtenerProducto = async (req, res) => {
  const { idProducto } = req.params;
  const producto = await productEV2.findById(idProducto);

  return res.json({
    msg: "Producto obtenido",
    data: producto,
  });
};

module.exports = {
  obtenerProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
  obtenerProducto,
};

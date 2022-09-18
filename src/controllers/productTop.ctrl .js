const ProductsTop = require("../models/productsTop");

const obtenerProductos = async (req, res) => {
  const productos = await ProductsTop.find();

  return res.json({
    msg: "Lista de productos obtenida",
    data: productos,
  });
};

const crearProducto = async (req, res) => {
  const { name, description, price, number,img } = req.body;

  const producto = {
    name,
    description,
    price,
    number,
    img
  };

  const nuevoProducto = await ProductsTop.create(producto);

  return res.json({
    msg: "Producto creado",
    data: nuevoProducto,
  });
};

const actualizarProducto = async (req, res) => {
  const { idProducto } = req.params;
  const { name, description, price,number,img } = req.body;

  const producto = {
    name,
    description,
    price,
    number,
    img
  };

  const productoActualizado = await ProductsTop.findByIdAndUpdate(
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

  const productoEliminado = await ProductsTop.findByIdAndRemove(idProducto);

  return res.json({
    msg: "Producto eliminado",
    data: productoEliminado,
  });
};
const obtenerProducto = async (req, res) => {
  const { idProducto } = req.params;
  const producto = await ProductsTop.findById(idProducto);

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
 
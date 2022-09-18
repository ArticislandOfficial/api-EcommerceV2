const { Schema, model } = require("mongoose");

const ProductsTopSchema = Schema({
  number: {
    type: String,
  },
  name: {
    type: String,
    require: [true, "El nombre es requerido"],
    unique: true,
  },

  description: {
    type: String,
    default: "Descripcion del producto",
  },
  img: {type: String},
  price: Number,
});

const productsTop = model("productsTop", ProductsTopSchema);
module.exports = productsTop;

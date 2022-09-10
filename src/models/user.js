const { Schema,model }=require('mongoose');
// asi como las sql aqui configuramos la base noSQL
const UserSchema = Schema({
  email: {
    type: String,
    require: [true, "El email es requerido "],
    unique: true,
  },
  username: {
    type: String,
    require: [true, "El nombre es requerido"],
    unique: true,
  },

  password: {
    type: String,
  },
}); 
//Se utiliza para retornar id como propiedad 
// UserSchema.methods.toJSON = function (){
//   const {__v,_id, ...lodemas} = this.toObject();
//   lodemas.id= _id;
//   return lodemas
// }

const User = model("user", UserSchema);
module.exports = User;
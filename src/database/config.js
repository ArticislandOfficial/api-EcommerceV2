const mongoose = require("mongoose")

const dbConenection = ()=>{
    try {
        mongoose.connect(process.env.MONGODB_CNN, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        
    console.log("Base de datos REP online");
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos');
    }
}

module.exports = {
    dbConenection
}
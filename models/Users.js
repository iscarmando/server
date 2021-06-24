const mongoose = require ('mongoose');

const { Schema } = mongoose;

//Modulo para encriptar las contraseñas
const bcrypt = require ('bcryptjs');

//Modificadores:
//         trim: sirve para limpiar los espacios en blanco
//         uunique: sirve para que el atributo email sea unico en la base de datos
//         requires: sirve para indicar que el artibuto debe contener valores
const UserSchema = new Schema({
    name: {
        type:String,
        required: true,
        trim: true
    },
    email: {
        type:String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type:String,
        required: true,
        trim: true
    },
    tipo: {
        type: String,
        require: true,
        trim: true
    }

});
module.exports = mongoose.model('Users', UserSchema);